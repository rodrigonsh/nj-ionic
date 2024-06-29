import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

import { messaging } from '@/firebase/config';
import { getIdToken } from 'firebase/auth'
import { getToken, onMessage } from 'firebase/messaging';

import api from '@/services/api';
import router from '@/router';

const addListeners = async () => {



  if (Capacitor.isNative) {

    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });

  }

  else {

    console.log('configurando onMessage...')

    onMessage(messaging, (payload) => {

      // ask for permission
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
        if (permission === 'granted') {
          console.log('Notification permission granted');
        }
        else {
          console.log('Notification permission denied');
          // ask for permission again

          // on some navigators, the permission is denied by default
          // and can only be asked after a user gesture

          document.addEventListener('click', () => {
            Notification.requestPermission().then(permission => {
              console.log('Notification permission:', permission);
              if (permission === 'granted') {
                console.log('Notification permission granted');
              }
              else {
                console.log('Notification permission denied');
              }
            });
          });

        }
      });

      console.log('Message received. ', payload);

      // Se a aplicação estiver em primeiro plano, salve a notificação no IndexedDB
      if (!document.hidden) {
        let DBOpenRequest = window.indexedDB.open('notifications', 1);

        DBOpenRequest.onerror = function (event) {
          console.log('Error loading database.', event.target.errorCode);
        };

        DBOpenRequest.onsuccess = function (event) {
          console.log('Database initialized.');

          // store the result of opening the database in the db variable. This is used a lot below
          let db = event.target.result;

          // Open a transaction to the database
          db.transaction(['notifications'], 'readwrite').objectStore('notifications').add({
            title: payload.notification.title,
            body: payload.notification.body,
            data: payload.data,
            timestamp: Date.now()
          });
        };

        DBOpenRequest.onupgradeneeded = function (event) {
          console.log('Database initialized.');

          // store the result of opening the database in the db variable. This is used a lot below
          let db = event.target.result;

          // Create an objectStore for this database
          var objectStore = db.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });

          // define what data items the objectStore will contain
          objectStore.createIndex('title', 'title', { unique: false });
          objectStore.createIndex('body', 'body', { unique: false });
          objectStore.createIndex('data', 'data', { unique: false });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });

          console.log('Database initialized.');
        }

      }

      const img = "/images/logo.png";
      const notification = new Notification(payload.notification.title, { body: payload.notification.body, icon: img, data: payload.data });

      let notif = {
        title: payload.notification.title,
        body: payload.notification.body,
        data: payload.data
      }

      // get notifications from local storage
      let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      notifications.push(notif);
      localStorage.setItem('notifications', JSON.stringify(notifications));

      notification.addEventListener('click', (e) => {
        // get type and uuid from payload
        let data = e.target.data

        let route = mapTypeToRoute(data.type);
        router.push({ path: route, params: { uuid: data.uuid } });

      })


    });

  }

}

const registerNotifications = async () => {

  if (Capacitor.isNative) {

    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    getFCMToken();

    await PushNotifications.register();

  }

  else {
    console.log('registerNotifications: Web push not implemented yet');

    Notification.requestPermission().then(permission => {

      console.log('Notification permission:', permission);

      if (permission === 'granted') {

        getFCMToken();

      }

    }
    );
  }

}

const getDeliveredNotifications = async () => {

  if (Capacitor.isNative) {

    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);

  }

  else {
    console.log('getDeliveredNotifications: Web push not implemented yet');

  }
}


const getFCMToken = async () => {

  const token = await getToken(messaging, { vapidKey: 'BJNf4OhnioLuyBXNI-Wk7f_hSOHSDbVaMkNyTU9Ho7sJAL7JevnGNIX9jQr43L1egHGZod63Nkv3TauL4cI-d8E' })
    .then((currentToken) => {
      console.log('FCM token:', currentToken);
      // todo send token to server
      api.sendFCMToken(currentToken)
    })
    .catch((err) => {

      console.error('An error occurred while retrieving token. ', err);

      // retry?
      setTimeout(() => {
        getFCMToken();
      }, 5000); // 5 seconds

    })

}

const mapTypeToRoute = (type) => {
  let route = '/';

  switch (type) {
    case 'help-request':
      route = '/i-want-to-help/';
      break;
    case 'help-on-the-way':
      route = '/help-request/';
      break;
    case 'meet-your-partner':
      route = '/meet-your-partner/';
      break;
    case 'help-arrived':
      route = '/help-arrived/';
      break;
    default:
      route = '/';
  }

  return route;
}

export {
  addListeners, registerNotifications, getDeliveredNotifications,
  getFCMToken, mapTypeToRoute
};
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

import { messaging } from '@/firebase/config';
import { getIdToken } from 'firebase/auth'
import { getToken, onMessage } from 'firebase/messaging';

import api from '@/services/api';
import router from '@/router';

const addListeners = async () => {

  /*document.addEventListener('click', () => {
    Notification.requestPermission().then(permission => {
      console.log('Notification permission:', permission);
      if (permission !== 'granted') {
        
        //console.log('Notification permission denied');
        // yep.. this one is not joining the party
        // kk you so funny
        // TODO: redirect user to a very mean message saying that he/she needs to enable notifications

      }
    });
  });*/

// make sure innodb has been created
let DBOpenRequest = window.indexedDB.open('notifications', 1);

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

      console.log('CLI Message received. ', payload);

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

      }

      const img = "/images/logo.png";
      const notification = new Notification(payload.notification.title, { body: payload.notification.body, icon: img, data: payload.data });

      notification.addEventListener('click', (e) => {
        // get type and uuid from payload
        let data = e.target.data

        let name = data.type;
        router.push({ name: name, params: { uuid: data.uuid } });

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


export {
  addListeners, registerNotifications, getDeliveredNotifications,
  getFCMToken
};
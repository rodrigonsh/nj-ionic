import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

import { messaging } from '@/firebase/config';
import { getIdToken } from 'firebase/auth'
import { getToken, onMessage } from 'firebase/messaging';

import api from '@/services/api';

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
      console.log('Message received. ', payload);
      //const img = "/to-do-notifications/img/icon-128.png";
      //const text = `HEY! Your task "${title}" is now overdue.`;
      //const notification = new Notification("To do list", { body: text, icon: img });
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
    })

}

export { addListeners, registerNotifications, getDeliveredNotifications };
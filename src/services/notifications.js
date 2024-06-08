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
    
      console.log('Message received. ', payload);
    
      const img = "/images/logo.png";
      const notification = new Notification(payload.notification.title, { body: payload.notification.body, icon: img, data: payload.data});

      notification.addEventListener('click', (e) => {
        // get type and uuid from payload
        let data = e.target.data

        if ( data.type == 'help-request' )
        {
          console.log('Help request notification clicked:', data.uuid);
          router.push('/i-want-to-help/' + data.uuid);
          return 
        }

        if ( data.type == 'help-on-the-way' )
        {
          console.log('Help on the way notification clicked:', data.uuid);
          router.push('/help-request/' + data.uuid);
          return
        }

        if ( data.type == 'meet-your-partner' )
        {
          console.log('Meet your partner notification clicked:', data.uuid);
          router.push('/meet-your-partner/' + data.uuid);
          return
        }

        if ( data.type == 'help-arrived' )
        {
          console.log('Help arrived notification clicked:', data.uuid);
          router.push('/help-arrived/' + data.uuid);
          return
        }

        

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

export { addListeners, registerNotifications, getDeliveredNotifications };
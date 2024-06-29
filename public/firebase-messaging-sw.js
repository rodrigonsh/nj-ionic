// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyApvjOMV2JQTkt9TTICW37BdhftEbCSFwE",
  authDomain: "nova-jerusalem-alpha.firebaseapp.com",
  projectId: "nova-jerusalem-alpha",
  storageBucket: "nova-jerusalem-alpha.appspot.com",
  messagingSenderId: "928157165795",
  appId: "1:928157165795:web:6d8da6e0789607448c7dd6",
  measurementId: "G-1KTD49DQ9R"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );


  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/img/logo.png',
    data: payload.data
  };

  // my friend, can you sketch how to save this notification to indexedDB?
  // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB


  const DBOpenRequest = self.indexedDB.open('notifications', 1);

  DBOpenRequest.onerror = function (event) {
    console.log('Error loading database.', event.target.errorCode);
  };

  DBOpenRequest.onsuccess = function (event) {
    console.log('Database initialized.');

    // store the result of opening the database in the db variable. This is used a lot below
    db = event.target.result;

    // Open a transaction to the database
    db.transaction(['notifications'], 'readwrite').objectStore('notifications').add({
      title: notificationTitle,
      body: notificationOptions.body,
      data: notificationOptions.data,
      timestamp: Date.now()
    });

    console.log('Notification saved to indexedDB.');
    
  }

  DBOpenRequest.onupgradeneeded = function (event) {
    console.log('Database initialized.');

    // store the result of opening the database in the db variable. This is used a lot below
    db = event.target.result;

    // Create an objectStore for this database
    var objectStore = db.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });

    // define what data items the objectStore will contain
    objectStore.createIndex('title', 'title', { unique: false });
    objectStore.createIndex('body', 'body', { unique: false });
    objectStore.createIndex('data', 'data', { unique: false });
    objectStore.createIndex('timestamp', 'timestamp', { unique: false });

    console.log('Database initialized.');
  }

  self.addEventListener('notificationclick', (event) => {

    //console.log('sw notificationClick', event)

    const clickedNotification = event.notification;
    clickedNotification.close();

    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {

        let url = "/"

        if (clickedNotification.data.type == 'help-request') {
          //console.log('Help request notification clicked:');
          url = '/i-want-to-help/' + clickedNotification.data.uuid
        }

        if (clickedNotification.data.type == 'help-on-the-way') {
          //console.log('Help on the way notification clicked:');
          url = '/help-request/' + clickedNotification.data.uuid
        }

        if (clickedNotification.data.type == 'meet-your-partner') {
          //console.log('Meet your partner notification clicked:');
          url = '/meet-your-partner/' + clickedNotification.data.uuid
        }

        // Se a janela do seu aplicativo já estiver aberta, apenas foca nela
        for (let i = 0; i < clientList.length; i++) {

          const client = clientList[i];
          console.log('sw', i, client.url)

          client.postMessage({
            action: 'redirect-from-notificationclick',
            url: url,
          })

          client.focus()

          return


        }
        // Se não, abre uma nova janela
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );


  });

  self.registration
    .showNotification(notificationTitle, notificationOptions)
    .then(function (notification) {
      notification.onclick = function () {

      }
    });
});
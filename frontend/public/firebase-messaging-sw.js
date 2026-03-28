importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyBgbMBVbPmEApb1E6ht1HoTVEJtb4dsmtY",
  authDomain: "web-notification-391ae.firebaseapp.com",
  projectId: "web-notification-391ae",
  storageBucket: "web-notification-391ae.firebasestorage.app",
  messagingSenderId: "380249667386",
  appId: "1:380249667386:web:d104a210c87c867735c203",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );

  const notificationTitle = payload.notification?.title || "Background Message";
  const notificationOptions = {
    body: payload.notification?.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

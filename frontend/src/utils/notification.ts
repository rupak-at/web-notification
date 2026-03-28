import api from "../config/api";
import { getFirebaseMessaging } from "../config/firebase";
import { getToken, onMessage } from "firebase/messaging";

export const getNotificationPermission = async () => {
  const request = await Notification.requestPermission();

  if (request === "granted") return true;
  return false;
};

export const initFCMToken = async (permission: boolean) => {
  if (!permission) return;
  try {
    const messaging = await getFirebaseMessaging();
    if (!messaging) {
      console.warn("Firebase Messaging is not supported in this browser.");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
      ),
    });

    try {
      await api.put("/store-fcm-token", { fcmToken: token });
    } catch (error) {
      console.error("Error storing FCM Token:", error);
    }

    onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      if (Notification.permission === "granted") {
        new Notification(payload.notification?.title || "Notification", {
          body: payload.notification?.body,
        });
      }
    });
  } catch (error) {
    console.error("Error initializing FCM token:", error);
  }
};

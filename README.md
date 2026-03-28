# 🚀 Notify - Modern Web Notification Hub

## 📖 Why This Project?

This project was created to provide a **best-practice implementation of Web Push Notifications** using Firebase Cloud Messaging (FCM) in a modern web environment.

Developing notifications in a Vite-based landscape presents unique challenges—specifically around **service worker instantiation and environment variable security**. This project serves as a comprehensive guide and boilerplate to:
- **Simplify** the integration of FCM with a custom Node.js backend.
- **Demonstrate** a robust solution for build-time environment variable injection in service workers.
- **Showcase** a premium, glassmorphic UI/UX that feels state-of-the-art.

Notify bridges the gap between complex browser APIs and beautiful, functional user experiences.

---

Notify is a premium, full-stack web application designed for seamless broadcast and management of web push notifications. Built with a modern glassmorphic UI and a robust Node.js backend integration with Firebase Cloud Messaging (FCM).

## ✨ Features

-   **Premium UI/UX**: Modern glassmorphic design system using Tailwind CSS.
-   **Google Authentication**: Secure sign-in powered by Firebase Auth.
-   **Real-time Notifications**: Instant push alerts via Firebase Cloud Messaging.
-   **Notification Queue**: Create and manage pending notifications before broadcast.
-   **Full-stack Architecture**: React (Vite) frontend + Express.js/Knex backend.

---

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS, Firebase SDK, React Hot Toast.
-   **Backend**: Node.js, Express, Knex.js, Firebase Admin SDK, PostgreSQL/MySQL.
-   **Authentication**: Google OAuth via Firebase.
-   **Messaging**: Firebase Cloud Messaging (FCM).

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18+)
-   pnpm or npm
-   Firebase Project with Authentication and Cloud Messaging enabled.

### 1. Clone the Repository

```bash
git clone https://github.com/rupak-at/web-notification.git
cd web-notification
```

### 2. Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Configure environment variables:
    ```bash
    cp .env.example .env
    ```
    Populate `.env` with your Firebase Admin credentials and database connection string.
4.  Run migrations:
    ```bash
    pnpm run migrate
    ```
5.  Start the server:
    ```bash
    pnpm start
    ```

### 3. Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Configure environment variables:
    ```bash
    cp .env.example .env
    ```
    Add your Firebase Client SDK configuration.
4.  Start the development server:
    ```bash
    pnpm run dev
    ```

---

## 🛡️ Backend API

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/login` | Authenticate user with Firebase token. |
| `PUT` | `/api/store-fcm-token` | Store the browser's FCM token for notifications. |
| `POST` | `/api/add-notification` | Queue a new notification for broadcast. |
| `GET` | `/api/notifications` | Retrieve all notifications for the user. |
| `POST` | `/api/send-notification` | Broadcast all pending notifications via FCM. |

---

## 💡 Technical Note: Vite & Service Workers

A key challenge in this setup is handling environment variables within the Firebase Service Worker (`firebase-messaging-sw.js`).

### The Issue
In Vite, files inside the `public` directory are served as-is. This means they cannot directly use `import.meta.env` values since they aren't processed by Vite's build pipeline.

### Our Solution
To solve this, we implemented a build-time injection strategy:
1.  The service worker template is stored in `src/`.
2.  We use placeholders (e.g., `__VITE_FIREBASE_API_KEY__`) in the template.
3.  The `vite.config.ts` includes a script that runs before the build, replacing these placeholders with actual values from `.env` and writing the final file to `/public`.

This ensures the service worker is correctly configured without hardcoding sensitive credentials in source control.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
  <b>ui by antigravity</b>
</p>

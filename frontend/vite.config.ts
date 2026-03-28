import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to generate firebase-messaging-sw.js
function generateServiceWorker(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  const swTemplate = readFileSync(
    path.resolve(__dirname, "src/firebase-messaging-sw.js"),
    "utf-8",
  );

  const swWithEnv = swTemplate
    .replace(/__VITE_FIREBASE_API_KEY__/g, env.VITE_FIREBASE_API_KEY)
    .replace(/__VITE_FIREBASE_AUTH_DOMAIN__/g, env.VITE_FIREBASE_AUTH_DOMAIN)
    .replace(/__VITE_FIREBASE_PROJECT_ID__/g, env.VITE_FIREBASE_PROJECT_ID)
    .replace(
      /__VITE_FIREBASE_STORAGE_BUCKET__/g,
      env.VITE_FIREBASE_STORAGE_BUCKET,
    )
    .replace(
      /__VITE_FIREBASE_MESSAGING_SENDER_ID__/g,
      env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    )
    .replace(/__VITE_FIREBASE_APP_ID__/g, env.VITE_FIREBASE_APP_ID);

  writeFileSync(
    path.resolve(__dirname, "public/firebase-messaging-sw.js"),
    swWithEnv,
  );
}

export default defineConfig(({ mode }) => {
  // Generate the service worker file before the build
  generateServiceWorker(mode);

  return {
    plugins: [react(), tailwindcss()],
  };
});

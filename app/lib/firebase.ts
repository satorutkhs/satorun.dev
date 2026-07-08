import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// Use the REST-based "lite" Firestore SDK: the full SDK pulls in protobuf.js,
// which generates parsers via `new Function(...)` at import time. That's
// disallowed inside the Cloudflare Workers isolate used for SSR and crashes
// every page. The lite SDK covers everything this app needs (one-off
// getDocs queries, no realtime onSnapshot listeners).
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-api-key-for-build",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock-auth-domain-for-build.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock-storage-bucket.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000000000",
};

// Firebase (in particular Firestore's protobuf-based wire encoding) relies on
// runtime code generation (`new Function`), which is disallowed inside the
// Cloudflare Workers isolate used for SSR. Only initialize it in the browser,
// where all actual usage (auth listeners, Firestore queries) already happens
// via useEffect/event handlers on the client.
const isBrowser = typeof window !== "undefined";

// Initialize Firebase (prevent re-initialization in dev)
const app = isBrowser ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]) : undefined;

export const auth = app ? getAuth(app) : (undefined as unknown as ReturnType<typeof getAuth>);
export const db = app ? getFirestore(app) : (undefined as unknown as ReturnType<typeof getFirestore>);
export const storage = app ? getStorage(app) : (undefined as unknown as ReturnType<typeof getStorage>);
export const isFirebaseMocked =
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock-api-key-for-build";
export default app;

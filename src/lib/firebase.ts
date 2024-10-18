// firebase.ts
import {
  appId,
  authDomain,
  firebaseApiKey,
  messagingSenderId,
  projectId,
  storageBucket,
} from "@/shared/constants";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

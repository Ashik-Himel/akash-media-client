import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCx9O52X5uKfnyQlOkv131Aa67ILILLG0A",
  authDomain: "akash-media.firebaseapp.com",
  projectId: "akash-media",
  storageBucket: "akash-media.appspot.com",
  messagingSenderId: "582706828477",
  appId: "1:582706828477:web:2e5a7555b48995797e53d4",
  measurementId: "G-3JKFF1XY74"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
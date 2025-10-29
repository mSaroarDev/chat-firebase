import { initializeApp } from "firebase/app";

const firebaseConfigs = {
  apiKey: "AIzaSyD8ivkuBDyZV4vWpfO9Q1ndGJXGa4YSKKk",
  authDomain: "chat-app-2467e.firebaseapp.com",
  projectId: "chat-app-2467e",
  storageBucket: "chat-app-2467e.firebasestorage.app",
  messagingSenderId: "186059804229",
  appId: "1:186059804229:web:dd6140775aa24fb0439d2c",
  measurementId: "G-LH2V9ZBVYC",
  databaseURL: "https://chat-app-2467e-default-rtdb.firebaseio.com",
};

const firebaseApp = initializeApp(firebaseConfigs);
export default firebaseApp;

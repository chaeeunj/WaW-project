import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDRnXXl7nI_gTHS4kEjDv-_pH9J5VCGRgM',
  authDomain: 'watching-and-writing.firebaseapp.com',
  projectId: 'watching-and-writing',
  storageBucket: 'watching-and-writing.appspot.com',
  messagingSenderId: '45527014236',
  appId: '1:45527014236:web:03f3909d445873e2d43f99',
  measurementId: 'G-HK28LRVKE2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

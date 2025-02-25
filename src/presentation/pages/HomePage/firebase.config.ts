// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyBNtjSMo1WXlg5lURMrk48H8ro_4x_c08c',
  authDomain: 'leitner-quiz.firebaseapp.com',
  projectId: 'leitner-quiz',
  storageBucket: 'leitner-quiz.firebasestorage.app',
  messagingSenderId: '27739701651',
  appId: '1:27739701651:web:e3cdd10654621a4e732866',
  measurementId: 'G-P8CE8C49T1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

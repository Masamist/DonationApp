import { initializeApp } from 'firebase/app';

// Replace these values with your Firebase project config
const firebaseConfig = {
  apiKey: 'AIzaSyDtX0c077rTkpJZI_5y3h7DngV2f_ACfh0',
  authDomain: 'donation-application-b3f7c.firebaseapp.com',
  projectId: 'donation-application-b3f7c',
  storageBucket: 'donation-application-b3f7c.appspot.com',
  messagingSenderId: '434268917449',
  appId: '1:434268917449:android:3a87940c13bf7456c54718',
  //   apiKey: 'API_KEY',
  // authDomain: 'PROJECT_ID.firebaseapp.com',
  // projectId: 'PROJECT_ID',
  // storageBucket: 'PROJECT_ID.appspot.com',
  // messagingSenderId: 'SENDER_ID',
  // appId: 'APP_ID',
};

export const app = initializeApp(firebaseConfig);
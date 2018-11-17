import firebase from 'firebase/app';
import 'firebase/functions';

firebase.initializeApp({
  apiKey: 'AIzaSyCpeoS_inHvF2Ddj4jy6vSdgCbgyzsy4XU',
  authDomain: 'jforbes-io.firebaseapp.com',
  databaseURL: 'https://jforbes-io.firebaseio.com',
  projectId: 'jforbes-io',
  storageBucket: 'jforbes-io.appspot.com',
  messagingSenderId: '893096806511',
});

export default firebase;

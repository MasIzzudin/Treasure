import { AppRegistry } from 'react-native';
import firebase from 'firebase';
import App from './src/App';

  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyCFAfK6GBoJ7zzPa8u4b8WXGBt2Rv2Ppog',
    authDomain: 'treasure-61901.firebaseapp.com',
    databaseURL: 'https://treasure-61901.firebaseio.com',
    projectId: 'treasure-61901',
    storageBucket: 'treasure-61901.appspot.com',
    messagingSenderId: '3584016686'
  };
  firebase.initializeApp(config);

AppRegistry.registerComponent('Treasure', () => App);

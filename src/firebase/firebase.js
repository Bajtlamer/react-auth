import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyBp7gJy7bCUoQuY0aXvlE5q9RRiXReM4W8",
    authDomain: "flexbusapp.firebaseapp.com",
    databaseURL: "https://flexbusapp.firebaseio.com",
    projectId: "flexbusapp",
    storageBucket: "flexbusapp.appspot.com",
    messagingSenderId: "685715379727"
};

const devConfig = {
  apiKey: "AIzaSyBp7gJy7bCUoQuY0aXvlE5q9RRiXReM4W8",
    authDomain: "flexbusapp.firebaseapp.com",
    databaseURL: "https://flexbusapp.firebaseio.com",
    projectId: "flexbusapp",
    storageBucket: "flexbusapp.appspot.com",
    messagingSenderId: "685715379727"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};

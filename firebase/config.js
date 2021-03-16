
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDh6FO0WqzebLcJ1ARvW-5Zsgok5wfOrac",
    authDomain: "cafeteria-e3d1c.firebaseapp.com",
    projectId: "cafeteria-e3d1c",
    storageBucket: "cafeteria-e3d1c.appspot.com",
    messagingSenderId: "543740366963",
    appId: "1:543740366963:web:42e68617aebf3bdb629a06"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
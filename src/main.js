// this is needed to get Vue.js to generate things
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

// using the compat firebase stuff because we are using the latest versions (forget the details)
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// ToDo: turn the API key into a 'secret'
const firebaseConfig = {
    apiKey: "AIzaSyBm4mMSmMw8g15ErVonc23nKDszjlEpipI",
    authDomain: "daily-dilettante.firebaseapp.com",
    projectId: "daily-dilettante",
    storageBucket: "daily-dilettante.appspot.com",
    messagingSenderId: "749678297903",
    appId: "1:749678297903:web:2931caec98bc8fcbf057da",
    measurementId: "G-RJK0G5SZ9Z"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Make these available to all the components
export const DB_HANDLE = firebaseApp.firestore();
export const AUTH_HANDLE = firebase.auth();

// still don't know much about this
// const analytics = getAnalytics(APP_HANDLE);

// actually generate the site
createApp(App)
    .use(router)
    .mount('#app')

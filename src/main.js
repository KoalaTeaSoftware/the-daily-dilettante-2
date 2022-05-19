// this is needed to get Vue.js to generate things
// noinspection SpellCheckingInspection

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

// using the compat firebase stuff because we are using the latest versions of vue (forget the details)
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {createPinia} from "pinia";

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

// ToDo: see if these really need to be shared around the world, or could be local to where they are needed
// The DB handle will be used by the editable components, might as well get it once, and share that everywhere
export const DB_HANDLE = firebaseApp.firestore();
export const AUTH_HANDLE = firebase.auth();

// still don't know much about this
// const analytics = getAnalytics(APP_HANDLE);

// we need to be explicit about which pinia instance to use in the various components that need it
export const pinia = createPinia()

// actually generate the site, and the data store
createApp(App)
    .use(router, pinia)
    .mount('#app')


// this is needed to get Vue.js to generate things
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

// this is what is needed to get firebase going, and to get access to the pages database
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";

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

// not yet seen a reason to export this
const APP_HANDLE = initializeApp(firebaseConfig);

// this makes the Firestore database visible the world over
// to use them have something like import {DB_HANDLE} from '@/main.js'
export const DB_HANDLE = getFirestore(APP_HANDLE);

// still don't know much about this
const analytics = getAnalytics(APP_HANDLE);

// actually generate the site
createApp(App)
    .use(router)
    .mount('#app')

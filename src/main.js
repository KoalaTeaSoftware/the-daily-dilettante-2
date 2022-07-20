// note how the creation of the pinia store is hooked into the creation of the app itself
import {PINIA_HANDLE} from "@/stores";
// import { initializeApp } from 'firebase-admin/app';
// it is necessary to force this app to run the initialise app that lives in the compat part of the distribution
// Otherwise the build process creates bags of dependency failures
import firebase from 'firebase/compat/app';
import {firebaseConfig} from "@/firebase/config";
// now use THAT app that was created above (rather than any other one that gets picked-up) to get a handle on the firestore that goes with it
// note that we have to specifically import the firestore from the compat part of the distribution
import 'firebase/compat/firestore';
import {getAuth} from "firebase/auth";
// this is needed to get Vue.js to generate things
// noinspection SpellCheckingInspection
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

console.log(`The pinia is available from main [${!!PINIA_HANDLE}]`)

export const firebaseApp = firebase.initializeApp(firebaseConfig);
console.log(`The firebase app has been created [${!!firebaseApp}], but this is local to main`)

export const DB_HANDLE = firebaseApp.firestore()
console.log(`The database handle app is available from main [${!!DB_HANDLE}]`)

export const AUTH_HANDLE = getAuth() //firebase.auth();
console.log(`The auth handle is available from main [${!!AUTH_HANDLE}]`)


createApp(App)
    .use(router, PINIA_HANDLE)
    .mount('#app')


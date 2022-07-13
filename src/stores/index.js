// Pinia is used to provide things like the user state (nothing else at the moment)
// The first step with it is to create an instance of the pinia application, this can then be used to create specific stores
// like the user state
// so create an instance of the app, and then publish a handle to it
import {createPinia} from "pinia";
export const PINIA_HANDLE = createPinia()
console.log('The pinia instance has been created and its handle has been exported')
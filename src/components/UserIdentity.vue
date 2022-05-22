This provides a way in which the user can log in and log out.
To get the login functionality, this component has to be instantiated somewhere.
Once that is done, then, to gt logged out, then the logout() method can be used

Depends on >npm install --save firebase auth firebaseui

ToDo: Make the failing user-journey a bit more friendly
See https://github.com/firebase/firebaseui-web#configure-email-provider for information about configuring the sign-in component
Here are som possible options:

adminEmail: 'info@thedailydilettante.com',
helpLink: 'https://example.com/welcome'

<template>
  <div id="login-component" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Please Present Your Credentials</h2>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="firebaseui-auth-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'firebaseui/dist/firebaseui.css';
import firebase from 'firebase/compat/app';
import {AUTH_HANDLE, pinia} from "@/main";
import {useUserState} from "@/stores/UserState";

const firebaseui = require('firebaseui');

let handleOnMyState = null

export default {
  name: "UserIdentity",
  methods: {
    logOut() {
      // provide a handle to the outside world to get logging-out done
      firebase.auth().signOut()
    },
  },
  mounted() {
    // get this handle as soon as is feasible
    handleOnMyState = useUserState(pinia)

    // initialise the Firebase UI component
    const ui = new firebaseui.auth.AuthUI(AUTH_HANDLE);
    console.log("Setting up the firebase  UI")

    // This is assuming that it is going to live inside a Bootstrap modal (hard-coded to have the id shown)
    const el = document.getElementById('login-component')

    // Make it so that when that modal is mounted, the FB UI component is started-up
    el.addEventListener('show.bs.modal', () => {
      // noinspection JSCheckFunctionSignatures
      ui.start('#firebaseui-auth-container', {
        signInFlow: 'popup',
        signInSuccessUrl: window.location,
        signInOptions: [{
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          disableSignUp: {
            status: true
          }
        }]
      })
    })

    // Given that we are using Firebase, hook into the user change event.
    // It appears that directly fiddling with the state (rather than through methods) is the way to make it reactive
    firebase.auth().onAuthStateChanged((user) => {
      console.log('User has changed')
      if (user) {
        // ToDo it may be that this is going to be useful when we use the custom claims an allow the editable div to work as intended
        handleOnMyState.amLoggedIn = true;
      } else {
        handleOnMyState.$reset()
      }
    });
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#login-component {

}
</style>
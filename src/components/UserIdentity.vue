Depends on >npm install --save firebase auth firebaseui

ToDo: Make the failing user-journey a bit more friendly
See https://github.com/firebase/firebaseui-web#configure-email-provider for information about configuring the sing-in component

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
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Log In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'firebaseui/dist/firebaseui.css';
import firebase from 'firebase/compat/app';
import {AUTH_HANDLE} from "@/main";

const firebaseui = require('firebaseui');

export default {
  name: "UserIdentity",
  methods: {
    logOut() {
      console.log("UID Component: Logging Out")
      firebase.auth().signOut()
    },
  },
  mounted() {
    // initialise the Firebase UI component
    const ui = new firebaseui.auth.AuthUI(AUTH_HANDLE);
  console.log("Setting up the firebase  UI")
    // Make it so that when the modal is mounted, the FB UI component is started-up
    const el = document.getElementById('login-component')
    console.log(`Found the element that is the modal ${el}`)
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

    // Whenever this component is set up (probably this will only work properly if there is only 1 in the app)
    // Make a listener
    /*
    ToDo it may be that this is going to be useful when we use the custom claims an allow the editable div to work as intended
    firebase.auth().onAuthStateChanged((user) => {
      console.log('User has changed')
      if (user) {
        currentUserData = user
        console.log(`User is now ${JSON.stringify(currentUserData)}`)
      } else {
        currentUserData = null
        console.log(`User is now ${currentUserData}`)
      }
    });
     */
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#login-component {

}
</style>
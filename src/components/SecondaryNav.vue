<template>
  <nav class="navbar navbar-expand-lg" aria-label="The chapter nav bar">
    <div class="container-fluid">
      <div class="" id="secondary-nav">
        <div class="navbar-nav">
          <router-link to="/contact" class="nav-link active" aria-current="page">Contact</router-link>
          <a v-if="iAmLoggedIn" type="button" id="logoutButton" class="nav-link" @click='logout'>Logout</a>
          <a v-else type="button" id="startLoginButton" class="nav-link"
             data-bs-toggle="modal" data-bs-target="#login-component">Login</a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import UserIdentity from "@/components/UserIdentity";

import {pinia} from "@/main";
import {useUserState} from "@/stores/UserState";

let myState = null

export default {
  name: "SecondaryNav",
  setup() {
    myState = useUserState(pinia)
  },
  computed: {
    iAmLoggedIn() {
      return myState.amLoggedIn
    }
  },
  methods: {
    logout() {
      // make use of the user identity's handle on this operation
      UserIdentity.methods.logOut()
    }
  },
}
</script>

<style lang="scss">
@import "src/assets/livery";

#footer {
  .navbar {
    padding: 0;
  }
}

#secondary-nav {
  margin-left: auto; // put the buttons on the right of the block that they live in
  .a {
    margin: 0;
  }

  .nav-link {
    color: $colour-banner-primary-text;
  }
}
</style>
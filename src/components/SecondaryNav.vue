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

// declare the handle this way so that it is not visible to the outside world (although the store itself is)
let handleOnMyState = null

export default {
  name: "SecondaryNav",
  setup() {
    handleOnMyState = useUserState(pinia)
  },
  computed: {
    iAmLoggedIn() {
      // making direct use of the state in this way appears to be the way to ensure that this element is responsive to the state
      return handleOnMyState && handleOnMyState.amLoggedIn
    }
  },
  methods: {
    logout() {
      // make use of the user identity's handle on this operation (need to have the .methods. bit in here, or Vue gets lost).
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
<template>
  <nav id="main-nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>

</template>

<script>
export default {
  name: "MainNav"
}
</script>

<style lang="scss">
@import "src/assets/livery";

nav {
  a {
    font-family: branded-font, "Times New Roman", Times, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $colour-banner-primary-text;

    // ToDo: these will be changed when this is converted into a Bootstrap navbar
    font-size: 2em;
    margin: 0.25em;
  }

  /*
  On a proper screen, this will cause the hovered-on text to change, to look hollow
  On an ipad, it looks as if it will make the selected option show hollow until another click (somewhere)
   */
  a:hover {
    color: $colour-banner-background !important;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: $colour-banner-primary-text;
  }

  /*
  The following makes the currently selected item distinct, the class is added by the router
   */
  .router-link-active {
    font-weight: bolder;
  }

}

</style>
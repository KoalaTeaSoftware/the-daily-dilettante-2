<template>
  <nav>
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
@import "src/assets/livery";

#app {
  font-family: "Times New Roman", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $colour-body-text;
  background-color: $colour-page-background !important;
  //noinspection CssUnknownTarget
  background-image: url("@/assets/paper.webp");
  background-repeat: repeat;

  h1, h2, h3, h4 {
    font-family: branded-font, "Times New Roman", Times, serif;
    text-align: center;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

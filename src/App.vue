<template>
  <div id="header" class="fixed-top">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </div>
  <div id="content">
    <router-view/>
  </div>
  <div id="footer" class="fixed-bottom"><p>Footer</p></div>
</template>

<style lang="scss">
@import "src/assets/livery";

#app {
  font-family: "Times New Roman", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $colour-body-text;
  background-color: $colour-page-background !important;

  //noinspection CssUnknownTarget
  background-image: url("@/assets/paper.webp");
  background-repeat: repeat;

  // force it to use as much space as is shown on the screen % works, but vh leaves a lot with a default background colour
  height: 100%;

  text-align: center;

  #header, #footer {
    color: $colour-banner-primary-text;
    background-color: $colour-banner-background;
  }

  #content {
    // ToDo: the following will need to be well adjusted when real nav bars have been created.
    // they ensure that the content can be seen despite the header and footer
    // and go with the
    padding-top: 3em;
    padding-bottom: 4em;
  }

  h1, h2, h3, h4 {
    font-family: branded-font, "Times New Roman", Times, serif;
    text-align: center;
  }

  nav {
    .router-link-active {
      font-weight: bolder;
    }

    a {
      font-family:  branded-font, "Times New Roman", Times, serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: $colour-banner-primary-text;

      // ToDo: these will be changed when this is converted into a Bootstrap navbar
      font-size: 2em;
      margin: 0.25em;
    }
  }
}
</style>

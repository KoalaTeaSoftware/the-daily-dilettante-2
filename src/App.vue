<template>
  <div id="header" class="fixed-top">
    <MainNav/>
  </div>
  <div id="content">
    <router-view/>
  </div>
  <div id="footer" class="fixed-bottom"><p>Footer</p></div>
</template>

<style lang="scss">
@import "src/assets/livery";

// Apply these attributes to the body tag so that the whole page, irrespective of size will look yellow
body{
  color: $colour-body-text;
  background-color: $colour-page-background !important;
  //noinspection CssUnknownTarget
  background-image: url("@/assets/paper.webp");
  background-repeat: repeat;

  // force it to use as much space as is shown on the screen
  //height: 100vh;
}

#app {
  font-family: "Times New Roman", Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  text-align: center;

  img, iframe, audio {
    border-radius: 5px;
    box-shadow: 5px 5px 10px $colour-body-text-shadow;
  }

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
}
</style>
<script>
import MainNav from "@/components/MainNav";
export default {
  components: {MainNav}
}
</script>
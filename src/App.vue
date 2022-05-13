<template>
  <div id="header">
    <Header/>
  </div>
  <div id="content">
    <router-view/>
  </div>
  <div id="footer" class="fixed-bottom">
    <SecondaryNav/>
  </div>
  <UserIdentity/>
</template>

<style lang="scss">
@import "src/assets/livery";

// Apply these attributes to the body tag so that the whole page, irrespective of size will look yellow
body {
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
    // most of the pages are quite full, so the content is a fluid container, but this makes it feel 'tight' on the page
    // a fluid container would make the left and right margins too big. this seems OK
    margin: 0.5rem;

    // ToDo: the following will need to be well adjusted when real nav bars have been created.
    // they ensure that the content can be seen despite the header and footer
    // and go with the
    padding-bottom: 4em;
  }

  h1, h2, h3, h4 {
    font-family: branded-font, "Times New Roman", Times, serif;
    text-align: center;
  }

  // set links all over to appear in the branded font
  a {
    font-family: branded-font, "Times New Roman", Times, serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $colour-body-text;
  }

  .ext-link::after {
    content: "";
    display: inline-block;
    vertical-align: super;
    width: 1rem;
    height: 1rem;
    margin-left: 0.5em;
    //noinspection CssUnknownTarget
    background: url('@/assets/new-tab.svg') 0 0 no-repeat;
    background-size: contain;
  }

}
</style>
<script>
import Header from "@/components/Header";
import SecondaryNav from "@/components/SecondaryNav";
import UserIdentity from "@/components/UserIdentity";

export default {
  components: {UserIdentity, SecondaryNav, Header},
}
</script>
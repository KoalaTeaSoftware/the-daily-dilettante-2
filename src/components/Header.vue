The header-container is what gives the pinstripes above and bellow the whole banner

ToDo: the logo should be taken out of the grid, and its column removed. It causes all of the components of the
banner to be to the right of the page's centre-line.
This is probably going to mean sizing / hiding the logo according to the viewport size (so that it never obscures the title)

<template>
  <div id="header-container">
    <div id="banner-container" class="row align-items-center">
      <div class="col-sm-2 align-middle">
        <img id="logo" src="@/assets/logo200.gif" class="mx-auto d-block" alt="The Daily Dilettante logo">
      </div>
      <div class="col-sm-10" id="head-line">
        <div class="row">
          <div class="col">
            <p id="title">The Daily Dilettante</p>
          </div>
        </div>
        <div class="row" id="log-line">
          <div class="col-md-3" style="text-align: right">
            <img src="@/assets/medallion.png" alt="a medallion" class="d-none d-lg-inline img-fluid">
          </div>
          <div class="col" style="text-align: center">Bringing you entertainment since 1720</div>
          <div class="col-md-3" style="text-align: left">
            <img src="@/assets/medallion.png" alt="a medallion" class="d-none d-lg-inline img-fluid">
          </div>
        </div>

        <nav class="navbar navbar-expand-lg" aria-label="The chapter nav bar">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <img src="@/assets/hamburger.svg" class="img-fluid" alt="Click this to see the chapter menu">
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <router-link to="/" class="nav-link active" aria-current="page" href="#">Home</router-link>
                <router-link to="/about" class="nav-link">About</router-link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style lang="scss">
@import "src/assets/livery";

// this id is the name of the enclosing div that is defined in the App.vue
#header {
  // generate the pin-stripes
  padding-top: 0.5px;
  padding-bottom: 0.5em;

  #logo {
    margin: auto;
    width: 90%
  }

  #header-container {
    // need a little space from the pin-stripes
    padding-top: 0.5em;
    padding-bottom: 0.5em;

    #banner-container {
      text-align: center;
      background-color: $colour-banner-background;
      border-color: $colour-page-background;
      border-style: solid;
      border-left: none;
      border-right: none;

      border-top-width: 2px;
      border-bottom-width: 2px;

      font-family: branded-font, Times New Roman, Times, serif;

      #title {
        font-size: 5em;
        font-weight: 700;
        text-align: center;
        margin: 0;
        line-height: 1em;
      }

      #log-line {
        margin-top: 0.75em;
        font-size: 1.5em;
        line-height: 1.1em;
        color: $colour-banner-secondary-text;
        // prevent the normal image's shadow, but separate it from the log-line's text
        img {
          box-shadow: none;
          width: 3em;
        }
      }

      // this sets the buttons of the navbar to all appear in the centre of the nav-bar area
      .navbar-nav {
        margin: auto;
      }

      // get rid of the box for this specific imag - it shows up a lot when the toggler is selected, and does not look good
      .navbar-toggler {
        box-shadow: none;
      }

      // these will come aout as anchor tags, so a few attributes (from the general style in App.vue) need to be overridden
      .nav-link {
        color: $colour-banner-primary-text;

        // ToDo: these will be changed when this is converted into a Bootstrap navbar
        font-size: 2em;
        margin: 0.25em;
      }

      /*
    On a proper screen, this will cause the hovered-on text to change, to look hollow
    On an ipad, it looks as if it will make the selected option show hollow until another click (somewhere)
     */
      .nav-link:hover {
        color: $colour-banner-background !important;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: $colour-banner-primary-text;
      }

      /*
    The following makes the currently selected item distinct, the class is added by the router
     */
      .router-link-active {
        font-weight: bolder;
        text-decoration: underline;
      }
    }
  }
}

</style>
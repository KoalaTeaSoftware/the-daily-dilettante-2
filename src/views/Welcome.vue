<template>
  <!--suppress HtmlUnknownBooleanAttribute -->
  <div id="welcome" class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Welcome</h1>
        <editable-div identity="welcome-1"></editable-div>
      </div>
    </div>
    <div class="row align-items-center">
      <div class="col-md" id="caro">
        <div id="carousel" class="carousel slide" data-ride="carousel" data-interval="5000">
          <div class="carousel-inner">
            <div class="carousel-item" v-for="pic in caroImgList">
              <img class="d-block w-100"
                   :src="require('@/assets/welcome/' + pic.source)"
                   :alt="pic.alt">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md" id="intro">
        <EditableDiv identity="welcome-2"></EditableDiv>
      </div>
      <div class="col-md" id="other">
        <img :src="require('@/assets/welcome/flyer.jpg')" class="img-fluid" alt="Flyer for upcoming work">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "src/assets/livery";

#welcome {
  text-align: center !important;

  #caro {
    // when stacked on a small device, the carousel shadow is on top of the next block of display
    margin-bottom: 1em;

    /* As the inner is tightly around its images, you will not be able to see the shadow tht the image has.
     * Therefore give the inner (not the image) the attributes that provide the shadow
     */
    .carousel-inner {
      border-radius: 5px;
      box-shadow: 5px 5px 10px $colour-body-text-shadow;
      /* This also means that we have to prevent the image in the carousel from having the shadow (otherwise it can look wrong) */
      img {
        margin: 0;
        box-shadow: none;
      }
    }
  }

  #other {
    img {
      max-height: 500px;
      //width: 75%;
      //margin: auto;
    }
  }
}
</style>

<script>

import EditableDiv from "@/components/EditableDiv";

export default {
  name: 'Welcome',
  components: {EditableDiv},
  data() {
    return {
      caroImgList: [
        {'source': "silverville-principle-women.jpg", "alt": "Principle women in Silverville"},
        {'source': "thackeray-books.jpg", "alt": "A book by Thackeray"},
        {'source': "Maria_Edgeworth_by_John_Downman_1807.jpg", "alt": "Maria Edgeworth by John Downman"},
        {'source': "trollope-books.jpg", "alt": "An array of books by Trollope"},
        {'source': "trollope-portrait.jpg", "alt": "A portrait of Trollope"}
      ]
    }
  },
  mounted() {
    // unless one of the items in the carousel is set to be the active one, it does not seem to start working
    document.getElementsByClassName("carousel-item")[0].classList.add('active')
  }
}
</script>

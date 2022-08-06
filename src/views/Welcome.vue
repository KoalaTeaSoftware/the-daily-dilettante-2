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
      <div class="col-md caroBox" id="caro1">
        <div id="carousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
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
      <div class="col-md " id="other">
        <div class="caroBox" id="caro2">
          <h3>It's a Wrap!</h3>
          <div id="itsawrap" class="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
            <div class="carousel-inner">
              <div class="carousel-item" v-for="pic in itsawrap">
                <img class="ing-fluid"
                     :src="require('@/assets/welcome/' + pic.source)"
                     :alt="pic.alt">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "src/assets/livery";

#welcome {
  text-align: center !important;

  .caroBox {
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

  #caro2 {
    .carousel-inner {
      box-shadow: none;
      /* This also means that we have to prevent the image in the carousel from having the shadow (otherwise it can look wrong) */
      img {
        border-radius: 5px;
        box-shadow: 5px 5px 10px $colour-body-text-shadow;
        margin: 0;
      }
    }
  }

  //#other {
  //  img {
  //    max-height: 500px;
  //    //width: 75%;
  //    //margin: auto;
  //  }
  //}
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
      ],
      itsawrap: [
        {'source': "hardys-regrets-poster@15.jpg", "alt": "The poster"},
        {'source': "GRA_3203@15.jpg", "alt": "Bill an Mrs. Bill"},
        {'source': "GRA_3566@15.jpg", "alt": "Rose in action"},
        {'source': "GRA_8372@15.jpg", "alt": "The new girl"},
      ]
    }
  },
  mounted() {
    // unless one of the items in the carousel is set to be the active one, it does not seem to start working
    document.getElementsByClassName("carousel-item")[0].classList.add('active')
    document.getElementById('itsawrap').getElementsByClassName("carousel-item")[0].classList.add('active')
  }
}
</script>

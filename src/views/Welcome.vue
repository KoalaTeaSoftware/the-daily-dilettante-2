<template>
  <!--suppress HtmlUnknownBooleanAttribute -->
  <div id="welcome" class="container fluid">
    <div id="welcome-text" class="row">
      <div class="col">
        <h1>Welcome</h1>
        <EditableDiv identity="welcome-1"></EditableDiv>
      </div>
    </div>
    <div id="main-text" class="row">
      <div id="changing-images" class="col col-md-12 col-lg-4">
        <p>The Carousel</p>
        <!--        <b-carousel id="welc-caro" fade class="m-auto" style="margin-bottom: 1em">-->
        <!--          <b-carousel-slide-->
        <!--              v-for="pic in caroImgList"-->
        <!--              :img-src="require('@/assets/welc-caro/' + pic)"-->
        <!--              v-bind:key="pic">-->
        <!--          </b-carousel-slide>-->
        <!--        </b-carousel>-->
      </div>
      <div id="overview" class="col col-md-12 col-lg-4">
        <p>About The Daily Dilettante</p>
        <EditableDiv identity="welcome-2"></EditableDiv>
      </div>
      <div id="blog-role" class="col col-md-12 col-lg-4">
        <p>The Blog</p>
        <!--TumblrBlock
            trimLength=0
            redirect-location=""
            blogType="notice"
            maxNumPosts="1"
        ></TumblrBlock-->
        <!--suppress HtmlUnknownTarget -->
        <a href="/novels" class="more"> read more ... </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "src/assets/livery";

#welcome {
  text-align: center !important;
  //div{
  //  border-style: solid;
  //  border-color: gray;
  //  border-width: 1px;
  //}
  p {
    text-align: center;
  }

  #overview{
    margin-top: 1em;
  }
  #welcome-1 {
    .editedContent {
      font-size: larger;
      font-weight: bolder;
    }
  }

  #blog-role {
    margin: auto;

    img {
      //width: 100%; /* Force the image to be sized by the column width, not from the source */
      margin: 0.5em;
    }
  }
}
</style>

<script>
import EditableDiv from "@/components/EditableDiv";
// import TumblrBlock from "@/components/TumblrBlock";

export default {
  name: 'Welcome',
  components: { EditableDiv},
  data() {
    return {
      caroImgList: [
        "silverville-principle-women.jpg",
        "thackeray-books.jpg",
        "Maria_Edgeworth_by_John_Downman_1807.jpg",
        "trollope-books.jpg",
        "trollope-portrait.jpg"
      ]
    }
  }
}
</script>

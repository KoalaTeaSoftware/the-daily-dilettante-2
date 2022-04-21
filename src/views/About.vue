<template>
  <div id="about"  class="container-fluid">
    <div class="row  align-items-center">
      <div class="col-md-4" id="rose-image-box">
        <img class="img-fluid" :src="require('@/assets/about/rose.jpg')" alt="Rose" />
      </div>
      <div class="col">
        <EditableDiv identity="about-editor-title"></EditableDiv>
        <EditableDiv identity="rose-bio"></EditableDiv>
      </div>
    </div>
    <div class="row align-items-start" id="rose-as">
      <div class="col-md" v-for="data in caroDataList" :key="data.link" >
        <h2>{{ data.caption }}</h2>
        <img v-if="data.img" :src="require('@/assets/about/' + data.img)" class="img-fluid" alt="headimg"/>
        <EditableDiv v-if="data.body" :identity="data.body" class="about-caro-text"></EditableDiv>
      </div>
    </div>
  </div>
</template>

<script>
import EditableDiv from "@/components/EditableDiv";

export default {
  name: "About",
  components: {EditableDiv},
  data() {
    return {
      caroDataList: [
        {
          img: "caro-on-release.jpg",
          caption: "Rose as Film Maker",
          body: "rose-as-film-maker"
        },
        {
          img: "caro-stories.jpg",
          caption: "Rose as Podcaster",
          body: "rose-as-podcaster"
        },
        {
          img: "caro-instagram2.jpg",
          caption: "Rose as Artist",
          body: "rose-as-artist"
        },
        {
          img: "",
          caption: "Rose as Writer",
          body: "rose-as-writer"
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#about{
  #rose-image-box{
    padding: 1em;
  }
}

#roseBioBlock {
  img {
    margin-bottom: 0.5em;
  }
}

.about-caro-text {
  p {
    text-align: center;
    // this is required because the nice shadow around the iframe makes the caption below it look cramped
    // sadly, I can't target that caption any better than this, but collateral damage seems negligible
    margin-top: 0.5em;
  }
}

</style>

This component uses a 'identity' _Property_ that gives the div (that wraps it) an HTML ID attribute. This could be used by CSS.
It depends on previous, external setting-up of the Firebase firestore stuff.
It depends on a firestore collection called pages. Each item in that collection must have:
1) A string attribute called pageName which must match to the identity property's value
2) A string attribute called contents

ToDo: Currently, it is not clever enough to create a page if it does not already exist

The VueShowdown component is detailed in various places
* https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax
* https://vue-showdown.js.org/

NOTE: Anyone that is logged-in will be able to edit, therefore use the Firebase console to ensure that only editors
have credentials that allow them log in

The markDownPanel that the user sees within the page takes in MarkDown and interprets it as HTML. The user journey is:
* double-click the div - gives a pop-up
* edit the markdown
* click preview - you see what it **will** look like to the world
* If you like it
* Double-click it again -> the popup again
* Click the publish button
* If you don't like ti, just refresh the page

<template>
  <div :id="this.identity" @click="editMe" class="container-fluid editableDiv">
    <div v-show="busy" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <span class="sr-only" v-show="busy">Loading...</span>
    <!--suppress SpellCheckingInspection taskLists-->
    <markDownPanel
        class="container-fluid editedContent"
        flavor="github"
        :options="{ emoji: false, tasklists : false }"
        :markdown=this.displayVersion
        style="text-align: left"
    />
  </div>
</template>

<script>
import {VueShowdown} from 'vue-showdown';
import firebase from "firebase/app";
import "firebase/firestore"

export default {
  props: {identity: String},
  components: {'markDownPanel': VueShowdown},
  data() {
    return {
      busy: true,
      // currentUser: null,
      displayVersion: "Loading ....", // this is read from the store, shown on the screen and initialised the edit panel
      trialVersion: "Loading ....", // this is what is in the edit panel, directly editable by the user
      docId: null, // shared between the reading and writing actions
      serverError: "",
      modalId: this.identity + '-editor',
      editPanelId: this.identity + '-markdown-area'
    }
  },
  mounted() {
    // try to read the required document
    firebase.firestore()
        .collection("pages")
        .where("pageName", "==", this.identity)
        .get()
        .then(querySnapshot => {
          this.busy = false
          this.displayVersion = querySnapshot.docs[0].data().contents
          this.docId = querySnapshot.docs[0].id
          this.trialVersion = this.displayVersion
        })
        .catch(function (e) {
          // If it fails, it doesn't really matter - a doc will be created at publish-time
          console.error(`Unable to get, or show the page: ${e.message}.`);
        })
  }
}
</script>

<style lang="scss">
.editableDiv {
  h1 {
    text-transform: capitalize
  }
}
</style>

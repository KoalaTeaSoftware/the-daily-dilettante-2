This component uses a 'identity' _Property_ that gives the div that wraps it an HTML ID attribute. This could be used by CSS.
It depends on previous, external setting-up of the Firebase firestore stuff.
It depends on a firestore collection called pages. Each item in that collection must have:
1) A string attribute called pageName which must match to the identity property's value
2) A string attribute called contents

The VueShowdown component is detailed in various places
* https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax
* https://vue-showdown.js.org/

<template>
  <div :id="identity" class="editableDiv">
    <div v-show="busy" class="loadingSpinner">
      <div class="spinner-border" role="status"/>
      <span class="sr-only">Loading...</span>
    </div>
    <markDownPanel
        class="displayedContent"
        :markdown=publishedContent
        flavor="github"
        :options="{ emoji: false, tasklists : false }"
    />
  </div>
</template>

<script>
import {VueShowdown} from 'vue-showdown';
import {collection, query, where, getDocs} from "firebase/firestore";
import {DB_HANDLE} from "@/main";

// Note that the showdown-capable panel is given the name 'markDownPanel', and this name us used when the element is declared in the template
// noinspection JSUnusedGlobalSymbols
export default {
  props: {identity: String},
  components: {'markDownPanel': VueShowdown},
  data() {
    return {
      busy: true,
      publishedContent: "Loading ....", // this is read from the store, shown on the screen and initialises the edit panel
      docId: null, // shared between the reading and writing actions
      // trialVersion: "Loading ....", // this is what is in the edit panel, directly editable by the user
      // modalId: this.identity + '-editor',
      // editPanelId: this.identity + '-markdown-area',
      serverError: ""
    }
  },
  mounted() {
    const QUERY = query(collection(DB_HANDLE, "pages"), where("pageName", "==", this.identity));

    getDocs(QUERY)
        .then((querySnapshot) => {
          this.publishedContent = querySnapshot.docs[0].data().contents
          this.docId = querySnapshot.docs[0].id
          // this.trialVersion = this.displayVersion
          this.busy = false
        })
        .catch(err => {
          console.log(JSON.stringify(err))
        })
  }
}
</script>

<style lang="scss">
#editableDiv {
  // ToDo: why is this here?
  //h1 {
  //  text-transform: capitalize
  //}
}
</style>

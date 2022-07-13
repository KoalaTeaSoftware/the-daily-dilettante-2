<template>
  <div id="events" class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Events</h1>
        <editable-div identity="partners-1"></editable-div>
      </div>
    </div>
    <div class="row">
      <div class="card series">
        <div class="card-body">
          <h2>Widget</h2>
          <editable-div identity="partners-widget"></editable-div>
        </div>
        <div class="tt-widget" id="tt-widget">
          <img id="tt-widget-sample" :src="require('@/assets/ticketTailorWidgetSample.gif')"
               alt="Sample image of what the widget will look like">
        </div>
        <button type="button" class="btn btn-lg btn-block branded-button" @click="getSSRWidgetCode">Get code for
          insertion into a conventional web
          site
        </button>
        <button type="button" class="btn btn-lg btn-block branded-button" @click="showCSRHelp">See how to add this
          widget to a Client Side
          Rendered web page
        </button>
      </div>
    </div>
  </div>
  <div class="modal" tabindex="-1" id="clientSideRenderHelp">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Embedding this widget in a CSR site</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideCSRHelp">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <editable-div identity="partners-widget-csr-help"></editable-div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" tabindex="-1" id="serverSideRenderHelp">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Embedding this widget in a conventional site</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideSSRHelp">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <editable-div identity="partners-widget-ssr-help"></editable-div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import EditableDiv from "@/components/EditableDiv";

export default {
  name: "Events",
  components: {EditableDiv},
  data() {
    return {
      selectedEventId: '1466067',
      referralTag: 'hardysoc'
    }
  },
  methods: {
    getSSRWidgetCode: () => {
      navigator.clipboard.writeText('\
      <!-- Ticket Tailor Widget. Paste this into your website where you want the widget to appear. Do not change the code or the widget may not work properly. -->\
          <div class="tt-widget">\
            <div class="tt-widget-fallback">\
              <p>\
                <a href="https://www.tickettailor.com/checkout/new-session/id/1466067/chk/cc97/?ref=website_widget" target="_blank">Click here to buy tickets</a>\
              </p>\
            </div>\
            <script src="https://cdn.tickettailor.com/js/widgets/min/widget.js" \
                    data-url="https://www.tickettailor.com/checkout/new-session/id/1466067/chk/cc97/ " \
                    data-type="inline" data-inline-minimal="false" data-inline-show-logo="true" data-inline-bg-fill="false" \
                    data-inline-inherit-ref-from-url-param="hardySoc" data-inline-ref="website_widget"><\/script> \
          </div>\
      <!-- End of Ticket Tailor Widget -->'
      ).then(() => {
        $('#serverSideRenderHelp').modal('show')
      }).catch(err => {
        console.log(`Error writing to the clipboard [${err.toString()}]`)
        alert("there appears to have been a problem capturing this text into your clipboard. Please use the contact page and we will assist as soon as possible.")
      })
    },
    showSSRHelp: () => {
      $('#serverSideRenderHelp').modal('show')
    },
    hideSSRHelp: () => {
      $('#serverSideRenderHelp').modal('hide')
    },
    showCSRHelp: () => {
      $('#clientSideRenderHelp').modal('show')
    },
    hideCSRHelp: () => {
      $('#clientSideRenderHelp').modal('hide')
    }
  },
  mounted() {
    /*
    This web site is a client-side-rendered web site, so you can't simply put a bit of script on a page and expect it to work.
    When the page is ready, the following sticks a new script object into the DOM at the right place (#tt-widget),
    and gives it the appropriate attributes
     */
    const script = document.createElement('script')
    script.async = true
    script.setAttribute('id', 'tt-widget-script')
    script.setAttribute('class', 'd-none')
    script.setAttribute('src', 'https://cdn.tickettailor.com/js/widgets/min/widget.js')
    script.setAttribute('data-url', `https://www.tickettailor.com/checkout/new-session/id/${this.selectedEventId}/chk/cc97/?ref=website_widget`)
    script.setAttribute('data-type', 'inline')
    script.setAttribute('data-inline-minimal', 'true')
    script.setAttribute('data-inline-show-logo', 'false')
    script.setAttribute('data-inline-bg-fill', 'true')
// This one may allow me to identify which sales were generated through the widget (it may be overridden by the one below)
    script.setAttribute('data-inline-ref', 'website_widget')
// This one should allow us to identify tickets sold through the Thomas Hardy Society
    script.setAttribute('data-inline-inherit-ref-from-url-param', 'hardySoc')
    script.onerror = error => {
      console.log(`Failed to set up the widget [${error}]`)
    }
    script.onload = () => {
      // the rendering of the actual widget was successful, so hide the sample image
      document.getElementById('tt-widget-sample').setAttribute('class', 'd-none')
    }
    // OK, all is ready, so put the real widget in place
    const widgetHome = document.getElementById('tt-widget')
    widgetHome.append(script)
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

.card {
  background-color: transparent;
  border-radius: 5px;
  box-shadow: 5px 5px 10px black;
  margin: 0.5em 0.25em 0.25em;

}

#shop-front {
  color: red !important;
}

.branded-button {
  background-color: $colour-banner-background;
  color: $colour-banner-primary-text;
  margin: .25em;
}

.branded-button:hover {
  color: $colour-banner-primary-text;
  font-weight: bold;
}
</style>
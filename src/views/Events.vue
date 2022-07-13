As of now, there is only the one event. Later on there may be more. It may be good to get much of the info about the event out of ticket tailor, rather than repeating it.


<template>
  <div id="events" class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Upcoming Events</h1>
        <editable-div identity="partners-1"></editable-div>
      </div>
    </div>
    <div class="row container m-auto">
      <div class="card series">
        <h2 class="card-title">Hardy's Regrets - A Screening</h2>
        <div class="card-body">
          <div class="row">
            <div class="col">
              <figure>
                <img class="img-fluid" :src="require('@/assets/events/hardys-regrets-poster@25.jpg')"
                     alt="Card image cap">
                <figcaption>This image can be retrieved using this URL <code>https://firebasestorage.googleapis.com/v0/b/daily-dilettante.appspot.com/o/events%2Fhardys-regrets%2Fhardys-regrets-poster%4025.jpg?alt=media&token=2889ede9-26d4-4d44-8e58-25a984951983</code>
                </figcaption>
              </figure>
            </div>
            <div class="col">
              <h3>Event Summary</h3>
              <dl>
                <dt>Event Title</dt>
                <dd>Hardy's Regrets - A Screening Event</dd>

                <dt>On</dt>
                <dd>16<sup>th</sup> December 2020<br/><em>The date may change to the nearest Saturday.</em></dd>

                <dt>Starts</dt>
                <dd>7:30 pm until 11:30 pm</dd>

                <dt>Brief Description</dt>
                <dd>Feature Film;<br/>Hog Roast;<br/>Ceilidh;<br/>Fancy Dress</dd>

                <dt>Location</dt>
                <dd>Dorchester Rugby Club, Coburg Rd, Dorchester DT1 2HX</dd>

                <dt>Buy tickets from</dt>
                <dd>
                  <a href="https://www.tickettailor.com/events/thedailydilettante/723277/r/hardysoc"
                     target="_blank">https://www.tickettailor.com/events/thedailydilettante/723277/r/hardysoc</a>
                  <p><em>Please note that the link text that you can see will indicate to us that the ticket has been
                    bought through The Thomas Hardy Society. Without it we will be unsure what donation is due to that
                    society.</em></p>
                  <p><em>Also note that this link is to a Ticket Tailor page. The button background colour on that site is #CF3B4D and its foreground colour is #FFFFFF</em></p>
                </dd>
              </dl>
            </div>
          </div>
          <div class="row" id="details">
            <div class="col">
              <h3>Detailed Description</h3>
              <p>The UK Premiere of a locally-made feature film "Hardy's Regrets", the first in young film maker Rose
                Goldthorp's project "The Wessex Dramas". In this project, Rose is making one Hardy feature film and
                three Hardy podcast seasons each year.</p>
              <p>This first screening event is of:</p>
              <ul style="list-style: none">
                <li><b>1) Feature Film</b> "Hardy's Regrets", an anthology feature film.</li>
                from Hardy's short stories:
                <ul style="list-style: none">
                  <li>The Superstitious Man</li>
                  <li>The Withered Arm</li>
                  <li>The Three Strangers</li>
                  <li>What The Shepherd Saw</li>
                </ul>
                <p>(Cast and crew are from Dorset, and thanks are due to them, as well as to: The National Trust; The
                  Royal
                  Manor Theatre, Portland; The Thomas Hardy Society; The New Hardy Players; The Tout Quarry Sculpture Park
                  and The Weymouth Movie Makers.)</p>
              <li><b>2) Hog Roast</b> (with option)</li>
              <li><b>3) Ceilidh</b> with a local band, and a caller</li>
              <li><b>4) Prize</b> for the best Victorian Rural costume</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h3>Other Assets</h3>
              <div class="row">
                <div class="col">
                  <div class="card">
                    <div class="card-body">
                      <figure>
                        <img :src="require('@/assets/events/hardys-regrets-square@25.jpg')" class="img-fluid">
                        <figcaption>This square image can be retrieved from <code>https://firebasestorage.googleapis.com/v0/b/daily-dilettante.appspot.com/o/events%2Fhardys-regrets%2Fhardys-regrets-square%4025.jpg?alt=media&token=6163c24a-6212-4f36-b43d-b314eca46348</code>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card">
                    <div class="card-body">
                      <a id="rose-web-link" href="https://rosegoldthorp.com/" target="_blank">Rose's portfolio web
                        site</a>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <figure>
                        <img :src="require('@/assets/events/hardys-regrets-t-tailor.jpg')" class="img-fluid">
                        <figcaption>This shallow, wide image can be retrieved from <code>https://firebasestorage.googleapis.com/v0/b/daily-dilettante.appspot.com/o/events%2Fhardys-regrets%2Fhardys-regrets-t-tailor.jpg?alt=media&token=8178d873-df49-4d9c-89ad-de28e306cf63</code>
                        </figcaption>
                      </figure>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <p>If you have any other requirements, want to know more about this event, then please contact us
                        through our
                        <a href="/contact?subject=Please tell me about the Hardy's Regrets event">contact
                          form</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#events {
  .card {
    background-color: transparent;
    border-radius: 5px;
    box-shadow: 5px 5px 10px black;
    margin: 0.5em 0.25em 0.25em;

    h2 {
      padding-top: 0.5rem;
    }

    #details {
      padding-top: 1rem;
      b{
        font-size: large;
      }
    }

    figcaption {
      padding-top: 0.75rem;
    }
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
}
</style>
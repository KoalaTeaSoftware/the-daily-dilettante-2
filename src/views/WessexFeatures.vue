<template>
  <div id="wessex-features" class="container">
      <h1>Thomas Hardy's Wessex Dramas</h1>
      <h2>A Duo of Anthology Features:</h2>
      <div class="row">
        <div v-for="movie in movies" class="col" :id="movie.id">
          <div class="row">
            <h3 v-html="movie.title"></h3>
            <p>Everyone is welcome to audition for this feature's, cast and crew roles. Please drop us a line
              using <!--suppress HtmlUnknownTarget -->
              <a href="/contact?subject=Audition for Hardy's Regrets" title="Go to the contact form">
                our contact form
              </a>
            </p>
          </div>
          <div class="row">
            <div class="col-md-3">
              <img class="poster img-fluid"
                   :src="require('@/assets/wessex/features/'  + movie.poster)"
                   alt="Poster for the film">
            </div>
            <div class="col">
              <ol>
                <li v-for="component in movie.components">
                  <div class="row movie-list">
                    <div class="col">{{ component.title }}</div>
                    <div class="col>">
                      <a :href="component.screenplay"
                         class="list-item-additional-data ext-link"
                         target="_blank">Screenplay</a>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h4>Shooting Dates</h4>
              <ol>
                <li v-for="component in movie.components">
                  <div class="row  movie-list">
                    <div class="col">{{ component.title }}</div>
                    <div class="col">
                      <span class="list-item-additional-data" v-html="'Shooting: ' + component.shooting"/>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div class="row text-center">
        <div class="col">
          <h4>Locations</h4>
          <p>1 weekend outdoors & 1 weekend indoors, for each short story, in the Portland / Weymouth area: Hardy's
            home</p>
          <p>These four shorts will be linked by a narrator, to create a feature-length film. Then the Worldwide
            Premiere wil be held at Christmas, locally</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "WessexFeatures",
  data() {
    return {
      "movies": [
        {
          "id": "regrets",
          "title": "Hardy's Regrets:&#160;2022",
          "poster": "regrets-poster.jpg",
          "components": [
            {
              "title": "The Superstitious Man",
              "screenplay": "https://www.dropbox.com/s/84fyxi7g2273rn4/The%20Superstitious%20Man%20D1%20R3.pdf?dl=0",
              "shooting": "2 weekends late&nbsp;April&nbsp;'22"
            },
            {
              "title": "The Withered Arm:",
              "screenplay": "https://www.dropbox.com/s/mc71pgg068p0tmz/The%20Withered%20Arm%20D1%20R3.pdf?dl=0",
              "shooting": "2 weekends late&nbsp;May&nbsp;'22"
            },
            {
              "title": "What the Shepherd Saw",
              "screenplay": "https://www.dropbox.com/s/bvxpq7bj76dywkd/What%20The%20Shepherd%20Saw%20D1%20R3.pdf?dl=0",
              "shooting": "2 weekends late&nbsp;June&nbsp;'22"
            },
            {
              "title": "The Three Strangers",
              "screenplay": "https://www.dropbox.com/s/vbmwyjz74gbwlm0/The%20Three%20Strangers%20D1.pdf?dl=0",
              "shooting": "2 weekends late&nbsp;July&nbsp;'22"
            }
          ]
        },
        {
          "id": "hand-of-fate",
          "title": "Hardy's Hand of Fate:&#160;2023",
          "poster": "hand-of-fate-poster.jpg",
          "components": [
            {
              "title": "Interlopers at the Knap",
              "screenplay": "https://www.dropbox.com/s/pa7rb75yxg6y1ln/Interlopers%20At%20The%20Knap%20D1%20R1.pdf?dl=0",
              "shooting": "2 weekends late&nbsp;April&nbsp;'23"
            },
            {
              "title": "Netty Sargent's Copyhold",
              "screenplay": "https://www.dropbox.com/s/hr18jmd1730aet5/Netty%20Sergeant%27s%20Copyhold%20D1.pdf?dl=0",
              "shooting": "2 weekends late&nbsp;May&nbsp;'23"
            },
            {
              "title": "The History of the Hardcombes",
              "screenplay": "https://www.dropbox.com/s/v4w85a49ntvn09h/the%20history%20of%20the%20hardcomes%20D1.pdf?dl=0",
              "shooting": "2 weekends late&nbsp;June&nbsp;'23"
            },
            {
              "title": "Tony Kyte, the Arch Deceiver",
              "screenplay": "https://www.dropbox.com/s/7f1cj9jh62pvszk/Tony%20Kytes%2C%20The%20Arch-Deceiver%20D1.pdf?dl=0",
              "shooting": "2 weekends late&nbsp;July&nbsp;'23"
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#wessex-features {
  .poster {
    margin: auto;
  }

  h4 {
    text-align: unset; // remove the default left alignment
  }

  .movie-list >*{
    width: unset;
  }

  ol {
    list-style-type: lower-roman;
    text-align: left;
    padding-left: 0.5em; // list do not need to have their normal indenting

    li {
      margin-top: .5rem;

      .list-item-additional-data {
        float: right;
      }

    }
  }
}
</style>

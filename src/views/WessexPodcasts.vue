<template>
  <div class="container" id="wessex-podcasts">
    <h1>Thomas Hardy's Wessex Dramas</h1>
    <h2>Dramatic Podcast Releases in 2022</h2>
    <div class="card series" v-for="book in books">
      <div class="card-body">

        <div class="row">
          <div class="col-md-2">
            <img class="img-fluid"
                 :src="require('@/assets/wessex/podcasts/' + book.poster)"
                 alt="Poster for the podcast">
          </div>
          <div class="col">
            <h3>{{ book.title }}<span class="dueDate">({{ book.dueDate }})</span></h3>
            <p v-for="para in book.synopsis" class="book_synopsis">{{ para }}</p>
          </div>
        </div>

        <div class="row bookPodcasts">
          <div class="seasonPodcastList card-group">
            <div v-for="episode in book.episodeList" class="card podcastEpisode">
              <div v-if="episode" class="m-auto">
                <span v-if="episode.episodeNumber >= 0" class="episodeNumber">{{ episode.episodeNumber }}</span>
                <audio controls preload="metadata" v-bind:src="episode.linkSrc">
                  <source v-bind:src="episode.linkSrc" :type="episode.linkType">
                  It appears that your browser can not play this,
                  please try going to <a href="https://thedailydilettante.podbean.com/">https://thedailydilettante.podbean.com/</a>
                  for the archive on Podbean.
                </audio>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <a :href="book.screenplayLink"
           target="_blank"
           class="list-item-additional-data ext-link"
           title="See the screenplay in a new tab"
        >Click here to read the feature's screenplay</a>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "WessexPodcasts",
  data() {
    return {
      books: [
        {
          title: "Desperate Remedies",
          poster: "desperate-remedies/desperate-remedies-poster.jpg",
          dueDate: "Starts Jan",
          synopsis: ["Cytherea, an orphaned teenaged girl, is forced to become a paid companion to a wealthy woman, Miss Aldclyffe. Cytherea’s fiancé is tricked away from her, and she is pressured into marrying Miss Aldclyffe’s own illegitimate, already-married son.",
            "Cytherea desperately tries to discover if she, herself, truly is married, or not, and how many “wives” are actually involved",
            "….. all before this heir gets his hands on her"
          ],
          episodeList: [],
          screenplayLink: "https://www.dropbox.com/s/8678tahc96nqulf/Desperate%20remedies%20-%20podcasted%20-%20screenplay.pdf?dl=0"
        },
        {
          title: "The Hand of Ethelberta",
          poster: "the-hand-of-ethelberta/Thumbnail.png",
          dueDate: "Starts May",
          synopsis: ["Ethelberta, is an ex-governess from a large servant family. She is already (at 21 years old) widowed, after having married Lady Petherwin's son. When her mother-in-law dies, she attempts to earn her living, dramatising her own poetry. In London, she moves her many siblings, and mother, into her house, passing them off as her own servants in an attempt to disguise her straightened means.",
            "Unfortunately, her young sister, Picotee, falls In love with one of Ethelbert's suitors. Complications ensue."
          ],
          episodeList: [],
          screenplayLink: "https://www.dropbox.com/s/sx6e2dcc6y7bv3p/The%20Hand%20Of%20Ethelberta.pdf?dl=0"
        },
        {
          title: "A Laodicean",
          poster: "a-laodicean/poster.jpg",
          dueDate: "Starts Sept",
          synopsis: ["George Somerset, a new Architecture graduate, asks to sketch the interior of a castle. He ends up falling in love with its millionaire owner, Paula Power: a very 'Modern Miss' with decided opinions of her own.",
            "Unfortunately there are malignant influences amongst the former aristocratic castle-owners, and the course of love does not run so smooth."
          ],
          episodeList: [],
          screenplayLink: "https://www.dropbox.com/s/zbg3snqs8vyn49p/2021-12-28%20A%20Laodicean%20-%20podcasted.pdf?dl=0"
        }
      ]
    }
  },
  mounted() {
    fetch('https://feed.podbean.com/thedailydilettante/feed.xml')
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
              const itemList = data.querySelectorAll('item')
              itemList.forEach(item => {
                console.log(`processing an item:${item}`)
                try {
                  const episodeIndex = item.getElementsByTagName('itunes\:episode')[0].textContent - 1
                  const bookIndex = item.getElementsByTagName('itunes\:season')[0].textContent - 1

                  const audInfo = item.getElementsByTagName('enclosure')[0]
                  const audSrc = audInfo.getAttribute('url')
                  const audSize = audInfo.getAttribute('length')
                  const audType = audInfo.getAttribute('type')

                  // const thumb = item.getElementsByTagName('itunes\:image')[0].getAttribute('href')
                  const episodeDefinition = {
                    episodeNumber: episodeIndex + 1,
                    linkSrc: audSrc,
                    linkSize: audSize,
                    linkType: audType
                  }

                  this.books[bookIndex].episodeList.push(episodeDefinition)
                } catch (err) {
                  console.log("Failed to process one of the episodes. Going to try to continue with the remaining episodes")
                  console.log(err.message)
                }
              }) // ends loop
            }
        )
    //end mounted
  }
}
</script>

<style lang="scss">
@import "src/assets/livery";

#wessex-podcasts {

  .bookDetails {
    overflow: auto; /* this forces the block containing the podcasts to clear the image, even if there is not a lot of text*/
  }

  .seasonPodcastList {
    margin: auto;

    .podcastEpisode {
      border: none;
      box-shadow: none;
      padding-left: 1em;
      /* it is important to set a min width here, otherwise bootstrap can try to overlap these on smallish screens */
      min-width: 20em;

      .episodeNumber {
        vertical-align: top;
        margin-right: 0.5em;
      }
    }
  }

  .card {
    background-color: transparent;
    border-radius: 5px;
    box-shadow: 5px 5px 10px black;
    margin: 0.5em 0.25em 0.25em;

    .card-body {
      h4 {
        text-align: unset;
        font-weight: bold;
      }

      img {
        float: left;
      }

      .dueDate {
        float: right;
        font-weight: normal;
      }

      audio {
        margin: 0.5em auto auto;
        height: 2em;
      }

      a {
        margin: auto
      }

      .list-item-additional-data {
        padding-bottom: .75em;
      }

    }
  }
}
</style>

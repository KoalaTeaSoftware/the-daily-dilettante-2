# The Daily Dilettante

## Project Structure
* Bootstrap 5
  - pulled in using ~/index.html
  - This necessitates jquery (3.4 - I think that is what BootStrap had me pull in)
* CSS
  * Basic livery, and page layout - set in ~/App.vue
  * Each 'page' has any modifying CSS statements built into itself
* Control
  * ~/main.js
    * Provide firebase linkage
    * Exports 
      * DB_HANDLE - this give access to the Firestore (see, e.g. EditableDive)
      * APP_HANDLE - not sure what use this is going to be outside of main.js
* Testing Dependencies
  * Chance
  * Cypress uses a Cypress environment variable set in ~/cypress.json to tell it where the mail handler is
  
  ``    "mailHandler": "https://us-central1-daily-dilettante.cloudfunctions.net/sendMail"``
  ``        "mailHandler": "http://localhost:5001/daily-dilettante/us-central1/sendMail"``
  * 

### Contact form
* Shared configuration
  * ~/functions/emai.config.json
* Firebase Secrets
  * The credentials, host and port for the mail server are set using environment variables
    * ``firebase functions:config:get``
    * ``firebase functions:config:set email.host="mail.thedailydilettante.com" email.port="465" email.secure="true" email.user="" email.pass="
      !"``
* Server-side Filtering
  * Dependencies (Make sure that these are not installed a dev deps.)
    * node-mailer
    * email-validator
## Testing on Stage
* firebase use stage???
* this will _probably_ cause ``firebase deploy`` to put it on Staging
* ToDo: make this documentation more definitive

## Integration with Cypress Dashboard
* Dashboard is at 
  * https://dashboard.cypress.io/projects/vwhed1/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D
  * 

## Deployment
* Push to GitHub invokes a build, test, and deploy
    * ~/.github/firebese-hosting-merge.yml
        * This set the channelId = live, to it will deploy to live
* ~/.firebasesrc
  * This defines a staging and a live environment
  * ToDo: how do we make aure that deployement is to Live?
  * Currently (I think)


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

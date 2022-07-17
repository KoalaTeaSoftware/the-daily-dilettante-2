# Project Design and Structure
* Bootstrap 5
    - pulled in using ~/index.html
    - This necessitates jquery (3.4 - I think that is what BootStrap had me pull in)
* CSS
    * Basic livery, and page layout - set in ~/App.vue
    * Each 'page' has any modifying CSS statements built into itself
* Control
    * ~/main.js
        * Provides firebase linkage
        * Exports
            * DB_HANDLE - this give access to the Firestore (see, e.g. EditableDive)
            * APP_HANDLE - not sure what use this is going to be outside of main.js
* Testing Dependencies
    * Chance
    * Cypress uses a Cypress environment variable set in ~/cypress.json to tell it where the mail handler is

  ``    "mailHandler": "https://us-central1-daily-dilettante.cloudfunctions.net/sendMail"``
  ``        "mailHandler": "http://localhost:5001/daily-dilettante/us-central1/sendMail"``
    * 
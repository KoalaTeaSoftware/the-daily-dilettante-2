# Contact form

* Shared configuration 
  * firebase functions, and the UI share a set of constraints on what is acceptable
  * ~/functions/email.config.json
* Firebase Secrets
    * The credentials, host and port for the mail server are set using environment variables
        * ``firebase functions:config:get``
        * ``firebase functions:config:set email.host="mail.thedailydilettante.com" email.port="465" email.secure="true" email.user="" email.pass="
          !"``
* Server-side Filtering
    * Dependencies (Make sure that these are not installed a dev deps.)
        * node-mailer
        * email-validator

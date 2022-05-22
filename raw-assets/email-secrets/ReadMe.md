# Establish secret key:value pairs in Firebase env

`functions:config:set env="$(cat config.json)"`

# Getting them out separately

```
const secretKey  = auth.config().config.key;
const secretPass = auth.config().config.pass;
```

https://nodemailer.com/smtp/

* npm install nodemailer

# Step1: Create a Transport

* In the code

```
let transporter = nodemailer.createTransport(transportConfigObject[, defaultsObject])
`````

* Where
    * transportConfigObject - sets the details needed to create the connection
    * defaultsObject - set of default values that will be used if not provided

Or, instead of the options object, you could use a URL (that has to be either STMP://, or STMPS://)

```apacheconf
let poolConfig = "smtps://username:password@smtp.example.com/?pool=true";
```

* SMTP Options:
    * see https://nodemailer.com/smtp/
    * host
        * Hostname - this will use nrmal DNS lookup to get IP
        * IP address - if no lookup is possible _using this option, for the actual hostname use **tls.servername**
          parameter_
        * port - defaults to
            * if secure: 465
            * else: 587
        * auth
            * type - defaults to  'login', could be 'oauth2'
            * user
            * pass
        * authMethod
            * defaults to ‘PLAIN’
    * disableFileAccess - if true can never send stuff other than a JSON body

This example would connect to a SMTP server separately for every single message

```
nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "username",
    pass: "password"
  }
});

```

You can verify a connection using this the piece of code
at https://nodemailer.com/smtp/#verify-smtp-connection-configuration

# Step 2: Create a Message

See https://nodemailer.com/message/

* from - email address of the sender either
    * plain' `a@b.com`
    * nicer: `"nice name" a@b.com`
    * see https://nodemailer.com/message/addresses/
* sender - An email address that will appear on the Sender: field (always prefer from if you’re not sure which one to
  use)
* replyTo - An email address that will appear on the Reply-To: field
* to - a comma-separate list
* cc
* bcc
* subject
* text - one of:
    * Unicode string
    * Buffer,
    * Stream,
    * an attachment-like object eg `({path: ‘/var/data/…'})`
* disableFileAccess -
    * if set in the transport options, this will be ignored

```
let message = {
  from: "sender@server.com",
  to: "receiver@sender.com",
  subject: "Message title",
  text: "Plaintext version of the message",
  html: "<p>HTML version of the message</p>"
};
```

The envelope will be created automatically, but it is possible to cause it to create a custom envelope. This would be
used if you were creating "Variable envelope return path" emails.

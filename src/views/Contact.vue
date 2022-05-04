<template>
  <div class="container">
    <h1>Contact</h1>
    <form id="contactForm" @submit="onSubmit" @reset="onReset" autocomplete="off" class="was-validated">
      <!--suppress HtmlFormInputWithoutLabel -->
      <input hidden id="whadyano">
      <p id="server-feedback" v-show="this.serverMessage">{{ serverMessage }}</p>

      <div id="name-group" class="input-group mb-3">
        <span id="nameLabel" class="input-group-text">Your Name</span>
        <input id="name" class="form-control" type="text" placeholder="Your name"
               v-model="formData.name"
               :maxlength="config.nameLengthMax"
               :minlength="config.nameLengthMin"
               :pattern="config.nameRegexp"
               required
               aria-label="Your name" aria-describedby="nameLabel">
        <div class="invalid-feedback"> Please provide a name for me to use.</div>
        <div class="valid-feedback"> Looking good.</div>
      </div>

      <div id="address-group-1" class="input-group">
        <span id="address1Label" class="input-group-text">@</span>
        <input id="address1" type="email" class="form-control" placeholder="you@where?"
               v-model="formData.address1"
               :maxlength="config.emailLengthMax"
               :minlength="config.emailLengthMin"
               required
               aria-label="Your email address" aria-describedby="address1Label">
      </div>

      <div id="address-group-2" class="input-group mb-3">
        <span id="address2Label" class="input-group-text">@</span>
        <input id="address2" type="email" class="form-control  has-validation"
               placeholder="Please type that a second time, just to make sure"
               v-model="formData.address2"
               :maxlength="config.emailLengthMax"
               :minlength="config.emailLengthMin"
               required
               aria-label="Your email address a second time, just in case" aria-describedby="address2Label">
        <div class="invalid-feedback"> Please ensure that both email entry fields are identical.</div>
        <div class="valid-feedback"> Looking good, but if these two are not identical, I still can't send the message.
        </div>
      </div>

      <div id="subject-group" class="input-group mb-3">
        <span id="subjectLabel" class="input-group-text">Subject</span>
        <input id="subject" type="text" class="form-control" placeholder="Please tell me what you are writing about"
               v-model="formData.subject"
               :maxlength="config.subjectLengthMax"
               :minlength="config.subjectLengthMin"
               :pattern="config.subjectRegexp"
               required
               aria-label="The subject of your message" aria-describedby="subjectLabel">
        <div class="invalid-feedback"> Please provide a subject for this message.</div>
        <div class="valid-feedback"> Looking good.</div>

      </div>

      <div id="message-group" class="input-group mb-3">
        <span id="messageLabel" class="input-group-text">Message</span>
        <textarea id="message" rows="7" class="form-control" placeholder="..."
                  v-model="formData.message"
                  :maxlength="config.msgLengthMax"
                  :minlength="config.msgLengthMin"
                  required
                  aria-label="Your email address" aria-describedby="messageLabel"
                  @keyup="showCount"
        ></textarea>
        <div class="invalid-feedback"> What is the message that you want to send?.</div>
        <div class="valid-feedback"> Looking good.</div>
      </div>

      <span id="counter">(Chars left: <span id="letterCount">{{ remainingMsgChars }}</span>)</span>

      <button type="submit" id="submitButton" :disabled="!this.checkAll">Submit</button>
      <button type="reset" id="resetButton">Reset</button>

    </form>
  </div>
</template>

<style lang="scss">
@import "src/assets/livery.scss";

#contactForm {
  .input-group-text {
    border: none;
  }

  .input-group-text {
    background-color: $colour-banner-background;
    color: $colour-banner-primary-text;
    font-family: branded-font, Times New Roman, Times, serif;
  }

  #counter {
    float: right;
    font-size: smaller;
    font-style: italic;
  }

  button {
    margin: 1em; // by default they a jammed together
  }

  #server-feedback{
    background-color: $colour-banner-background;
    color: $colour-banner-primary-text;
    font-family: branded-font, Times New Roman, Times, serif;
  }
}
</style>

<script>

const config = require('../../functions/email.config.json')

const mailService = "https://us-central1-daily-dilettante.cloudfunctions.net/sendMail"

export default {
  name: "Contact",
  data() {
    return {
      serverMessage: null,
      remainingMsgChars: 1,
      formData: {
        name: "",
        address1: "",
        address2: "",
        subject: "",
        message: ""
      },
      config
    }
  },
  methods: {
    onSubmit: function (event) {
      console.log("submitting form")
      event.preventDefault()
      if (this.checkAll) {

        const fields = document.getElementById("contactForm").getElementsByTagName('*');
        for (const elem of fields) {
          elem.disabled = true
        }

        const formData = this.formData
        console.log(`form data ${JSON.stringify(formData)}`)
        console.log(`Sending to ${mailService}`)

        fetch(
            mailService,
            {
              method: 'POST',
              mode: "cors",
              headers: {"content-type": "application/json"},
              body: JSON.stringify(formData)
            })
            .then(response => {
              if (response.ok) {
                this.serverMessage = "Thank you for your message. We will get back to you as soon as possible."
              } else {
                this.serverMessage = "Unfortunately, your message could not be sent. Please try again later."
                response.text().then(text => {
                  console.log(`Sending email has failed because:${text}:`);
                })
              }
            })
            .catch(reason => {
              console.log("Back in the Contact form, Sending email appears to have failed:" + reason);
              this.serverMessage = "Unfortunately, your message could not be sent. Please try again later."
            })
      } else {
        console.log("There is some sort of validation failure")
      }
    },
    onReset: function (event) {
      console.log("Resetting")
      event.preventDefault()
      this.formData.name = this.formData.address1 = this.formData.address2 = this.formData.subject = this.formData.message = ""
    },
    setFieldHighlight: function (element) {
      element.classList.add("erroneousField");
    },
    showCount: function () {
      const len = document.getElementById('message').value.length
      this.remainingMsgChars = (this.config.msgLengthMax - len).toLocaleString()
    }
  },
  computed: {
    checkAll: function () {
      console.log("checking it all")
      return (this.checkName && this.checkEmails && this.checkSubject && this.checkMessage)
    },
    checkName: function () {
      console.log("checking name")
      return (
          (this.formData.name.length > this.config.nameLengthMin) &&
          (this.formData.name.length <= this.config.nameLengthMax) &&
          (this.formData.name.match(this.config.nameRegexp) != null)
      )
    },
    checkEmails: function () {
      console.log("checking emails")
      if (
          (this.formData.address1.length > this.config.emailLengthMin) &&
          (this.formData.address1.length <= this.config.emailLengthMax) &&
          (this.formData.address1 === this.formData.address2)
      ) {
        // can't rely on the browser to validate the email formats, so put it in there
        const exp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        return exp.test(this.formData.address1)
      } else
        console.log("didn't like the emails")
      return false;
    },
    checkSubject: function () {
      console.log("checking subject")
      return (
          (this.formData.subject.length > this.config.subjectLengthMin) &&
          (this.formData.subject.length <= this.config.subjectLengthMax) &&
          (this.formData.subject.match(this.config.subjectRegexp) != null)
      )
    },
    checkMessage: function () {
      console.log("checking message")
      return (
          (this.formData.message.length > this.config.msgLengthMin) &&
          (this.formData.message.length <= this.config.msgLengthMax) &&
          (this.formData.message.match(this.config.msgRegexp) != null)
      )
    }
  },
  mounted() {
    const currentDate = new Date();
    this.remainingMsgChars = config.msgLengthMax

    document.getElementById("name").setAttribute("maxlength", this.config.nameLengthMax.toString())
    document.getElementById("address1").setAttribute("maxlength", this.config.emailLengthMax.toString())
    document.getElementById("address2").setAttribute("maxlength", this.config.emailLengthMax.toString())
    document.getElementById("subject").setAttribute("maxlength", this.config.subjectLengthMax.toString())
    document.getElementById("message").setAttribute("maxlength", this.config.msgLengthMax.toString())

    document.getElementById("whadyano").setAttribute("value", currentDate.getTime().toString())

    const subj = new URLSearchParams(window.location.search).get('subject')
    if (subj && subj.length > 0)
      this.formData.subject = subj.substr(0, (this.config.subjectLengthMax - 1))
  }
}
</script>


// noinspection EqualityComparisonWithCoercionJS

/**
 # Overview
 ## Email Sender
 * This provides the server-side gate-keeping for the email-sending feature presented on the contact page
 * It uses nodemailer (which will have to be installed - to the functions dir, preferably)
 * it is going to send emails from & to the email address given in the configuration (which it `require`s),
 * but the reply-to is going to be what came in, in the call
 *
 * It also relies on various Firebase environment variable (see the definition of the nodemailer transporter)
 * THIS MEANS THAT YOU CAN'T EMULATE IT EASILY
 *
 * You set these up with using the cli with a command a bit like this
 *       and so on
 * see https://firebase.google.com/docs/functions/config-env
 * firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"
 *
 * Call from the front end JavaScript with something like this
 *         fetch(
 *          mailService,
 *             {
 *                method: 'POST',
 *                mode: "cors", // MUST be this, or you don't get to see the response (status, or anything)
 *                headers: {"content-type": "application/json"},
 *                body: JSON.stringify(formData)
 *             })
 * Where formData is a set of field names/vales
 * This content type means that the body will be converted into a JSON object for you
 */

'use strict';

const functions = require('firebase-functions');
const logger = require("firebase-functions/lib/logger");
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator')

const config = require('./email.config.json'); // this file gives constraints on the sizes of fields and the like

exports.sendMail = functions.https.onRequest((inputRequest, outputResponse) => {
    /*
     * Can only send back a single Access-Control-Allow-Origin header.
     * See the sample headers for how you could decide where a real one is coming from, and set it accordingly
     * Mind you, that can probably be spoofed.
     * ToDo: maybe tighten this up when development is settled down a lot
     */
    outputResponse.set('Access-Control-Allow-Origin', '*');

    switch (inputRequest.method) {
        case 'OPTIONS':
            // Pre-flight because of CORS - note that Cypress does not do this, only real browsers
            outputResponse = handlePreFlightChecks(outputResponse)
            outputResponse.status(204).send('');
            return
        case 'POST':
            logger.info("------------------ the real request  -----------------------")
            // ToDo: make use of the time-stamp to try an further reduce the possibility of spam

            if (!Object.keys(inputRequest.body).length) {
                logger.log("There appears to be no body given in the request")
                logger.log(`Request: [${JSON.stringify(inputRequest)}]`)
                outputResponse.status(400).send("Input, input. I need input!")
                return
            }

            const map = new Map(Object.entries(inputRequest.body));
            if (!nameIsGood(map)) {
                logProblem(inputRequest, "name")
                outputResponse.status(400).send("Name  is either inadequate, or contains bad characters")
                return
            }
            if (!addressesAreGood(map)) {
                outputResponse.status(400).send("Emails don't match, or are not valid")
                return
            }
            if (!subjectIsGood(map)) {
                logProblem(inputRequest, "subject")
                outputResponse.status(400).send("Subject is either inadequate, or contains bad characters")
                return
            }
            if (!messageIsGood(map)) {
                logProblem(inputRequest, "message")
                outputResponse.status(400).send("Message is either inadequate, or contains bad characters")
                return
            }

            // so, we have got past all of the content guards, set up the mechanism
            const transporter = nodemailer.createTransport({
                host: functions.config().email.host,
                port: functions.config().email.host,
                secure: functions.config().email.secure,
                auth: {
                    user: functions.config().email.user,
                    pass: functions.config().email.pass
                },
            });

            /*
            Subject line is optional for this transport, but we want it, and have checked that it is given
            The body has to be placed as a string, and  the recipient is going to assume that it is JSON
             */
            const data = {
                from: `${map.get("name")} <${map.get("address1")}>`,
                to: functions.config().email.user,
                subject: map.get("subject"),
                text: map.get("message")
            }

            logger.info(`I/P seems OK, so going to send to ${functions.config().email.host}:${functions.config().email.port}, as user ${functions.config().email.user}`)
            logger.log(`Sending [${JSON.stringify(data)}]`)

            // so we are confident that we have the mechanism in place. Let's see if we are in a testing situation
            if (map.get("name") === "Teddy the special tester") {
                if (map.get("subject") === "Pretend that you liked this message") {
                    logger.log(`The subject was [${data.subject}]`)
                    logger.log("Therefore, I was asked to send back a success message")
                    outputResponse.status(200).send('Thank you Ted., that was nice.');
                    return
                } else {
                    const matched = map.get("subject").match(/^Give me a (\d+)$/i)
                    if (matched) {
                        logger.log(`The subject was [${data.subject}]`)
                        logger.log(`Therefore, I was asked to send back ${matched[1]}`)
                        outputResponse.status(matched[1]).send('OK Ted., you asked for it.');
                        return
                    }
                }
            }

            // OK, so we are in the real world. Lets get on with it then
            // noinspection JSUnusedLocalSymbols
            transporter.sendMail(data)
                .then(r => {
                    outputResponse.status(200).send('Success');
                })
                .catch(e => {
                    logProblem(inputRequest, `Sending failed:${e.toString()}:`)
                    outputResponse.status(500).send(`Failure`);
                })
            break;
        default:
            // an unsanctioned method
            return outputResponse.status(418).send(`Wanna tea?`);
    }
})

/**
 * Because of the CORS, the browser has made a "pre-flight" request.
 * Absolutely, Need to respond with the ACCESS header (his assumes that it has already been set), and a few other things
 * The browser will then make the read request
 *
 * @param outputResponse - from the intitila call
 * @returns - the output response, updated with the appropriate headers
 */
function handlePreFlightChecks(outputResponse) {
    outputResponse.set('Access-Control-Allow-Methods', 'POST'); // this seems to have no effect
    outputResponse.set('Access-Control-Max-Age', '6'); // the browser can cache the response to this call for this number of seconds
    outputResponse.set('Access-Control-Allow-Headers', 'Content-Type'); // this is required, otherwise the pre-flight fails
    return outputResponse
}

function nameIsGood(map) {
    if (map.has("name")) {
        const name = map.get('name')
        if (name.length >= config.nameLengthMin && name.length <= config.nameLengthMax)
            return verifyStringSyntax(name, config.nameRegexp)
    }
    return false
}

function addressesAreGood(map) {
    if (map.has("address1") && map.has("address2")) {
        // thanks https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript?rq=1
        if (emailValidator.validate(map.get("address1")))
            return map.get("address1").valueOf() == map.get("address2").valueOf()
    }
    return false
}

function subjectIsGood(map) {
    if (map.has("subject")) {
        const subject = map.get('subject')
        if (subject.length >= config.subjectLengthMin && subject.length <= config.subjectLengthMax)
            return verifyStringSyntax(subject,config.subjectRegexp)
    }
    return false
}

function messageIsGood(map) {
    if (map.has('message')) {
        const message = map.get('message')
        if (message.length >= config.msgLengthMin && message.length <= config.msgLengthMax)
            return verifyStringSyntax(message, config.msgRegexp)
    }
    return false
}

function verifyStringSyntax(variable, regexp) {
    const re = RegExp(regexp)
    return re.test(String(variable));
}

function logProblem(inputRequest, specifics) {
    logger.debug("--------------------------------------------------------")
    logger.debug(`Entries:${Object.entries(inputRequest.body)}:`)
    logger.debug(`Keys:${Object.keys(inputRequest.body)}:`)
    logger.debug(`Val:${Object.values(inputRequest.body)}:`)
    logger.error(`Failure: ${specifics}`)
    logger.debug("--------------------------------------------------------")
}

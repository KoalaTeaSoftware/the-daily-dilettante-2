require("../contactFormUtilities.js")

const config = require('../../../../../functions/email.config.json')

describe('Sending mail is secured by server-side filtering', () => {
    let payload

    const address = chance.email()

    // The API recognises some of these values and will not actually send the message to the world
    // Testing that is reserved to a manual UAT
    const sampleRequest = {
        name: "Teddy the special tester",
        address1: address,
        address2: address,
        subject: "Pretend that you liked this message",
        message: chance.sentence()
    }

    beforeEach(() => {
        // make up a well-built payload, but which will be recognised as a request to STUB
        payload = sampleRequest
    })

    it('Responds as expected to a well-formed stub-successfully request', () => {
        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(200)
                expect(response.body).to.be.eq('Thank you Ted., that was nice.')
            })
    })

    it('Responds as expected to a well-formed stub-failure request', () => {
        const stat = 500
        payload.subject = `Give me a ${stat}`
        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(stat)
                expect(response.body).to.be.eq('OK Ted., you asked for it.')
            })
    })

})
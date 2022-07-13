import {INVALID_CHAR_POOL, makeFormData} from "../contactFormUtilities";
const config = require('../../../../../functions/email.config.json')

describe('the sever-side mail handler checks the message', () => {
    let payload

    beforeEach(() => {
        // make up a well-built payload, but which will be recognised as a request to STUB
        payload = makeFormData()
    })

    it('Rejects a message missing the message', () => {
        delete payload.message

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Message')
            })
    })

    it('Rejects a message with an empty message field', () => {
        payload.message = ''

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Message')
            })
    })

    it('Rejects a message with a too-short message', () => {
        payload.message = chance.word({length: (config.msgLengthMin - 1)})

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Message')
            })
    })

    it('Rejects a message with a too-long Message', () => {
        payload.message = chance.word({length: (config.msgLengthMax + 1)})

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Message')
            })
    })

    it('Rejects a message with a containing illegal characters', () => {
        payload.message = chance.word({length: (config.msgLengthMin + 1)})
        payload.message += chance.string({length: 1, pool: INVALID_CHAR_POOL})

        console.log(`Message:[${payload.message}]`)

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Message')
            })
    })
})


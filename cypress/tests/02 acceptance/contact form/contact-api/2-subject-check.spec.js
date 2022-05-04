import {INVALID_CHAR_POOL, makeFormData} from "../contactFormUtilities";

const config = require('../../../../../functions/email.config.json')

describe('the sever-side mail handler checks the subject', () => {
    let payload

    beforeEach(() => {
        // make up a well-built payload, but which will be recognised as a request to STUB
        payload = makeFormData()
    })

    it('Rejects a message missing the subject', () => {
        delete payload.subject

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Subject')
            })
    })

    it('Rejects a message with an empty subject field', () => {
        payload.subject = ''

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Subject')
            })
    })

    it('Rejects a message with a too-short subject', () => {
        payload.subject = chance.word({length: (config.subjectLengthMin - 1)})

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Subject')
            })
    })

    it('Rejects a message with a too-long subject', () => {
        payload.subject = chance.word({length: (config.subjectLengthMax + 1)})

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Subject')
            })
    })

    it('Rejects a subject with a containing illegal characters', () => {
        payload.subject = chance.word({length: (config.subjectLengthMin + 1)})
        payload.subject += chance.string({length: 1, pool: INVALID_CHAR_POOL})

        console.log(``)
        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Subject')
            })
    })
})


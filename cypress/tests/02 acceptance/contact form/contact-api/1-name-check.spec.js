import {INVALID_CHAR_POOL, makeFormData} from "../contactFormUtilities";

const config = require('../../../../../functions/email.config.json')

describe('the sever-side mail handler checks the name', () => {
    let payload

    beforeEach(() => {
        // make up a well-built payload, but which will be recognised as a request to STUB
        payload = makeFormData()
    })

    it('Rejects a message missing the name', () => {
        delete payload.name

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Name')
            })
    })

    it('Rejects a message with an empty name field', () => {
        payload.name = ''
        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Name')
            })
    })

    it('Rejects a message with a too-short name', () => {
        payload.name = chance.word({length: (config.nameLengthMin - 1)})
        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Name')
            })
    })

    it('Rejects a message with a too-long name', () => {
        payload.name = chance.word({length: (config.nameLengthMax + 1)})
        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Name')
            })
    })

    it('Rejects a message with a name containing illegal characters', () => {
        payload.name = chance.word({length: (config.nameLengthMin + 1)}) + chance.string({length: 1, pool: INVALID_CHAR_POOL})
        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Name')
            })
    })
})


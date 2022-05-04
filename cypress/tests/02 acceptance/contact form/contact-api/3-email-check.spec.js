import {makeFormData} from "../contactFormUtilities";

describe('the sever-side mail handler checks the email address fields', () => {
    let payload

    beforeEach(() => {
        payload = makeFormData()
    })

    it('Rejects a message missing the first address field', () => {
        delete payload.address1

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Emails')
            })
    })

    it('Rejects a message missing the second address field', () => {
        delete payload.address2

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Emails')
            })
    })

    it('Rejects a message missing the both address fields, despite them being identical', () => {
        delete payload.address1
        delete payload.address2

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Emails')
            })
    })

    //===============
    it('Rejects a message with an empty first email address field', () => {
        payload.address1 = ''

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Email')
            })
    })

    it('Rejects a message with an empty second email address field', () => {
        payload.address2 = ''

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Email')
            })
    })


    it('Rejects a message with both email address fields empty, despite them being identical', () => {
        payload.address1 = ''
        payload.address2 = ''

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Email')
            })
    })

    //=================
    it('Rejects a message with invalid, but identical email addresses', () => {
        payload.address1 = "dodgy@email"
        payload.address2 = payload.address1

        cy.request({
            headers: {"content-type": "application/json"},
            method: 'POST',
            url: Cypress.env('mailHandler'),
            body: payload,
            failOnStatusCode: false
        })
            .then(response => {
                expect(response.status).to.be.eq(400)
                expect(response.body).to.contain('Emails')
            })
    })
})


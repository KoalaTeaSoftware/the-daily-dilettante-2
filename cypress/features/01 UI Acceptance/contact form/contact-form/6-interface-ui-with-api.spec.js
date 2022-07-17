import {makeFormData} from "../contactFormUtilities"

const successContains = 'Thank you'
const failureContains = 'could not'

describe("The contact page - interface with the mail handler stub", () => {
    let payload
    let stubData

    beforeEach(() => {
        stubData = {
            statusCode: 500,
            body: "A dummy error message"
        }

        // don't care about the data much, but make a newish blob for each test, just for laughs
        // NB: this is setting up data that should mean that,
        // even if the stub does not interrupt, the mail handler will send you back 306 (is 'unused'), so you know it was you
        payload = makeFormData()
        payload.subject = 'Give me a 306'

        cy.visit("contact")

        cy.get('#name').type(payload.name)
        cy.get('#address1').type(payload.address1)
        cy.get('#address2').type(payload.address2)
        cy.get('#subject').type(payload.subject)
        cy.get('#message').type(payload.message)
    })

    it('correctly sets-up the payload for the mail handler', () => {
        cy.intercept(
            'POST',
            Cypress.env('mailHandler'),
            stubData
        ).as('sendMailCall')

        cy.get('#submitButton').click()

        // you have to wait for Cypress to detect that a call was made, so that it can intercept it
        cy.wait('@sendMailCall')
        cy.get('@sendMailCall')
            .its('request')
            .its('body')
            .then((body) => {
                // illustrates a couple of ways of doing this
                expect(body).property('name').eq(payload.name)
                expect(body.address1).to.eq(payload.address1)
                expect(body.address2).to.eq(payload.address2)
                expect(body.subject).to.eq(payload.subject)
                expect(body.message).to.eq(payload.message)
            })
    })

    it('provides on-screen feedback from a successful sending', () => {
        stubData.statusCode = 200

        cy.intercept(
            'POST',
            Cypress.env('mailHandler'),
            stubData
        ).as('sendMailCall')

        cy.get('#server-feedback').should('not.be.visible')

        cy.get('#submitButton').click()

        cy.wait('@sendMailCall')
        cy.get('#server-feedback')
            .should('be.visible')
            .should('contain', successContains)
            .should('not.contain', failureContains)
    })

    it('provides on-screen feedback from a sending failure', () => {
        cy.intercept(
            'POST',
            Cypress.env('mailHandler'),
            stubData
        ).as('sendMailCall')

        cy.get('#server-feedback').should('not.be.visible')

        cy.get('#submitButton').click()

        cy.wait('@sendMailCall')
        cy.get('#server-feedback')
            .should('be.visible')
            .should('not.contain', successContains)
            .should('contain', failureContains)
    })
})
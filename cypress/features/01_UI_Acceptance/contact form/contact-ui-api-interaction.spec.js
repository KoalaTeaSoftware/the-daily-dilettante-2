import {makeFormData} from "./contactFormUtilities";

const successContains = 'Thank you'
const failureContains = 'could not'

describe("The contact page - Integration with the real mail handler", () => {
    /*
     * The component features verify, in vitro, that each end of this channel behave as expected.
     * This checks that filling in the form, and hitting the Send button will generate the expected results
     * Eliminating the possibility that each end of the channel is reading their specs from different pages
     */
    let payload

    beforeEach(() => {
        // The data-maker generates a message that the mailHandler will recognise, and handle in a special way
        payload = makeFormData()

        cy.visit("contact")

        cy.get('#name').type(payload.name)
        cy.get('#address1').type(payload.address1)
        cy.get('#address2').type(payload.address2)
        cy.get('#subject').type(payload.subject)
        cy.get('#message').type(payload.message)

        cy.intercept(
            'POST',
            Cypress.env('mailHandler'),
        ).as('sendMailCall')
    })

    it('provides on-screen feedback from a successful sending to the API', () => {
        cy.get('#server-feedback').should('not.be.visible')

        // Send the special message to the API, and see what it gives back
        cy.get('#submitButton').click()

        cy.wait('@sendMailCall')
        cy.get('#server-feedback')
            .should('be.visible')
            .should('contain', successContains)
            .should('not.contain', failureContains)
    })

    it('provides on-screen feedback from a sending failure', () => {
        cy.get('#server-feedback').should('not.be.visible')

        // 500 is the most likely to occur in the wild.
        // 400s come from bad input, but the form should prevent that
        cy.get('#subject').clear().type("Give me a 500")
        cy.get('#submitButton').click()

        cy.wait('@sendMailCall')
        cy.get('#server-feedback')
            .should('be.visible')
            .should('not.contain', successContains)
            .should('contain', failureContains)
    })
})
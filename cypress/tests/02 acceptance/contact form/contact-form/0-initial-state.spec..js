require("../contactFormUtilities");

describe("The contact page - initial state", () => {
    beforeEach(() => {
        cy.visit("contact")
    })

    it('has the correct heading', () => {
        cy.get('h1').contains(/^Contact$/)
    })

    it('has empty fields', () => {
        cy.get('#name').should('be.empty')
        cy.get('#address1').should('be.empty')
        cy.get('#address2').should('be.empty')
        cy.get('#subject').should('be.empty')
        cy.get('#message').should('be.empty')
    })

    it('can not be submitted', () => {
        cy.get('#submitButton').should('be.disabled')
    })
})

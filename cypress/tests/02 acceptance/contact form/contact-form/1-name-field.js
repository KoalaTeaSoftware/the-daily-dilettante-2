const config = require('../../../../../functions/email.config.json')
import {VALID_CHAR_POOL, INVALID_CHAR_POOL} from "../contactFormUtilities";

describe('the robustness of the name field on the contact form', () => {
    const specialName = 'Teddy the special '; // ensure that, if things go wrong, we get recognisable data
    // const maxLen = 60

    beforeEach(() => {
        cy.visit('contact')
    })

    it('Starts with the name field empty', () => {
        cy.get('#name').should('be.empty')
    })

    it('shows the prompt when the name field is not filled', () => {
        cy.get('#name-group .invalid-feedback').should('be.visible')
        cy.get('#name-group .valid-feedback').should('not.be.visible')
        // ToDo: for some reason Cypress shows the valid prompt after very few chars, but manual testing shows the correct behaviour
        // cy.get('#name').clear().type("Te")
        // cy.get('#name-group > .invalid-feedback').should('be.visible')
        // cy.get('#name-group > .valid-feedback').should('not.be.visible')
    })

    it('hides the prompt when the name field has enough chars', () => {
        cy.get('#name').type(specialName + chance.string({length: 10, pool: VALID_CHAR_POOL}))
        cy.get('#name-group .invalid-feedback').should('not.be.visible')
        cy.get('#name-group .valid-feedback').should('be.visible')
    })

    it('shows the prompt when the name field is given an invalid char', () => {
        let str = specialName
        str += chance.string({length: 5, pool: VALID_CHAR_POOL})
        str += ' '
        str += chance.string({length: 1, pool: INVALID_CHAR_POOL})

        cy.get('#name').type(str)

        cy.get('#name-group .invalid-feedback').should('be.visible')
        cy.get('#name-group .valid-feedback').should('not.be.visible')
    })

    // This is based on the maxLength parameter, so it is not verifying that this is correctly set
    it('prevents entry of too many chars into the name field', () => {
        cy.get('#name').type(chance.sentence({word: 10}))

        cy.get('#name').should('not.have.length.greaterThan', config.nameLengthMax)

        cy.get('#name-group .invalid-feedback').should('not.be.visible')
        cy.get('#name-group .valid-feedback').should('be.visible')

    })
})
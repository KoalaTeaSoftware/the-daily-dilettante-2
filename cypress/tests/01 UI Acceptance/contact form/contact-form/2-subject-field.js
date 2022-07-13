const config = require('../../../../../functions/email.config.json')
import {VALID_CHAR_POOL, INVALID_CHAR_POOL} from "../contactFormUtilities";

describe('the robustness of the subject field on the contact form', () => {
    const niceString = 'My subject is '

    beforeEach(() => {
        cy.visit('contact')
    })

    it('Starts with the subject field empty', () => {
        cy.get('#subject').should('be.empty')
        cy.get('#subject-group .invalid-feedback').should('be.visible')
        cy.get('#subject-group .valid-feedback').should('not.be.visible')
    })

    it('hides the prompt when the subject field has enough chars', () => {
        cy.get('#subject').type(chance.string({length: 10, pool: VALID_CHAR_POOL}))
        cy.get('#subject-group .invalid-feedback').should('not.be.visible')
        cy.get('#subject-group .valid-feedback').should('be.visible')
    })

    it('shows the prompt when the subject field is given an invalid char', () => {
        let str = niceString
        str += chance.string({length: 1, pool: INVALID_CHAR_POOL})

        cy.get('#subject').type(str)
        cy.get('#subject-group .invalid-feedback').should('be.visible')
        cy.get('#subject-group .valid-feedback').should('not.be.visible')
    })

    it('prevents entry of too many chars into the subject field', () => {
        cy.get('#subject').type(chance.sentence({word: 10}))
        cy.get('#subject').should('not.have.length.greaterThan', config.subjectLengthMax)
    })
})
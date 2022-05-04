import {VALID_CHAR_POOL, INVALID_CHAR_POOL} from "../contactFormUtilities";

describe('the submit button is enabled when the form data looks valid', () => {
    beforeEach(() => {
        cy.visit('contact')
    })

    it('starts life disabled', () => {
        cy.get('#submitButton').should('be.disabled')
    })

    it('becomes enabled when the fom contains good data', () => {
        cy.get('#name').type('Ted tests the button ' + chance.string({length: 5, pool: VALID_CHAR_POOL}))
        cy.get('#submitButton').should('be.disabled')

        cy.get('#subject').type('I am subject to ' + chance.string({length: 5, pool: VALID_CHAR_POOL}))
        cy.get('#submitButton').should('be.disabled')

        const sampleAddress = chance.email()
        cy.get('#address1').type(sampleAddress)
        cy.get('#submitButton').should('be.disabled')

        cy.get('#address2').type(sampleAddress)
        cy.get('#submitButton').should('be.disabled')

        cy.get('#message').type(chance.sentence({words: 5}))
        cy.get('#submitButton').should('not.be.disabled')
    })

    it('becomes disabled when the form contains good data', () => {
        // this does it all in one invocation of the form. OK, flakier?, but much faster
        // set up valid data
        const sampleAddress = chance.email()
        cy.get('#name').type('Ted tests the button ' + chance.string({length: 5, pool: VALID_CHAR_POOL}))
        cy.get('#subject').type('I am subject to ' + chance.string({length: 5, pool: VALID_CHAR_POOL}))
        cy.get('#address1').type(sampleAddress)
        cy.get('#address2').type(sampleAddress)
        cy.get('#message').type(chance.sentence({words: 5}))
        cy.get('#submitButton').should('not.be.disabled')

        cy.get('#name').type('{end} ' + chance.string({length: 1, pool: INVALID_CHAR_POOL}))
        cy.get('#submitButton').should('be.disabled')
        cy.get('#name').type('{end}{backspace}')
        cy.get('#submitButton').should('not.be.disabled')

        cy.get('#subject').type('{end} ' + chance.string({length: 1, pool: INVALID_CHAR_POOL}))
        cy.get('#submitButton').should('be.disabled')
        cy.get('#subject').type('{end}{backspace}')
        cy.get('#submitButton').should('not.be.disabled')

        cy.get('#message').type('{end} ' + chance.string({length: 1, pool: INVALID_CHAR_POOL}))
        cy.get('#submitButton').should('be.disabled')
        cy.get('#message').type('{end}{backspace}')
        cy.get('#submitButton').should('not.be.disabled')

        // first add a known letter to the end of the email addresses, in cas that chance TLDs are very short
        // needs to be a lowercase letter, so just select from a few, just to ensure variation
        const xtra = chance.string({length: 1, pool: 'abcdefg'})

        cy.get('#address1').type('{end} ' + xtra)
        cy.get('#submitButton').should('be.disabled')
        cy.get('#address2').type('{end} ' + xtra)
        cy.get('#submitButton').should('not.be.disabled')

        // now see that, if they are made to be not equal, the form will become disabled
        cy.get('#address1').type('{end}{backspace}')
        cy.get('#submitButton').should('be.disabled')
        cy.get('#address2').type('{end}{backspace}')
        cy.get('#submitButton').should('not.be.disabled')
    })


})
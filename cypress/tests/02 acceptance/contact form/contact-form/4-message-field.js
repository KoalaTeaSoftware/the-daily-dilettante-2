import {INVALID_CHAR_POOL} from "../contactFormUtilities";
/*
This uses a (possibly less robust) method of detecting the visibility that releis on the class
ass the field may be visible, but off-screen
 */
describe('the robustness of the message field on the contact form', () => {
    const niceString = chance.sentence({words: 5})
    const maxLen = 600

    beforeEach(() => {
        cy.visit('contact')
    })

    it('Starts with the message field empty', () => {
        cy.get('#message').should('be.empty')
        cy.get('#message-group .invalid-feedback').invoke('css', 'display').should('eq', 'block')
        cy.get('#message-group .valid-feedback').invoke('css', 'display').should('eq', 'none')
    })

    it('hides the prompt when the message field has enough chars', () => {
        cy.get('#message').type(niceString)
        cy.get('#message-group .invalid-feedback').invoke('css', 'display').should('eq', 'none')
        cy.get('#message-group .valid-feedback').invoke('css', 'display').should('eq', 'block')
    })

    // ToDo: the textarea does not take a pattern, so decide if something neeeds to be done to make it
    // behave as the others do when an invalid char is entered
    // it('shows the prompt when the message field is given an invalid char', () => {
    //     let str = niceString
    //     str += ' '
    //     str += chance.string({length: 1, pool: INVALID_CHAR_POOL})
    //
    //     cy.get('#message').clear().type(str)
    //     cy.get('#message-group .invalid-feedback').should('be.visible')
    // })

    it('prevents entry of too many chars into the message field', () => {
        cy.get('#message')
            .invoke('attr', 'maxlength')
            .then(str => parseInt(str)).should('be.lt', maxLen)
    })
})
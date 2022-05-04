describe('The email fields on the contact form', () => {
    beforeEach(() => {
        cy.visit('contact')
    })

    it('Starts with the address fields empty', ()=>{
        cy.get('#address1').should('be.empty')
        cy.get('#address1').should('be.empty')
    })

    it('hides the error prompt when both emails contain a valid address', () => {
        const sampleAddress = 'a@b.com'; // why doesn't chance work here? chance.email();

        cy.get('#address1').type(sampleAddress)
        cy.get('#address2').type(sampleAddress)
        //#\#address-group-2 > div.invalid-feedback
        cy.get('#address-group-2 .invalid-feedback').should('not.be.visible')
        cy.get('#address-group-2 .valid-feedback').should('be.visible')
    })

    // ToDo: the comparison of the two emails at this point would be nice
    // it('shows the prompt when both emails contain a non-matching valid address', () => {
    //     cy.get('#address1').clear().type(sampleAddress)
    //     cy.get('#address2').clear().type(sampleAddress + '{backspace}')
    //     cy.get('#address-group-1 .invalid-feedback').should('be.visible')
    //     cy.get('#address-group-2 .invalid-feedback').should('be.visible')
    // })

    it('prevents entry of non emails into the first email field', () => {
        cy.get('#address1')
            .invoke('attr', 'type')
            .should('eq', 'email')
    })

    it('prevents entry of non emails into the  second email field', () => {
        cy.get('#address2')
            .invoke('attr', 'type')
            .should('eq', 'email')
    })
})
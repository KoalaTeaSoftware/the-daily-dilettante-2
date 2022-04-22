describe('the Wessex - Podcast page', () => {
    /*
    This page is built directly from JSON in the page. Possibly this could get busted
     */

    beforeEach(() => {
        cy.visit("/podcasts")
    })

    it('Greets the user', () => {
        cy.get("h1").should("contain.text", "Wessex")
        cy.get("h2").should("contain.text", "Podcast")
    })

    it('shows enough items', () => {
        cy.get('h3').should('have.length', 3)
        cy.get('.series img').should('have.length', 3)
        cy.get('.series audio').should('have.length.at.least', 1)
        cy.get('.series p').should('have.length.at.least', 3)
    })

    it('retrieves has accessible source files for all specified audio files', () =>{
        cy.get('.series audio')
            .invoke('attr','src')
            .then(($el)=>{
                cy.request('HEAD', $el)
            })
    })

    it('gets all the images', () => {
        cy.get('#wessex-podcasts img').invoke('outerWidth').should('be.gt', 100)
    })

})

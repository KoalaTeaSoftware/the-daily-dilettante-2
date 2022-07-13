describe('the Wessex - Podcast page', () => {

    beforeEach(() => {
        cy.visit("/podcasts")
    })

    it("Has the correct major parts", () => {
        cy.hasCorrectMainParts('The Daily Dilettante', 'Wessex Dramas', '#footer')
        // this page has a h1 in common with other page(s), so lets check the h2 too
        cy.get('h2').should('contain', 'Podcast',  {matchCase: false})
    })

    it('Displays content for all images', () => {
        cy.hasRetrievedAllImages()
    })

    /*
    This page is built directly from JSON in the page. Possibly this could get busted
    It comprises a number of cards, but each contains a header, an image and some audio tags (a varying number)
     */
    it('shows enough items', () => {
        cy.get('h3').should('have.length', 3)
        cy.get('.series img').should('have.length', 3)
        cy.get('.series p').should('have.length.at.least', 3)
        cy.get('.series audio').should('have.length.at.least', 1)
    })

    it('can access source files for all specified audio files', () =>{
        cy.get('.series audio')
            .invoke('attr','src')
            .then(($el)=>{
                cy.request('HEAD', $el)
            })
    })

})

describe("The Landing page", () => {
    beforeEach(() => {
        cy.visit("")
    })

    it('Displays content for all cloud-sourced areas', () => {
        cy.get('.editableDiv .loadingSpinner')
            .each(($el) => {
                cy.wrap($el).should('not.be.visible')
            })
        // loading is the dummy text that the editable div will display if it can't retrieve something good
        // there may be more than one paragraph
        cy.get('.editableDiv .displayedContent p')
            .should('have.length.at.least', 1)
            .eq(0)
                .should('be.visible')
                .should('not.contain', 'Loading')
    })

    // this will fail if it has no images
    it('Displays content for all images', () =>{
        cy.get('img')
            .each(($el) =>{
                cy.wrap($el).invoke('height').should('gte', 100)
            })
    })
})
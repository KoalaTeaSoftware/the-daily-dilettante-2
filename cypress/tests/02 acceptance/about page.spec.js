describe("The About page", () => {
    // the thing that chrome shows when an image can not be found is 48px across
    const MIN_IMG_WIDTH = 100;

    beforeEach(() => {
        cy.visit("about")
    })

    it('Displays content for all cloud-sourced areas', () => {
        cy.get('#about .editableDiv .loadingSpinner')
            .each(($el) => {
                cy.wrap($el).should('not.be.visible')
            })
        cy.get('#about .editableDiv .displayedContent p')
            // there may be more than one paragraph, but we don't really know how many
            .should('have.length.at.least', 1)

            // "loading" is the dummy text that the editable div will display if it can't retrieve something good
            .eq(0)
            .should('not.contain', 'Loading')
            .should('be.visible')
    })

    it('Displays content for images', () => {
        // The other block is expected to contain at least one image, otherwise this will fail giving a false-failure
        cy.get('#about img')
            .each(($el) => {
                cy.wrap($el).invoke('width').should('gte', MIN_IMG_WIDTH)
            })
    })
})
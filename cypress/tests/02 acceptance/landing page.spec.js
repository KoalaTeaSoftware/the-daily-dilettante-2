describe("The Landing page", () => {
    // OK, this is not the exact length, but it makes for a reasonable compromise between robust test, and good confidence
    const CAROUSEL_LENGTH = 4;

    beforeEach(() => {
        cy.visit("")
    })

    it('Displays content for all cloud-sourced areas', () => {
        cy.get('.editableDiv .loadingSpinner')
            .each(($el) => {
                cy.wrap($el).should('not.be.visible')
            })
        cy.get('.editableDiv .displayedContent p')
            // there may be more than one paragraph, but we don't really know how many
            .should('have.length.at.least', 1)

            // "loading" is the dummy text that the editable div will display if it can't retrieve something good
            .eq(0)
            .should('not.contain', 'Loading')
            .should('be.visible')
    })

    it('Gets enough items into the carousel from the data definition', () => {
        cy.get('.carousel-item > img').should('have.length.at.least', CAROUSEL_LENGTH)
    })

    it('Displays the carousel as overlapping images', () => {
        cy.get(".carousel-item > img").eq(0).should('be.visible')
        cy.get(".carousel-item").eq(1).should('not.be.visible')
        cy.get(".carousel-item").last().should('not.be.visible')
    })

    it('Can retrieve all of the carousel images', () => {
        // Carousel images appear to be lazy-loaded, so that the later ones do not offer any useful attributes for a while
        // so just see if the src attributes point to gettable resources
        cy.get(".carousel-item > img")
            .invoke('attr', 'src')
            .then(($el) => {
                cy.request('HEAD', $el)
            })
    })

    // Check the 'other' images separately from the carousel images (because they are special:)
    it('Displays content for images in the other block', () => {
        // The other block is expected to contain at least one image, otherwise this will fail giving a false-failure
        cy.get('#other img')
            .each(($el) => {
                cy.wrap($el).invoke('width').should('gte', 100)
            })
    })
})
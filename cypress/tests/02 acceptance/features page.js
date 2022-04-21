/*
This page is generated from data. It therefore has a low likelihood of breaking
One way of being confident that the data is being properly distributed on the page is to  see that the lists had a number of items
The look of the page will have to be subject to visual inspection
 */
describe("The Features page", () => {
    // the thing that chrome shows when an image can not be found is 48px across
    // on this page, the images are a bit narrow
    const MIN_IMG_WIDTH = 50;
    // OK they could be longer, but this shows that the mapping is probably working, and is a bit more robust, should the lists be shortened
    const MIN_LIST_LENGTH = 2;

    beforeEach(() => {
        cy.visit("features")
    })

    it('Displays content for images', () => {
        // The other block is expected to contain at least one image, otherwise this will fail giving a false-failure
        cy.get('#wessex-features img')
            .each(($el) => {
                cy.wrap($el).invoke('width').should('gte', MIN_IMG_WIDTH)
            })
    })

    it('Populates the lists', () => {
        cy.get('#wessex-features ol')
            .each(($el) => {
                cy.wrap($el).find('li').should('have.length.at.least', MIN_LIST_LENGTH)
            })

    })
})
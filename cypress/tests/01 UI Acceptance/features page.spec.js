describe("The Features page", () => {
    // OK they could be longer, but this shows that the mapping is probably working, and, should the lists be shortened, is a bit more robust
    const MIN_LIST_LENGTH = 2;

    beforeEach(() => {
        cy.visit("features")
    })

    it("Has the correct major parts", () => {
        cy.hasCorrectMainParts('The Daily Dilettante', 'Thomas Hardy\'s Wessex Dramas', '#footer')
    })

    it('Displays content for all images', () => {
        cy.hasRetrievedAllImages()
    })

    /*
    This page is generated from data.
    Therefore:
    1) It has no editable content
    2) One way of being confident that the data is being properly distributed on the page is to see that the lists
    actually display a number of items.
    The look of the page will have to be subject to visual inspection
     */
    it('Populates the lists', () => {
        cy.get('#wessex-features ol')
            .each(($el) => {
                cy.wrap($el).find('li').should('have.length.at.least', MIN_LIST_LENGTH)
            })

    })
})
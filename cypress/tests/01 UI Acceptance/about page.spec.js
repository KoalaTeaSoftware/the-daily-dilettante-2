describe("The About page", () => {

    beforeEach(() => {
        cy.visit("about")
    })

    it("Has the correct major parts", () => {
        cy.hasCorrectMainParts('The Daily Dilettante', 'About', '#footer')
    })

    it('Displays content for all cloud-sourced areas', () => {
        cy.hasRetrievedAllCloudSourcedBlocks()
    })

    it('Displays content for all images', () => {
        cy.hasRetrievedAllImages()
    })

    //ToDo:
    // The page has quite a few onward links, and it would be good to be certain that these are not 'broken'
})
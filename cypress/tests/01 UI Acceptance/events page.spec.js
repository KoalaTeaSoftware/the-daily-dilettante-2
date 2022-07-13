describe("The Events page", () => {
    beforeEach(() => {
        cy.visit("events")
    })

    it("Has the correct major parts", () => {
        cy.hasCorrectMainParts('The Daily Dilettante', 'Events', '#footer')
    })

    it('Displays content for all cloud-sourced areas', () => {
        cy.hasRetrievedAllCloudSourcedBlocks()
    })

    it('Displays content for all images', () => {
        cy.hasRetrievedAllImages()
    })

    // ToDo: Check the link to the buy-now is not broken
    // it('contains no broken links', () => {
    //     cy.get("#content  figcaption > code")
    //         .each('text')
    //         .then((textOfLink)=>{
    //             console.log(`Text of link [${textOfLink}]\n`)
    //         })
    //         // .should(($urlBlock) =>{
    //         //     const link = $urlBlock.text()
    //         //     console.log(`checking [${link}]`)
    //         //     cy.request('HEAD', link)
    //         // })
    //         // .invoke('text')
    //         // .then(($el) => {
    //         // })
    // })

    // it('allows the user to capture code into the clipboard', () => {
    //     cy.window().then((win) => {
    //         cy.get('#events').click()
    //         win.navigator.clipboard.writeText(" ")
    //             .then(() => {
    //                 win.navigator.clipboard.readText().then((text) => {
    //                     expect(text).to.have.length.lt(10);
    //                 });
    //             })
    //             .catch(err => {
    //                 console.log(`Erro clearing the clipboard [${err.toString()}]`)
    //             })
    //     });
    // })

})
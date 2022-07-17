describe('Welcome Page', ()=>{
    beforeEach(()=>{
        cy.visit('')
    })
    // the landing page, is the welocme page, so leave all the real testing to that spec, just make sure we get there
    it("Has the correct major parts", () => {
        cy.hasCorrectMainParts('The Daily Dilettante', 'Welcome', '#footer')
    })

})
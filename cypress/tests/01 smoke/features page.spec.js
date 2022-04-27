describe('Features Page (Smoke Tests)', () => {
    it("Has the correct major parts", () => {
        cy.visit("features")
        cy.title().should('contain', 'The Daily Dilettante')
        cy.get('h1').should('contain', 'Wessex Dramas')
        cy.get('h2').should('contain', 'Features')
        cy.get('#footer').should('exist')
    })
})
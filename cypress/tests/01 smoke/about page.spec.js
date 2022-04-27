describe('The About page (Smoke Tests', () => {
    it("Has the correct major parts", () => {
        cy.visit('about')
        cy.title().should('contain', 'The Daily Dilettante')
        cy.get('h1').should('contain', 'About')
        cy.get('#footer').should('exist')
    })
})
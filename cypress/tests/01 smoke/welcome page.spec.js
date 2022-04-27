describe('Welcome Page (Smoke Tests)', ()=>{
    it('Has the correct title tag', () =>{
        cy.visit("")
        cy.title().should('contain', 'The Daily Dilettante')
        cy.get('h1').should('contain', 'Welcome')
        cy.get('#footer').should('exist')
    })
})
/*
Currently, the welcome page offers very little
 */
describe('Podcasts Page (Smoke Tests)', ()=>{
    it('Has the correct major parts', () =>{
        cy.visit("podcasts")
        cy.title().should('contain', 'The Daily Dilettante')
        cy.get('h1').should('contain', 'Wessex Dramas')
        cy.get('h2').should('contain', 'odcast')
        cy.get('#footer').should('exist')
    })
})
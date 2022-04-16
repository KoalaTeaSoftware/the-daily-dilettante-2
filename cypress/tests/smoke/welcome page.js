/*
Currently, the welcome page offers very little
 */
describe('Welcome Page (Smoke Tests)', ()=>{
    beforeEach(()=>{
        cy.visit("")
    })
    it('Has the correct title tag', () =>{
        cy.title().should('contain', 'The Daily Dilettante')
    })
    it('Has the correct level 1 heading', ()=>{
        cy.get('h1').should('have.text', 'Welcome')
    })
})
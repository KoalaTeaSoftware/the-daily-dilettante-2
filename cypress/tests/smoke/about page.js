/*
The bout page is currently just there to show that it is there
 */
describe('The About page (Smoke Tests', () => {
    beforeEach(() => {
        cy.visit('about')
    })
    it('Has the correct level 1 heading', ()=>{
        cy.get('h1').should('have.text', 'About')
    })
})
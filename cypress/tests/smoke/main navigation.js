/*
There is a slight risk that the router has not been set up correctly, and that one does not go to the correct page
 */
describe('The main navigation bar', ()=>{
    beforeEach(()=>{
        cy.visit('')
    })
    it('Can take you to the home page from the landing page', () =>{
        cy.get('#main-nav').get('a').contains('Home').click()
        cy.get('h1').should('have.text', 'Welcome')
    })
    it('Can take you to the about page from the landing page', () =>{
        cy.get('#main-nav').get('a').contains('About').click()
        cy.get('h1').should('have.text', 'About')
    })

})
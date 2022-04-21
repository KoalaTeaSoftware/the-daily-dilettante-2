/*
There is a slight risk that the router has not been set up correctly, and that one does not go to the correct page
 */
describe('The main navigation bar', ()=>{
    beforeEach(()=>{
        cy.visit('')
    })
    it('Can take you to the home page from the landing page', () =>{
        cy.get('.navbar ').get('a').contains('Home').click()
        cy.get('h1').should('contain', 'Welcome')
    })
    it('Can take you to the about page from the landing page', () =>{
        cy.get('.navbar ').get('a').contains('About').click()
        cy.get('h1').should('contain', 'About')
    })

})
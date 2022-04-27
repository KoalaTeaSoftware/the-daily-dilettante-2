/*
The landing page is the same as the welcome page so do no more than see that we are on the welcome page
 */
describe("The Landing Page (Smoke Tests)", ()=> {
    it("    it(Has the correct major parts", ()=>{
        cy.visit("")
        cy.title().should("contain", "The Daily Dilettante")
        cy.get("h1").should("contain", "Welcome")
        cy.get('#footer').should('exist')
    })
})
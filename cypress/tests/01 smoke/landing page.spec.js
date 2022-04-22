/*
The landing page is the same as the welcome page so do no more than see that we are on th welcome page
 */
describe("The Landing Page (Smoke Tests)", ()=>{
    beforeEach(()=>{
        cy.visit("")
    })
    it("Has the correct title tag", ()=>{
        cy.title().should("contain", "The Daily Dilettante")
    })
    // The first section in the landing page is built suing the editable div component, quickly see if it works
    it("Has the correct level 1 heading", ()=>{
        cy.get("h1").should("contain", "Welcome")
    })

})
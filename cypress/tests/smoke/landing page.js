describe("Landing Page Smoke Tests", ()=>{
    beforeEach(()=>{
        cy.visit("")
    })
    it("Has the correct title tag", ()=>{
        cy.title().should("contain", "The Daily Dilettante")
    })
    // The first section in the landing page is built suing the editable div component, quickly see if it works
    it("Has the correct level 1 heading", ()=>{
        cy.get("h1").should("have.text", "Welcome")
    })

})
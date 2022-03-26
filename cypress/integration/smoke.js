describe("Smoke Tests", ()=>{
    it("Has the correct title tag", ()=>{
        cy.visit("")
        cy.title().should("contain", "thedaily-dilettante-2")
    })
})
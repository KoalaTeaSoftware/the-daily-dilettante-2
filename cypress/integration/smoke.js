describe("Smoke Tests", ()=>{
    it("Has the correct title tag", ()=>{
        cy.visit("http://localhost:8080")
        cy.title().should("contain", "the-daily-dilettante-2")
    })
})
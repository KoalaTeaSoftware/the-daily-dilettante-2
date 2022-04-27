describe('it responds correctly to legacy nav paths', ()=>{
    it('yields the wessex features',()=>{
        cy.visit('/storyworlds/wessex/features')
        cy.get('h1')
    })
})
/**
 * The router has to support some legacy routes, because the content has been slightly rearranged / titled
 * but there may be users who knew about this content under those old names, and we want not to give the idea
 * That the site is damaged
 */
describe('it responds correctly to legacy nav paths', ()=>{
    it('yields the wessex features',()=>{
        cy.visit('/storyworlds/wessex/features')
        cy.get('h1')
    })
})
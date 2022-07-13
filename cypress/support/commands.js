// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const {MIN_IMG_WIDTH} = require("./index");
/**
 * title:       exact (case sensitive) text to find in the head > title tag
 * mainHeading  exact (case sensitive) text to find in the h1 tag
 * finalElement selector to find the final element in the page - the assumption being that, if this is not present
 *              then the page generation crashed at some point
 */
Cypress.Commands.add('hasCorrectMainParts', (title, mainHeading, finalElement) => {
    cy.title().should('contain', title)
    cy.get('h1').should('contain', mainHeading)
    cy.get(finalElement).should('exist')
})

/**
 * As opposed to any component testing of the editable div component itself, this can be used wherever
 * There are editable divs (note the plural) to check that they have been correctly linked to the cloud source
 */
Cypress.Commands.add('hasRetrievedAllCloudSourcedBlocks', () => {
    cy.get('#content .editableDiv .loadingSpinner')
        .each(($el) => {
            cy.wrap($el).should('not.be.visible')
        })

    // The edited div is structured thus:
    cy.get('#content .editableDiv .displayedContent p')
        // there may be more than one paragraph, but we don't really know how many
        .eq(0)
        // "loading" is the dummy text that the editable div will display if it can't retrieve something good
        .should('not.contain', 'Loading')
        // the editable div makes the text block visible as its last trick when it thinks it has retrieved the text
        .should('be.visible')

        // BEWARE! it is possible that this may give false negatives
        // it is perfectly legal that the contents should be an empty string. Leaving it in until it proves to be annoying
        .should('not.be.empty')
})

/**
 * Check that all img tags in the content part of the page have some content in them
 *
 * Generally speaking if a browser fails to retrieve an image it will show an icon that is a bit less that 50px wider
 * Therefore, we generally assume that if an image is showing with a width of at least this, then it has been retrieved
 * so this could give you false negatives if you have some tiny icons on the page
 */
Cypress.Commands.add('hasRetrievedAllImages', () => {
    cy.get('#content img')
        .each(($el) => {
            cy.wrap($el).invoke('width').should('gte', 95)
        })
})

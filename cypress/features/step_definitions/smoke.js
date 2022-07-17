import {Then, When} from "cypress-cucumber-preprocessor/steps";

const title = 'The Daily Dilettante'
const finalElementLocator = '#footer'
const minImgWidth = 95

When('I go to page {string}', (path) => {
    cy.visit(path)
})

Then('the page is well drawn with heading {string} and subheading {string} and {string} and {string}',
    (mainHeading, subtitle, checkImages, cloudContents) => {
        cy.get(finalElementLocator).should('exist')
        cy.title().should('contain', title)
        cy.get('h1').should('contain', mainHeading)

        if (subtitle) {
            cy.get('h2').should('contain', subtitle, {matchCase: false})
        }

        if (checkImages) {
            cy.get('#content img')
                .each(($el) => {
                    cy.wrap($el).invoke('width').should('gte', minImgWidth)
                })
        }

        if (cloudContents) {
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
        }

    });

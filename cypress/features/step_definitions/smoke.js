/*
Step Definitions for the features relevant to smoke testing.
These can be rather plump (i.e. making quite a few assertions each time around the scenario loop) because these tests
are intended to be swiftly yield an evaluation of the basic state of the current page. If each scenario was to test
only one thing (as it should), and started with a new visit to the page, then it could be expected that the smoke suite
would not be something that can be run at will and frequently.
The acceptance test suite will take a more conventional approach.
 */
import {Then, When} from "cypress-cucumber-preprocessor/steps";

const title = 'The Daily Dilettante'
const finalElementLocator = '#footer'
// This is going to be much faster than getting the HEAD of the src, for example
// the following size is an estimate. The 'broken image' links appear to be smaller that this, so anything larger is
// likely to be OK. However, you can't set the figure too high, otherwise you risk false -vs
const minImgWidth = 95

When('I go to page {string}', (path) => {
    cy.visit(path)
})

/*
 * mainHeading - the text that you expect to see - case sensitive
 * subtitle - similar - optionally could be empty string, in which case it is not checked
 * checkImages -  flag: anything => check them, empty-string => do nowt
 * cloudContents - similar, see if the content has been retrieved (from Firebase) and shown
 */
Then('the page is well drawn with heading {string} and subheading {string} and {string} and {string}',
    (mainHeading, subtitle, checkImages, cloudContents) => {
        // if this element is not there, then the page-making code crashed at some point before completion
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

/*
Goes from the current page, clicks the specified link. This should take you to a pge with the H1 indicated
Then clicks the main nav link with the text that is on the subsequent row, check the new H1, and so on
 */
When('I click the main navigation links I get the appropriate page', (dataTable) => {
    // The table is going to be quoted having titles like this
    //     | linkText | expectedTitle |
    // note that teh title row is ignored
    for (const thisRow of dataTable.rows()) {
        cy.get('.navbar ').get('a').contains(thisRow[0]).click()
        cy.get('h1').should('contain', thisRow[1], {matchCase: false})
    }
})
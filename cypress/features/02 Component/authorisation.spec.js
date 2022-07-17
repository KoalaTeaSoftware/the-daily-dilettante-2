/*
The form is created by Firebase UI, so it can be assumed that a lot of its checks and stuff work well
The dummy credentials given here will have to be set up in the Firebase authorisation database
 */
require('chance'); // need this explicitly here because we are not using the utilities

describe('Users can log in', () => {
    const getLoginButton = () => {
        return cy.get('@navBar').contains('Login')
    }
    const getLogoutButton = () => {
        return cy.get('@navBar').contains('Logout')
    }

    const USERNAME_FIELD_LOCATOR = '#ui-sign-in-email-input'
    const PASSWORD_FIELD_LOCATOR = '#ui-sign-in-password-input'
    const DO_LOGIN_BUTTON_LOCATOR = '#loginButton'

    const GOOD_DUMMY_USERNAME = 'a@b.com'
    // noinspection SpellCheckingInspection
    const GOOD_DUMMY_PASSWORD = 'qwertyuiop'
    const BAD_DUMMY_USERNAME = chance.email();

    // the insertion of the should invokes the default wait-for-it-to-be-found
    // it is required because vue.js actually trashes domain elements, rather than merely hiding them
    const startLoginProcess = () => {
        getLoginButton().should('be.visible').click()
    }

    // we do not really care which page this operates on
    beforeEach(() => {
        cy.visit('/')
        cy.get('#secondary-nav').as('navBar')
        // you can't go a lot deeper with the elements as they come and go, and it will crash when they are not there
    })

    it('Shows the anonymous user as logged-out', () => {
        getLoginButton().should('be.visible')
        getLogoutButton().should('not.exist')
    })

    // We want the user to have to do something to initiate the login activity
    it('Does not initially provide the login form', () => {
        cy.get('@navBar').get(USERNAME_FIELD_LOCATOR).should('not.exist')
        cy.get('@navBar').get(PASSWORD_FIELD_LOCATOR).should('not.exist')
        cy.get('.firebaseui-form-actions').should('not.exist')
    })

    it('Provides a login form when the user asks for it', () => {
        startLoginProcess()
        cy.get(USERNAME_FIELD_LOCATOR).should('be.visible')
        cy.get('.firebaseui-form-actions').contains('Next').should('be.visible') // although it is transformed to upper-case, it s actually mixed case
    })

    // the form can be assumed to work correctly, but we want to see that we have configured it correctly
    // and we want to see that a successful login results in some sort of visible change in the UI
    it('Allows the user with the good dummy credentials to log in', () => {
        startLoginProcess()

        cy.get(USERNAME_FIELD_LOCATOR).type(GOOD_DUMMY_USERNAME)

        cy.get('.firebaseui-form-actions').contains('Next').click()

        cy.get(PASSWORD_FIELD_LOCATOR).type(GOOD_DUMMY_PASSWORD)

        cy.get('.firebaseui-form-actions').contains('Sign In').click()

        // the form goes away
        cy.get(USERNAME_FIELD_LOCATOR).should('not.exist')
        cy.get(PASSWORD_FIELD_LOCATOR).should('not.exist')
        cy.get(DO_LOGIN_BUTTON_LOCATOR).should('not.exist')

        // the buttons change
        getLoginButton().should('not.exist')
        getLogoutButton().should('be.visible')
    })

    // and that a logout is equally visible in the UI
    it('Allows the logged-in user to log out', () => {
        // repeat the login here because it is easy, and we are testing the UI
        startLoginProcess()
        cy.get(USERNAME_FIELD_LOCATOR).type(GOOD_DUMMY_USERNAME)
        cy.get('.firebaseui-form-actions').contains('Next').click()
        cy.get(PASSWORD_FIELD_LOCATOR).type(GOOD_DUMMY_PASSWORD)
        cy.get('.firebaseui-form-actions').contains('Sign In').click()

        // as this is using Vue.js, elements are entirely redrawn (rather than simply showing, or hiding them)
        // This makes it wait (using the should) until it has finished the redraw
        // have found that this applies to the navbar itself, as well as the buttons
        cy.get('@navBar').should('be.visible').contains('Logout').should('be.visible').click()

        // the buttons change, so the user can log in again
        getLoginButton().should('be.visible')
        getLogoutButton().should('not.exist')
    })

    // double-check that it is rejecting silly usernames
    // this test does (sor' ov) provide a litmus test for hacking of the auth database (but that is not the real purpose of the test)
    it('does not allow a user with bad credentials to log in', () => {
        // repeat the login here because it is easy, and we are testing the UI
        startLoginProcess()
        cy.get(USERNAME_FIELD_LOCATOR).type(BAD_DUMMY_USERNAME)
        cy.get('.firebaseui-form-actions').contains('Next').click()

        cy.get('#login-component').contains('is not authorized').should('be.visible')
        cy.get('.firebaseui-form-actions').contains('Sign In').should('not.exist')
    })
})
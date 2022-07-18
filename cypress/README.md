# Test Plan

## Assumptions & Risks

* Chrome is used by most visitors, so Chrome will be the primary test-bench
* iOS is the secondarily mostly used visitor's vehicle
* Security is not a tremendous risk
    * Little personal data is held by the site, any such data (e.g. payment data) is captured and controlled by 3rd
      party integrations (e.g. Ticket Tailor)

## In Scope

* Functional Test
    * All pages contain the main components
    * Interactive components (e.g. the contact page)
        * Provide the user with good feedback (negative and positive) about what is going on
        * Exercise constraints (were relevant) in users

## Out of Scope

* Formal performance test
* Formal Accessibility test
* Penetration test (beyond that implied by the functional testing mentioned above)
* Manual test
    * This will occur frequently, but it will not be a planned activity
    * Most of this informal testing will focus on 'look and feel'

> Chrome's Lighthouse will be used (on an _ad hoc_ basis) and it's recommendations taken into account.

## Testing Process

* The cmd `npm run cy:smoke` (assuming that you are serving the app - npm run serve) can be used frequently and, within
  about 1 minute) give some confidence that there have been no functional devastation

### Integration with Cypress Dashboard

* Dashboard is at
    * https://dashboard.cypress.io/projects/vwhed1/runs?branches=%5B%5D&committers=%5B%5D&flaky=%5B%5D&page=1&status=%5B%5D&tags=%5B%5D&timeRange=%7B%22startDate%22%3A%221970-01-01%22%2C%22endDate%22%3A%222038-01-19%22%7D

### Testing on Stage

* firebase use stage???
* this will _probably_ cause ``firebase deploy`` to put it on Staging
* ToDo: make this documentation more definitive
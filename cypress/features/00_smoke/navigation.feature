Feature: Navigation
  As any visitor
  So that I don't entirely loose confidence in the daily dilettante
  I want site navigation to work

  # ToDo: as there is no differentiation between the last 2 here, maybe add a col for an h2?
  Scenario: Click around site using the main navigation
    Given I go to page ""
    When I click the main navigation links I get the appropriate page
      | linkText      | expectedTitle    |
      | About         | About the Editor |
      | Home          | Welcome          |
      | Podcasts      | Wessex Dramas    |
      | Feature Films | Wessex Dramas    |

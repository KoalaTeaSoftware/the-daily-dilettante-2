Feature: The site pages
  As any visitor
  So that I don't entirely loose confidence in the daily dilettante
  I want all pages to be well formed

  # in some of these pages, checking images is not straight forward (e.g. carousel, with lazy-loaded images)
  # Some pages do not actually retrieve cloud contents. Rather than mke the text decide, build it in there
  Scenario Outline: Visiting pages
    When I go to page "<path>"
    Then the page is well drawn with heading "<title>" and subheading "<subtitle>" and "<checkImages>" and "<cloudContent>"
    Examples:
      | path     | title                         | subtitle | checkImages | cloudContent |
      |          | Welcome                       |          |             | y            |
      | welcome  | Welcome                       |          |             | y            |
      | about    | About                         |          | y           | y            |
      | features | Thomas Hardy\'s Wessex Dramas |          | Y           |              |
      | podcasts | Wessex Dramas                 | Podcast  | Y           |              |
      | contact  | Contact                       |          |             |              |
      | events   | Events                        |          | y           | y            |

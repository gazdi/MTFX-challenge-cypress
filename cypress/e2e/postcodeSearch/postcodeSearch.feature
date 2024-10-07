@API
Feature: postcode search on Zippopotam API

Background: set up Zippopotam postcode search endpoint url (without parameters)
  Given I am searching for a postcode

Scenario Outline: 1 - Validate response schema (<countryCode>, <postcode>)
  When I make a valid request with '<countryCode>' and '<postcode>'
  Then the response matches the pre-generated schema
Examples:
  | countryCode | postcode |
  | GB          | EC2V     |
  | US          | 12345    |
  | FR          | 01000    |

Scenario Outline: 2 - Verify postcode in response (<countryCode>, <postcode>)
  When I make a valid request with '<countryCode>' and '<postcode>'
  Then the response matches the pre-generated schema
  And The post code returned in the response matches the postcode I pass as a request parameter
Examples:
  | countryCode | postcode |
  | GB          | EC2V     |
  | US          | 12345    |
  | FR          | 01000    |

Scenario Outline: 3 - Verify error in response to invalid request (<countryCode>, <postcode>)
  When I make an invalid request with '<invalidCountryCode>' and '<postcode>'
  Then no data is returned and I receive a 404 error
Examples:
  | countryCode | postcode |
# Scenario3 of the task: invalid countryCodes
  | BG          | EC2V     |
  | __          | 123      |
  | France      | 12345    |
# other negative examples that don't belong to Scenario3 of the task but use the same steps
# valid countryCodes with invalid postcodes
  | GB          | AA1      |
  | GB          | AB0      |
  | US          | 00209    |
  | US          | 99951    |
  | US          | 12X45    |
  | FR          | 00999    |
  | FR          | 98800    |
  | FR          | 12X45    |
# valid countryCodes and postcodes without entries on Zippo
  | GB          | AZ9      |
  | US          | 88888    |
  | FR          | 54321    |

Scenario Outline: 4 - Validate response contents (<countryCode>, <postcode>)
  When I make a valid request with '<countryCode>' and '<postcode>'
  Then the response matches the pre-generated schema
  And <expectedCount> places are returned
  And They are all in the state of '<expectedState>'
  And Each one has a place name, longitude, state, state abbreviation and latitude
Examples:
  | countryCode | postcode | expectedCount | expectedState               |
  | GB          | GU22     | 4             | England                     |
  | US          | 90210    | 1             | California                  |
  | FR          | 11000    | 2             | Languedoc-Roussillon        |

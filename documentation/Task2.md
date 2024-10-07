# Task 2 - API automation

## The Task

> We would like you to create a set of API tests against the Zippopotam API. This is an API designed to retrieve Location Information from a postal code or zip code. When completing this task we urge you to consider the following questions:
>
> - How would you take the scenarios listed below and improve them?
> - What additional questions would you like to ask the product owner in regards to testing?
> - What additional scenarios would you like to test to check the API is working?  
>   All requests should be made to the following REST endpoint:
>
> `GET http://api.zippopotam.us/{CountryCode}/{postalCode}`
>
> Below are Country Code options and postal Code ranges that you can use in your tests.
>
> | Country       | Code | Range       |
> | ------------- | ---- | ----------- |
> | Great Britain | GB   | AB1:ZE3     |
> | United States | US   | 00210:99950 |
> | France        | FR   | 01000:98799 |
>
> Below is the list of acceptance criteria we expect you to complete for this endpoint:
>
> ### Scenario 1:
>
> GIVEN I am searching for a postcode  
> WHEN I make a valid request  
> THEN the request contains the following fields and types
>
> <table><tbody><tr><td>post code</td><td>string</td></tr><tr><td>country</td><td>string</td></tr><tr><td>country abbreviation</td><td>string</td></tr><tr><td>places</td><td>array</td></tr></tbody></table>
>
> ### Scenario 2:
>
> GIVEN I am searching for a postcode  
> WHEN I make a valid request  
> THEN The post code returned in the response matches the postcode I pass as a request parameter
>
> ### Scenario 3:
>
> GIVEN I am searching for a postcode  
> WHEN I use the wrong country code  
> THEN no data is returned and I receive a 404 error
>
> ### Scenario 4:
>
> GIVEN I searching for a postcode  
> WHEN I search for ‘GU22’ for Great Britain  
> THEN 4 places are returned  
> AND They are all in the state of England  
> AND Each one has a place name, longitude, state, state abbreviation and latitude

## Questions/notes to PO

- Please provide a background as part of the story, mention the API endpoint, like the task context does
- Why these countries? Why these postcode ranges? Do we have a priority for countries (e.g. much more customers in France so focus test efforts/data there)?
- Do you need availability and performance insights about this endpoint?

## Scenario improvements

### Generic

- Add negative scenarios which use invalid data and pass on error message
- Provide positive and negative test data in feature files (as opposed to step definitions)
- Move 'GIVEN I am searching for a postcode' step to Background.
- Merge a few similar steps using generalised step definitions

### Scenario 1

- Question to PO: the word 'request' in the THEN step must be a mistake, it is meant to be 'response', right?
- Let's do a full schema validation instead of checking the response 'manually' node by node

### Scenario 4

- Fix GIVEN step, the word 'am' is missing. Obsolete after this step is moved to Background

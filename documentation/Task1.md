# Task 1 - UI automation

## The Task

> ### Context
>
> This project is intended to test the practice form page of the [demoqa](https://demoqa.com/) website. The acceptance criteria for this feature has been provided to you in the fillForm feature file. Your task is to complete the acceptance criteria and produce a working suite of tests.
>
> ### Challenge
>
> 1.  Clone and setup this repo locally
> 2.  Convert the feature file requirements into usable scenarios
> 3.  Complete the required scenarios using the page objects and user details provided
> 4.  Point out what is good and what is wrong/bad practices about the existing code and fix any mistakes you find
> 5.  Show off your skills! \[Examples: environment configuration files, Reporting tool integration, Negative test scenarios, book store application, be creative!\]
> 6.  How else would you look to improve the automation testing on this project?

## Fixes and Improvements

This section lists enhancements added to the solution together together with brief reasons.  
I tried to keep the changes to a minimum, especially against the structure of the framework. I did so because of the context of the task; I am to fix a scenario and not reshape the test automation approach, build upon some foundations and not rebuild the framework. That said, I will list a number of ideas in the [Further improvement options](#further-improvement-options) section, and possibly in a PR, if time permits.

### Feature file

The provided acceptance criteria was a mix of a story, a test framework improvement task, and test data. Beyond this, the story had a few flaws that could be easy to clarify during a refinement session or a quick chat:

- It was unclear what form the story was about. Looking through demoqa.com I found a good candidate and went with that.
- If the product under test is a form like the target of this task, automation tester is not a consumer, an actor who wants to fill in the form. An administrative user is. An automation tester is an actor when the story is about the framework itself, like in the second part of the story.
- I would take steps to clarity with the team the difference between a story and its ACs. BDD can be a good tool when used properly across the organisation, otherwise the need to add this extra layer to the test scripts just for the sake of calling it BDD is usually just a hinderance for the qa team.

While trying to keep in line with the outline of the story, I decided to split the implementation into three parts as [practiceForm.feature](/cypress/e2e/practiceForm/) shows:

- A naive approach  
  Just what the first part of the story asks for, hardcoded data is entered the form and the confirmation message is verified after submitting the form.
- My chosen implementation  
  This is what I feel closest to a classic BDD implementation; a scenario outline with test data embedded in the feature file.
- An over-engineered solution  
  Heavily contraindicated. A wide range of BDD and cypress anti-patterns, but it does what the second part of the original requirements said. The test data is picked up as a cypress fixture and the steps of the naive scenario are run on the data.  
  This approach could be slightly better but I found neither of the following ideas good enough to follow
  - if the number of test data items were fixed, a scenario outline with indexes in the examples would do the trick, or
  - if the Act and Assert steps of the scenario could be merged into one, filling in the for and verifying the response could be done without having to store those results and make assertions against JS variables rather than webelements

### Page model

- Move formPage model from under support to cypress/e2e/pages, turn it into a class, rename  
  Cleaner structure, more descriptive names, easier use, better maintainability.
- Define page actions rather than webelement getters  
  Cleaned test code, more page-test separation, more abstraction.

### Test data

Some minor changes were added to the [userDetails](/cypress/fixtures/userDetails.json) fixture:

- Change 'gender' values to Camel case for convenience
- Add Date of Birth  
  DoB is a mandatory field on the form and is pre-populated with today's date. This may lead to unintentional data and confusion, should the registered users be used further in a more life-like application.

### Configuration

- Remove '.features' file extension from [cypress.config.js](/cypress.config.js)  
  One file, one feature.
- Add baseUrl to [cypress.config.js](/cypress.config.js)  
  Convenience.
- Update cucumber stepDefinitions 'typo' in [package.json](/package.json)  
  What would 'e3e' mean, anyway?
- Update all packages to latest  
  @badeball/cypress-cucumber-preprocessor ^18.0.6 → ^21.0.2  
  @bahmutov/cypress-esbuild-preprocessor ^2.2.0 → ^2.2.3  
  cypress ^13.3.2 → ^13.15.0

### CI integration

- Add GitHub workflow in [.github/](/.github)
  Run tests on push to master, run a choice of test groups manually.

### Reporting

- Add html reporting to cucumber in [package.json](/package.json)  
  For human consumers. Uploaded to github after workflow runs.

### Additional libraries

- Add @testing-library/cypress  
  DOM queries, role based finding strategies
- Add chai
  Non web-first assertions
- Add ajv
  JSON schema validation

### Workin around demoqa.com issues

- Intercept uncaught exceptions from 3rd party ad providers and stat gatherers  
  Cypress fails tests if runs into unhandled exceptions and there's a few of those on demoqa.com.  
  To improve testability, I decided to ignore these exceptions in [e2e.js](/cypress/support/e2e.js).

## Further improvement options

- Migrate to Typescript
  Type safety, richer IntelliSense info, improved linting, cozy test development.
- Add Cypress actions
  It is Cypress after all, isn't it.
- Use more Cypress asserts rather than chai
  Utilise the actions to utilise asynchronicity.
- Nicer looking html report
- Parallel test execution
- ...

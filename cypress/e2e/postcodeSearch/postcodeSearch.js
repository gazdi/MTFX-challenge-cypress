/// <reference types="cypress" />

import {
  Given,
  When,
  Then,
  Before,
} from '@badeball/cypress-cucumber-preprocessor';
import { expect } from 'chai';
import { callPostcodeSearch, validateSchema } from '../helpers/apiHelper';

const VALID_COUNTRYCODES = ['GB', 'US', 'FR'];
let requestData;
let response;
let zippoResponseSchema;

Before(() => {
  Cypress.config('baseUrl', null);
  // cy.visit('/');
});

Given('I am searching for a postcode', () => {
  cy.fixture('zippoResponseSchema').then(
    (schema) => (zippoResponseSchema = schema)
  );
});

When(
  'I make a valid request with {string} and {string}',
  (countryCode, postcode) => {
    expect(
      VALID_COUNTRYCODES.includes(countryCode),
      `countryCode should be one of ${VALID_COUNTRYCODES}`
    ).to.be.true;
    switch (countryCode) {
      case 'GB':
        expect(
          postcode >= 'AB1' && postcode <= 'ZE3',
          'GB postcodes should be between AB1 and ZE3'
        ).to.be.true;
        break;
      case 'US':
        expect(
          Number(postcode),
          'US postcodes should be between 00210 and 99950'
        )
          .to.be.gte(210)
          .and.lte(99950);
        break;
      case 'FR':
        expect(
          Number(postcode),
          'FR postcodes should be between 01000 and 98799'
        )
          .to.be.gte(1000)
          .and.lte(98799);
        break;

      default:
        // shouldn't get here so bail out if we did
        expect(0).to.be.eq(1);
        break;
    }
    requestData = { countryCode: countryCode, postcode: postcode };
    response = callPostcodeSearch(countryCode, postcode);
    cy.get('@apiResponse').then((resp) => (response = resp));
  }
);

When(
  'I make an invalid request with {string} and {string}',
  (countryCode, postcode) => {
    //TODO: extend callPostcodeSearch with options and use it here
    response = cy
      .request({
        url: `http://api.zippopotam.us/${countryCode}/${postcode}`,
        failOnStatusCode: false,
      })
      .then((resp) => {
        response = resp;
      });
  }
);

Then('the response matches the pre-generated schema', () => {
  const errors = validateSchema(zippoResponseSchema, response.body);
  expect(errors, 'response schema validation errors').to.be.null;
});

Then(
  'The post code returned in the response matches the postcode I pass as a request parameter',
  () => {
    expect(response.body['post code']).to.eq(requestData.postcode);
  }
);

Then('no data is returned and I receive a 404 error', () => {
  expect(response.status, `${JSON.stringify(response, null, 2)}`).to.be.eq(404);
  expect(response.body, `${JSON.stringify(response.body)}`).to.be.empty;
});

Then('{int} places are returned', (expectedCount) => {
  expect(response.body.places.length).to.be.eq(expectedCount);
});

Then('They are all in the state of {string}', (expectedState) => {
  for (const place of response.body.places)
    expect(place.state).to.be.eq(expectedState);
});

Then(
  'Each one has a place name, longitude, state, state abbreviation and latitude',
  () => {
    // reuse schema validation to check this
    const errors = validateSchema(zippoResponseSchema, response.body);
    expect(errors, 'response schema validation errors').to.be.null;
  }
);

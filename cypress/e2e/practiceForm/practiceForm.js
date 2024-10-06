/// <reference types="cypress" />

import {
  Given,
  When,
  Then,
  Before,
} from '@badeball/cypress-cucumber-preprocessor';
import { PracticeFormPage } from '../pages/PracticeFormPage';

var form;
var testData;
var confirmations;

Before(() => {
  form = new PracticeFormPage();
  testData = {};
  confirmations = new Array();
  form.visit();
});

Given('I load a list of user details from a fixture', () => {
  cy.fixture('userDetails').then((data) => (testData = data));
});

Given('I am on the demoqa automation practice form page', () => {
  // implemented in BeforeAll
});

When(
  'I fill in the form with {string}, {string}, {string}, {string}, {string}, {string}',
  function (firstname, lastname, email, dob, gender, mobile) {
    form.enterName(firstname, lastname);
    form.enterEmail(email);
    form.enterDoB(dob);
    form.selectGender(gender);
    form.enterMobile(mobile);
    testData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      dob: dob,
      gender: gender,
      mobile: mobile,
    };
  }
);

When('I fill in and submit the form with all user details', () => {
  for (const user of testData) {
    form.enterName(user.firstName, user.lastName);
    form.enterEmail(user.email);
    form.enterDoB(user.dob);
    form.selectGender(user.gender);
    form.enterMobile(user.mobile);
    form.submit();

    let userResults = { name: '', email: '', gender: '', mobile: '', dob: '' };
    form
      .getResultElementByLabel('Student Name')
      .invoke('text')
      .then((t) => (userResults.name = t));
    form
      .getResultElementByLabel('Student Email')
      .invoke('text')
      .then((t) => (userResults.email = t));
    form
      .getResultElementByLabel('Gender')
      .invoke('text')
      .then((t) => (userResults.gender = t));
    form
      .getResultElementByLabel('Mobile')
      .invoke('text')
      .then((t) => (userResults.mobile = t));
    form
      .getResultElementByLabel('Date of Birth')
      .invoke('text')
      .then((t) => (userResults.dob = t));

    confirmations.push(userResults);
    form.closeResultModal();
  }
});

When('I submit the form', () => {
  form.submit();
});

const resultifyDoB = (dob) => {
  return dob.replace(/([^ ]+ [^ ]+)( )([^ ]+)/, '$1,$3');
};

Then('a confirmation dialog is shown with the correct user details', () => {
  form
    .getResultElementByLabel('Student Name')
    .should('have.text', `${testData.firstname} ${testData.lastname}`);
  form
    .getResultElementByLabel('Student Email')
    .should('have.text', testData.email);
  form.getResultElementByLabel('Gender').should('have.text', testData.gender);
  form.getResultElementByLabel('Mobile').should('have.text', testData.mobile);
  form
    .getResultElementByLabel('Date of Birth')
    .should('have.text', `${resultifyDoB(testData.dob)}`);
});

Then('all the confirmation dialogs show the correct correct details', () => {
  for (i = 0; i < testData.length; i++) {
    const input = testData[i];
    const result = confirmations[i];
    cy.wrap(result).should('have.property', 'name');
    cy.wrap(result.name).should('eq', `${input.firstName} ${input.lastName}`);
    cy.wrap(result).should('have.property', 'email');
    cy.wrap(result.email).should('eq', input.email);
    cy.wrap(result).should('have.property', 'gender');
    cy.wrap(result.gender).should('eq', input.gender);
    cy.wrap(result).should('have.property', 'mobile');
    cy.wrap(result.mobile).should('eq', input.mobile);
    cy.wrap(result).should('have.property', 'dob');
    cy.wrap(result.dob).should('eq', resultifyDoB(input.dob));
  }
});

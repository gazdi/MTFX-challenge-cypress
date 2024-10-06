// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';

Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes(
      'Cypress detected that an uncaught error was thrown from a cross origin script.'
    )
  ) {
    console.log(`Ignoring an uncaught exception: \n${err.message}`);
    return false;
  }
});

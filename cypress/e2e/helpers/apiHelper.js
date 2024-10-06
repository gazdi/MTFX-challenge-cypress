import { Ajv } from 'ajv';

export const callPostcodeSearch = (countryCode, postcode) => {
  let response;
  cy.request(`http://api.zippopotam.us/${countryCode}/${postcode}`)
    .as('apiResponse')
    .then((resp) => {
      response = resp;
    });
  return cy.then(() => {
    return response;
  });
};

export const buildSchemaValidationMessage = (errors) => {
  if (!errors) return 'Schema validation';
  else
    return errors
      .map((err) => err.instancePath + ' ' + err.message + '\n' + err.data)
      .join('\n\n');
};

export const validateSchema = (schema, json) => {
  const ajv = new Ajv({ strictRequired: true, allErrors: true });
  const validate = ajv.compile(schema);
  return validate.errors;
};

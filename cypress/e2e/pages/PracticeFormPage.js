/// <reference types="cypress" />

export class PracticeFormPage {
  resultMap = new Map([
    ['Student Name', 1],
    ['Name', 1],
    ['Student Email', 2],
    ['Email', 2],
    ['Gender', 3],
    ['Mobile', 4],
    ['Date of Birth', 5],
    ['DoB', 5],
  ]);

  visit() {
    cy.visit('/automation-practice-form');
  }

  enterName(first, last) {
    cy.get('#firstName').type(first);
    cy.get('#lastName').type(last);
  }

  enterEmail(email) {
    cy.get('#userEmail').type(email);
  }

  selectGender(gender) {
    cy.findByRole('radio', { name: gender }).check({ force: true });
  }

  enterMobile(mobile) {
    cy.get('#userNumber').type(mobile);
  }

  massageDoB = (dobInputString) => {
    return dobInputString
      .split(/[ ,]/)
      .map((dobElement, index) =>
        index === 1 ? dobElement.substring(0, 3) : dobElement
      )
      .join(' ');
  };

  enterDoB(dobString) {
    cy.get('#dateOfBirthInput')
      .type(`{selectall}${dobString}{enter}`)
      .should('have.value', this.massageDoB(dobString));
  }

  submit() {
    cy.get('#submit').click();
  }

  getResultElementByIndex(index) {
    return cy
      .findByRole('dialog')
      .findAllByRole('row')
      .eq(index)
      .findAllByRole('cell')
      .eq(1);
  }

  getResultElementByLabel(label) {
    return this.getResultElementByIndex(this.resultMap.get(label));
  }

  closeResultModal() {
    cy.get('#closeLargeModal').click({ force: true });
  }
}

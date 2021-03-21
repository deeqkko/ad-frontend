// Log in command

Cypress.Commands.add('login', (username, password) => {
    cy.visit('http://localhost:3000')
    cy.get('#username').type('adusermizer')
    cy.get('#password').type('adusermizer')
    cy.get('#login-button').click()
})

Cypress.Commands.add('logout', () => {
    cy.visit('http://localhost:3000')
    cy.get('#logout-button').click()
})

Cypress.Commands.add('createTestOu', (ouName) => {
    cy.wait(2000)
    cy.get('#name').type(ouName)
    cy.get('[name=create]').click()
    cy.wait(2000)
    cy.reload()
})

Cypress.Commands.add('deleteTestOu', (ouName) => {
    cy.wait(2000)
    cy.reload()
    cy.wait(2000)
    cy.get('#delete').click()
})
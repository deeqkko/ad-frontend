describe('Organizational Unit tests', function() {

    beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('adusermizer')
        cy.get('#password').type('adusermizer')
        cy.get('#login-button').click()
        cy.get('a[href*="/ou"]').click()
    })

    it('User can create an object', function() {
        cy.get('#name').type('testUnit')
        cy.get('[name=create]').click()
        cy.wait(2000)
        cy.reload()

        cy.contains('Name:')
        cy.contains('testUnit')
    })

    it('User can delete an object', function() {
        cy.get('#delete').click()
        cy.wait(2000)
        cy.reload()

        cy.contains('testUnit').should('not.exist')
    })
})
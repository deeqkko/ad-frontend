describe('Login functions', function() {
    
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('Authorized user can login', function() {
        cy.get('#username').type('testuser')
        cy.get('#password').type('p155ah0u5u1!')
        cy.get('#login-button').click()

        cy.contains('Welcome').should('exist')
    })

    it('Unauthorized user cannot login', function() {
        cy.get('#username').type('user')
        cy.get('#password').type('user')

        cy.contains('Welcome').should('not.visible')
    })

})
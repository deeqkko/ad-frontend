describe('User tests', () => {
    before(() => {
        cy.login('adusermizer,adusermizer')
        cy.get('a[href*="/ou"]').click()
        cy.wait(2000)
        cy.createTestOu('test321')
        cy.get('a[href*="/"]').click()
        cy.wait(2000)
        cy.get('a[href*="/groups"]').click()
        cy.get('#name').type('testGroup')
        cy.get('#sam_account_name').type('testgroup')
        cy.get('#group_category').select('Distribution')
        cy.get('#group_scope').select('DomainLocal')
        cy.get('#display_name').type('testgroup')
        cy.get('#description').type('testgroup')
        cy.get('#organizational_unit').select('test321')
        cy.get('[name=create]').click()
        cy.get('a[href*="/"]').click()
        cy.wait(2000)
        cy.get('a[href*="/users"]').click()
       
    })
    it('User can be created in ou and add a group membership', () => {
        cy.get('#sam_account_name').type('testUser')
        cy.get('#given_name').type('Test')
        cy.get('#surname').type('User')
        cy.get('#account_password').type('5ala5ana1!')
        cy.get('#organizational_unit').select('test321')
        cy.get('#groups').select('testGroup')
        cy.get('#submit').click()
        cy.reload()

        cy.contains('testUser').should('exist')
        cy.contains('Test').should('exist')
    })

    it('User can be deleted', () => {
        cy.get('#delete').click()
        cy.reload()
        cy.contains('testUser').should('not.exist')
        cy.contains('Test').should('not.exist')
    })

    after(() => {
        cy.get('a[href*="/"]').click()
        cy.login('adusermizer,adusermizer')
        cy.get('a[href*="/groups"]').click()
        cy.wait(2000)
        cy.get('#delete').click()
        cy.get('a[href*="/"]').click()
        // cy.login('adusermizer,adusermizer')
        cy.get('a[href*="/ou"]').click()
        cy.deleteTestOu('testOu123')
        cy.get('a[href*="/"]').click()

    })
})
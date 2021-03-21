describe('Group tests', () => {

    before(() => {
        cy.login('adusermizer,adusermizer')
        cy.get('a[href*="/ou"]').click()
        cy.wait(2000)
        cy.createTestOu('test321')
        cy.get('a[href*="/"]').click()
        cy.wait(2000)
        cy.get('a[href*="/groups"]').click()
       
    })

    it('User can create a group in an organizational unit', () => {
        cy.get('#name').type('testGroup')
        cy.get('#sam_account_name').type('testgroup')
        cy.get('#group_category').select('Distribution')
        cy.get('#group_scope').select('DomainLocal')
        cy.get('#display_name').type('testgroup')
        cy.get('#description').type('testgroup')
        cy.get('#organizational_unit').select('test321')
        cy.get('[name=create]').click()

        cy.wait(2000)
        cy.reload()

        cy.contains('testGroup').should('exist')
        cy.contains('testgroup').should('exist')
        cy.contains('test321').should('exist')
    })



    it('User can delete a group', () => {
        cy.get('#delete').click()
        cy.wait(2000)
        cy.reload()

        cy.contains('testGroup').should('not.exist')
        cy.contains('testgroup').should('not.exist')
    })

    after(() => {
        cy.get('a[href*="/"]').click()
        cy.login('adusermizer,adusermizer')
        cy.get('a[href*="/ou"]').click()
        cy.deleteTestOu('testOu123')
        cy.get('a[href*="/"]').click()
    })
})
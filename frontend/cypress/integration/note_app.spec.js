describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'https://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Lukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'https://localhost:3001/api/users/', user)
    cy.visit('https://localhost:3000')
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukai')
    cy.get('#password').type('wrong')
    cy.get('#login-btn').click()

    cy.get('.notification')
      .should('contain', 'failed')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  it('front page can be openend', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-btn').click()

    cy.contains('Matti Lukkainen')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new note can be created', function () {
      cy.createNote({ content: 'a note created by cypress', important: false })
    })

    describe('and several note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})
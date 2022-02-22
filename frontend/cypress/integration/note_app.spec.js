describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'https://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Lukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'https://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
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
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-btn').click()
    })

    it('a new note can be created', function () {
      cy.contains('add note').click()
      cy.get('#newcontent').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })
})
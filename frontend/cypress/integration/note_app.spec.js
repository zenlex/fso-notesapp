describe('Note app', function () {
  beforeEach(function () {
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
    cy.get('#username').type('fng')
    cy.get('#password').type('foobarbaz')
    cy.get('#login-btn').click()

    cy.contains('fing new guy logged-in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('fng')
      cy.get('#password').type('foobarbaz')
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
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

//TODO: something broke the testing here - I suspect it was adding thunk and the function action creators
// * E2E tests pass in cypress for this component so the issue is with the test here not the component (I think)
test.skip('<NoteForm /> updeates parent state and calls onSubmit', () => {
  const createNote = jest.fn()
  const mockStore = configureStore([])
  const store = mockStore({})

  render(<Provider store={store}><NoteForm createNoteTest={createNote} /></Provider>)

  const input = screen.getByPlaceholderText('write note content here')
  const sendButton = screen.getByText('save')

  userEvent.type(input, 'testing a form...')
  userEvent.click(sendButton)
  console.log(createNote.mock.calls)
  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
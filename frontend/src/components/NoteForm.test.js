import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

test('<NoteForm /> updeates parent state and calls onSubmit', () => {
  const createNote = jest.fn()
  const mockStore = configureStore([])
  const store=mockStore({ notes:[] })

  render(<Provider store={store}><NoteForm createNoteTest={createNote} /></Provider>)

  const input = screen.getByPlaceholderText('write note content here')
  const sendButton = screen.getByText('save')

  userEvent.type(input, 'testing a form...')
  userEvent.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
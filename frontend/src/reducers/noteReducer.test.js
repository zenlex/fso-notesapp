//TODO: fix tests to work with new redux setup. Manual testing is functional. Just have context/ref issues now to sort

import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer', () => {
  test('returns new state with action NEW_NOTE', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'the app state is in the redux store',
        important: true,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('returns new state with action TOGGLE_IMPORTANCE', () => {
    const state = {
      notification: null,
      notes: [
        {
          content: 'the app state is in redux store',
          important: true,
          id: 1
        },
        {
          content: 'state changes are made with actions',
          important: false,
          id: 2
        }
      ]
    }

    const action = {
      type: 'TOGGLE_IMPORTANCE',
      data: 2
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState.notes).toHaveLength(2)

    expect(newState.notes).toContainEqual(state.notes[0])

    expect(newState.notes).toContainEqual({
      content: 'state changes are made with actions',
      important: true,
      id: 2
    })
  })
})
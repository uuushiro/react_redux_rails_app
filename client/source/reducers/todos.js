import { ADD_TODO, TOGGLE_TODO, SET_TODOS, FETCH_TODOS_DONE } from '../constants/action-types'
import store from '../stores/store'

const todo = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS_DONE:
      return state
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })

    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case FETCH_TODOS_DONE:
      return action.data.map(t =>
        todo(t, action))
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
    case TOGGLE_TODO:
      return state.map(t =>
        todo(t, action)
      )
    case SET_TODOS:
      return store.dispatch(SET_TODOS).map(t =>
        todo(t, action)
      );
    default:
      return state
  }
}

export default todos
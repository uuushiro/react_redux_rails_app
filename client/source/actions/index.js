import { ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO, SET_TODOS, TRIMMED_TODO, ADD_TODO_STARTED, FETCH_TODOS_START, FETCH_TODOS_DONE, FETCH_TODOS_ERROR } from '../constants/action-types'

let nextTodoId = 0

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id
  }
}

export const setTodos = () => {
  return {
    type: SET_TODOS
  }
}

export const fixedAddTodo = (title) => (dispatch, getState) => {
  const fixedTitle = title + "修正された文字だよー";
  dispatch({ type: ADD_TODO_STARTED });
  setTimeout(
    () => dispatch({ type: ADD_TODO, text: fixedTitle }),
    1000
  );
}

const checkStatus = (response) =>  {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw (new Error(response.statusText));
}

export const getTodos = () => (dispatch) => {
  dispatch({ type: FETCH_TODOS_START });
  fetch('/todos')
    .then(checkStatus)
    .then(response => response.json())
    .then(data   => dispatch({type: FETCH_TODOS_DONE, data}))
    .catch(error => dispatch({type: FETCH_TODOS_ERROR, error}));
};

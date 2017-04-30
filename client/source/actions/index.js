import { ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO, GET_TOGGLE_TODO, SET_TODOS, TRIMMED_TODO, ADD_TODO_STARTED, FETCH_TODOS_START, FETCH_TODOS_DONE, FETCH_TODOS_ERROR, POST_TODO_ERROR } from '../constants/action-types'

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

export const getToggleTodo = (id) => (dispatch) => {
  fetch('todos/' + id + '/toggle', {
    headers: {
      'content-type': 'application/json'
    },
    method: 'get'
  })
  .then(checkStatus)
  .then(response => response.json())
  .then(data => dispatch({type: TOGGLE_TODO, id: data.id}))
  .catch(error => dispatch({type: POST_TODO_ERROR, error}))
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
  dispatch({ type: ADD_TODO_STARTED, id: nextTodoId++ });
  setTimeout(
    () => dispatch({ type: ADD_TODO, id: nextTodoId++, text: fixedTitle }),
    1000
  );
}

const checkStatus = (response) =>  {
  if (response.status >= 200 && response.status < 300) {
    console.log(response)
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

export const postTodo = (text) => (dispatch) => {
  fetch('todos', {
    headers: {
      'content-type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({
      text: text
    }),
    chache: 'force cache'
  })
  .then(checkStatus)
  .then(response => response.json())
  .then(data => dispatch({type: ADD_TODO, id: data.id, text:data.text}))
  .catch(error => dispatch({type: POST_TODO_ERROR, error}))
}
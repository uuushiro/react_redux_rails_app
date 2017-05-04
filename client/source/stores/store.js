import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import measureMiddleware from '../middlewares/measure';
import rootReducer from '../reducers/index';
import { getTodos, setTodos } from '../actions'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger, measureMiddleware)
);



export default store;

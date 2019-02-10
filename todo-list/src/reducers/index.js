import { combineReducers } from 'redux';
import todoList from './todo';
import filters from './filters';

const todoApp = combineReducers({
  todoList,
  filters
})

export default todoApp
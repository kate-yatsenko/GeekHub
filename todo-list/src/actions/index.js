let id = 0;
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: id++,
    text
  }
}

export const filters = (filter) => {
  return {
    type: 'FILTERS',
    filter
  }
};

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
};

export const removeTodo = (id) => {
  return {
    type: 'REMOVE_TODO',
    id
  }
};

export const editTodo = (id, text) => {
  return {
    type: 'EDIT_TODO',
    id,
    text
  }
};
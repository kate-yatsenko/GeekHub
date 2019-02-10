const todoList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(item => {
        if (item.id !== action.id) {
          return item
        }
        return {...item, completed: !item.completed};
      });
      case 'REMOVE_TODO':
        return state.filter(item => item.id !==action.id);
    default:
      return state
  }
};

export default todoList




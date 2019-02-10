const filters = (state = 'ALL', action) => {
  switch (action.type) {
    case 'FILTERS':
      return action.filter;
    default:
      return state
  }
};

export default filters
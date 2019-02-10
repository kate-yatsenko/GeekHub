import React from "react";
import {connect} from "react-redux";
import Todo from './Todo';

const mapStateToProps = ({todoList, filters}) => {
  return {
    todoList: getFiltersTodoList(todoList, filters),
    filters: filters,
  }
};

const getFiltersTodoList = (todoList, filter) => {
  switch (filter) {
    case 'COMPLETED':
      return todoList.filter(item => item.completed);
    case 'ACTIVE':
      return todoList.filter(item => !item.completed);
    default:
      return todoList
  }
}

class TodoList extends React.Component {
  render() {
    const {todoList} = this.props
    return (todoList.map(item => {
        return (
          <Todo item={item} key={item.id}/>
        )
      })
    )
  }
}

export default connect(mapStateToProps)(TodoList)
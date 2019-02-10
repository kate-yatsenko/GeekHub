import React from "react";
import {Form, Button} from "react-bootstrap";
import {toggleTodo, removeTodo} from '../../../actions';
import {connect} from 'react-redux';
import './index.css';

class Todo extends React.Component {

  completedTodo = (id) => {
    const {dispatch} = this.props;
    dispatch(toggleTodo(id))
  };

  removeTodoItem = (id) => {
    const {dispatch} = this.props;
    dispatch(removeTodo(id))
  };

  render() {
    const {item} = this.props;
    return (
      <Form.Group className="todo-item d-flex justify-content-between">
        <Form.Check
          label={item.text}
          checked={item.completed}
          onChange={() => this.completedTodo(item.id)}
        />
        <Button
          variant="danger"
          onClick={() => this.removeTodoItem(item.id)}
        >
          <span>Remove</span>
        </Button>
      </Form.Group>
    )
  }
}

export default connect()(Todo)
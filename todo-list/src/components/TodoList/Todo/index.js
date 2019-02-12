import React from "react";
import {Form, Button} from "react-bootstrap";
import {toggleTodo, removeTodo, editTodo} from '../../../actions';
import {connect} from 'react-redux';
import EditModal from './EditModal';
import './index.css';

class Todo extends React.Component {
  state = {
    show: false,
  };

  closeModal = () => {
    this.setState({ show: false });
  }

  showModal = () => {
    this.setState({ show: true });
  }

  completedTodo = (id) => {
    const {dispatch} = this.props;
    dispatch(toggleTodo(id))
  };

  removeTodoItem = (id) => {
    const {dispatch} = this.props;
    dispatch(removeTodo(id))
  };

  editTodoItem = (id, text) => {
    const {dispatch} = this.props;
    dispatch(editTodo(id, text));
    this.closeModal();
  };

  render() {
    const {item} = this.props;
    const {show} = this.state;
    return (
      <Form.Group className="todo-item d-flex justify-content-between">
        <Form.Check
          label={item.text}
          checked={item.completed}
          onChange={() => this.completedTodo(item.id)}
        />
        <div>
          <Button
            variant="primary"
            className="mr-1"
            onClick={this.showModal}
          >
            <span>Edit</span>
          </Button>
          <Button
            variant="danger"
            onClick={() => this.removeTodoItem(item.id)}
          >
            <span>Remove</span>
          </Button>
        </div>
        <EditModal
          id={item.id}
          text={item.text}
          editTodoItem={this.editTodoItem}
          closeModal={this.closeModal}
          show={show}

        />
      </Form.Group>
    )
  }
}

export default connect()(Todo)
import React from "react";
import {Button, Form, Col} from "react-bootstrap";
import {addTodo} from '../../actions';
import {connect} from 'react-redux';
import './index.css';

class AddTodo extends React.Component {
  state = {
    text: ''
  };

  addTodo = (e) => {
    e.preventDefault();
    const {dispatch} = this.props;
    const {text} = this.state;
    if (text) {
      dispatch(addTodo(text.trim()));
      this.setState({
        text: ''
      })
    }
  };

  inputTodo = (value) => {
    this.setState({
      text: value
    })
  };


  render() {
    const {text} = this.state;
    return (
      <Form onSubmit={(e) => this.addTodo(e)}>
        <Form.Row>
          <Col xs={10} lg={11}>
            <Form.Control
              type="text"
              onChange={(e) => this.inputTodo(e.target.value)}
              value={text}
            />
          </Col>
          <Col xs={2} lg={1}>
            <Button
              className="add-button"
              variant="primary"
              type="submit"
            >
              <span className="add-button-text">+</span>
            </Button>
          </Col>
        </Form.Row>
      </Form>
    )
  }
}

export default connect()(AddTodo)

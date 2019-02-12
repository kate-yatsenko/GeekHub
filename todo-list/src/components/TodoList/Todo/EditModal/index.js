import React from "react";
import {Form, Button, Modal} from "react-bootstrap";

class EditModal extends React.Component {
  state = {
    newText: this.props.text
  };

  changeInput = (value) => {
    this.setState({
      newText: value
    })
  };

  changeTodo = (e) => {
    e.preventDefault();
    const {id, editTodoItem} = this.props;
    const {newText} = this.state;
    editTodoItem(id, newText)
  };

  render() {
    const {closeModal, show} = this.props;
    const {newText} = this.state;
    return (
      <Modal
        onHide={closeModal}
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Todo
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.changeTodo}>
          <Modal.Body>
            <Form.Control
              value={newText}
              onChange={e => this.changeInput(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Change</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}

export default EditModal
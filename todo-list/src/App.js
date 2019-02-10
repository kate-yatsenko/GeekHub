import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import AddTodo from './components/AddTodo';
import Filter from './components/Filter';
import TodoList from './components/TodoList';

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="align-items-center my-3">
          <Col xs={12} md={9} lg={10}>
            <AddTodo/>
          </Col>
          <Col xs={12} md={3} lg={2}>
            <Filter/>
          </Col>
        </Row>
        <TodoList/>
      </Container>
    );
  }
}

export default App;

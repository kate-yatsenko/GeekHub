import React from "react";
import {Form, FormCheck} from "react-bootstrap";
import {filters} from '../../actions';
import {connect} from 'react-redux';
import './index.css';

class Filter extends React.Component {
  state = {
  selectedOption: 'ALL'
  };

  optionChange = e => {
    const {dispatch} = this.props
    this.setState({
      selectedOption: e.target.value
    });
    dispatch(filters(e.target.value));
  }

  render() {
    const {selectedOption} = this.state;
    return (
      <Form className="filters mt-3 mt-md-0">
        <FormCheck>
          <FormCheck.Input
            type="radio"
            value="ALL"
            checked={selectedOption === 'ALL'}
            onChange={e => this.optionChange(e)}
          />
          <FormCheck.Label>All List</FormCheck.Label>
        </FormCheck>
        <FormCheck>
          <FormCheck.Input
            type="radio"
            value="ACTIVE"
            checked={selectedOption === 'ACTIVE'}
            onChange={e => this.optionChange(e)}
          />
          <FormCheck.Label>Active</FormCheck.Label>
        </FormCheck>
        <FormCheck>
          <FormCheck.Input
            type="radio"
            value="COMPLETED"
            checked={selectedOption === 'COMPLETED'}
            onChange={e => this.optionChange(e)}
          />
          <FormCheck.Label>Completed</FormCheck.Label>
        </FormCheck>
      </Form>
    )
  }
}

export default connect()(Filter)
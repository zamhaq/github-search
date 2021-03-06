import React, { Component } from "react";
import { Col, Form, FormGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";

import { sortRepos } from "../actions/actioncreators";

const SORT_BY_STARS = "stargazers_count";
const SORT_BY_FORKS = "forks_count";
const SORT_BY_WATCHERS = "watchers_count";

class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: SORT_BY_STARS
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ selected: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.getSortedRepos(this.state.selected, this.props.repos);
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Col xs={8} md={8}>
            <FormControl
              value={this.state.selected}
              onChange={this.handleChange}
              name="sortby"
              componentClass="select"
            >
              <option value={SORT_BY_STARS}> Stars </option>
              <option value={SORT_BY_FORKS}> Forks </option>
              <option value={SORT_BY_WATCHERS}> Watchers </option>
            </FormControl>
          </Col>
          <Col xs={4} md={4}>
            <FormControl bsStyle="primary" type="submit" value="submit" />
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = state => ({ repos: state.repos });
const mapDispatchToProps = dispatch => ({
  getSortedRepos(field, repos) {
    dispatch(sortRepos(field, repos));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionBar);

import React, { Component } from "react";
import BodyField from "../components/BodyField";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    let formPayload = {
      query: this.state.query
    };
    this.props.getRecipes(formPayload);
    this.handleClear(event);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleClear(event) {
    event.preventDefault();
    this.setState({
      query: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <BodyField
          content={this.state.query}
          label="Search: "
          name="query"
          onChange={this.handleChange}
        />
        <div className="button-group">
          <input
            id="search-button"
            className="button"
            type="submit"
            value="Search"
          />
        </div>
      </form>
    );
  }
}

export default SearchForm;

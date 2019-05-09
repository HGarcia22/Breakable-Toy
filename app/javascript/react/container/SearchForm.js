import React, { Component } from "react";
import BodyField from "../components/BodyField";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    let formPayload = {
      query: this.state.query
    };
    this.props.getRecipes(formPayload);
    this.handleClear(event);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClear = event => {
    event.preventDefault();
    this.setState({
      query: ""
    });
  };

  handleKeyDown = event => {
    //use the rocket above to avoid binding!!!!
    if (event.nativeEvent.keyCode == 13) {
      this.handleSubmit(event);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <BodyField
          content={this.state.query}
          label="Search: "
          name="query"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
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

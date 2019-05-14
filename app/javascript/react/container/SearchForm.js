import React, { Component } from "react";
import BodyField from "../components/BodyField";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      diet: ""
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    let formPayload = {
      query: this.state.query,
      diet: this.state.diet
    };
    this.props.getRecipes(formPayload);
    this.handleClear(event);
    console.log(this.state);
  };

  handleBodyChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDietChange = event => {
    this.setState({
      diet: event.target.id
    });
  };

  handleClear = event => {
    event.preventDefault();
    this.setState({
      query: "",
      diet: ""
    });
  };

  handleKeyDown = event => {
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
          onChange={this.handleBodyChange}
          onKeyDown={this.handleKeyDown}
        />
        <label>
          None
          <input
            name="diet"
            id=""
            type="radio"
            onChange={this.handleDietChange}
            defaultChecked
          />
        </label>
        <label>
          Gluten Free
          <input
            name="diet"
            id="gluten+free"
            type="radio"
            onChange={this.handleDietChange}
          />
        </label>
        <label>
          Dairy Free
          <input
            name="diet"
            id="dairy+free"
            type="radio"
            onChange={this.handleDietChange}
          />
        </label>
        <label>
          Vegan
          <input
            name="diet"
            id="vegan"
            type="radio"
            onChange={this.handleDietChange}
          />
        </label>
        <label>
          Vegetarian
          <input
            name="diet"
            id="vegetarian"
            type="radio"
            onChange={this.handleDietChange}
          />
        </label>
        <label>
          Whole30
          <input
            name="diet"
            id="whole30"
            type="radio"
            onChange={this.handleDietChange}
          />
        </label>
        <label>
          Ketogenic
          <input
            name="diet"
            id="ketogenic"
            type="radio"
            onChange={this.handleDietChange}
          />
        </label>
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

import React, { Component } from "react";
import TextField from "../components/TextField";

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
      <form className="searchForm" onSubmit={this.handleSubmit}>
        <div className="search-and-button">
          <TextField
            content={this.state.query}
            name="query"
            onChange={this.handleBodyChange}
            onKeyDown={this.handleKeyDown}
            placeholder="I'm in the mood for..."
          />
          <div className="button-group">
            <input
              id="search-button"
              className="button"
              type="submit"
              onKeyDown={this.handleKeyDown}
              value="Search"
            />
          </div>
        </div>
        <div className="radio-wrapper">
          <div className="dietMessage">
            <h3 className="diet-message-1">Looking for something specific?</h3>
            <p className="diet-message-2">
              Select one of our optional dietary considerations and click search
            </p>
          </div>
          <div className="radio">
            <div id="radio-1">
              <input
                name="diet"
                id=""
                type="radio"
                onChange={this.handleDietChange}
                onKeyDown={this.handleKeyDown}
                defaultChecked
              />
              <label>
                <span>None</span>
              </label>
              <input
                name="diet"
                id="gluten+free"
                type="radio"
                onKeyDown={this.handleKeyDown}
                onChange={this.handleDietChange}
              />
              <label>
                <span>Gluten Free</span>
              </label>
              <input
                name="diet"
                id="dairy+free"
                type="radio"
                onKeyDown={this.handleKeyDown}
                onChange={this.handleDietChange}
              />
              <label>
                <span>Dairy Free</span>
              </label>
            </div>
            <div id="radio-2">
              <input
                name="diet"
                id="very+healthy"
                type="radio"
                onChange={this.handleDietChange}
              />
              <label>
                <span>Very Healthy</span>
              </label>
              <input
                name="diet"
                id="sustainable"
                type="radio"
                onKeyDown={this.handleKeyDown}
                onChange={this.handleDietChange}
              />
              <label>
                <span>Sustainable</span>
              </label>
              <input
                name="diet"
                id="vegan"
                type="radio"
                onKeyDown={this.handleKeyDown}
                onChange={this.handleDietChange}
              />
              <label>
                <span>Vegan</span>
              </label>
            </div>
            <div id="radio-3">
              <input
                name="diet"
                id="vegetarian"
                type="radio"
                onChange={this.handleDietChange}
              />
              <label>
                <span>Vegetarian</span>
              </label>
              <input
                name="diet"
                id="whole30"
                type="radio"
                onChange={this.handleDietChange}
              />
              <label>
                <span>Whole30</span>
              </label>
              <input
                name="diet"
                id="ketogenic"
                type="radio"
                onKeyDown={this.handleKeyDown}
                onChange={this.handleDietChange}
              />
              <label>
                <span>Ketogenic</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchForm;

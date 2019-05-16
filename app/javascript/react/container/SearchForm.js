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
        <div>
          <div className="dietMessage">
            <h2 className="diet-message-1">Search over 300k+ recipes</h2>
          </div>

          <div className="searchbox">
            <TextField
              content={this.state.query}
              name="query"
              onChange={this.handleBodyChange}
              onKeyDown={this.handleKeyDown}
              placeholder="I'm in the mood for..."
            />
          </div>
          <div className="radio">
            <div className="filter-wrapper">
              <p className="optional-filters">Optional Filters:</p>
              <div>
                <div id="radio-1">
                  <input
                    name="diet"
                    id=""
                    type="radio"
                    onChange={this.handleDietChange}
                    onKeyDown={this.handleKeyDown}
                    className="big"
                    defaultChecked
                  />
                  <label>
                    <span className="radio-label">None</span>
                  </label>
                  <input
                    name="diet"
                    id="gluten+free"
                    type="radio"
                    onKeyDown={this.handleKeyDown}
                    className="big"
                    onChange={this.handleDietChange}
                  />
                  <label>
                    <span className="radio-label">Gluten Free</span>
                  </label>
                  <input
                    name="diet"
                    id="dairy+free"
                    type="radio"
                    onKeyDown={this.handleKeyDown}
                    className="big"
                    onChange={this.handleDietChange}
                  />
                  <label>
                    <span className="radio-label">Dairy Free</span>
                  </label>
                </div>
                <div id="radio-2">
                  <input
                    name="diet"
                    id="vegan"
                    type="radio"
                    className="big"
                    onChange={this.handleDietChange}
                  />
                  <label>
                    <span className="radio-label">Vegan</span>
                  </label>

                  <input
                    name="diet"
                    id="vegetarian"
                    type="radio"
                    className="big"
                    onChange={this.handleDietChange}
                  />
                  <label>
                    <span className="radio-label">Vegetarian</span>
                  </label>
                  <input
                    name="diet"
                    id="ketogenic"
                    type="radio"
                    className="big"
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleDietChange}
                  />
                  <label className="radio-label">
                    <span>Ketogenic</span>
                  </label>
                </div>
              </div>
            </div>
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
        </div>
      </form>
    );
  }
}

export default SearchForm;

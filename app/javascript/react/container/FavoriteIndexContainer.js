import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";

import FavoriteTile from "../components/FavoriteTile";

class FavoriteIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }
  componentDidMount() {
    const recipeId = this.props.params.id;
    fetch("/api/v1/recipes/favorite", {
      method: "POST",
      body: body,
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(body => {
        this.setState({
          favorites: body.favorites
        });
        let y = this.state.current_user;
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    return <div />;
  }
}

export default FavoriteIndexContainer;

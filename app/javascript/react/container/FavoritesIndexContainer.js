import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";

import FavoriteTile from "../components/FavoriteTile";

class FavoritesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }
  componentDidMount() {
    fetch(`/api/v1/favorites`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({
          favorites: body
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let userFavorites = this.state.favorites.map((favorite, index) => {
      return (
        <FavoriteTile
          key={index + "favorite"}
          id={favorite[1]}
          title={favorite[0]}
          image={favorite[2]}
        />
      );
    });
    return (
      <div className="favorite-container">
        <div className="favorite-title-page">
          <h2>My Favorites</h2>
        </div>
        <div>{userFavorites}</div>
      </div>
    );
  }
}

export default FavoritesIndexContainer;

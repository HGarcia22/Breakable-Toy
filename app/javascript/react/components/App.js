import React from "react";
import {
  Route,
  IndexRoute,
  Router,
  browserHistory,
  Redirect
} from "react-router";

import RecipesIndexContainer from "../container/RecipesIndexContainer";
import RecipesShowContainer from "../container/RecipesShowContainer";
import FavoritesIndexContainer from "../container/FavoritesIndexContainer";

export const App = props => {
  return (
    <Router history={browserHistory}>
      <Redirect from="/" to="/recipes" />
      <Route path="/recipes" component={RecipesIndexContainer} />
      <Route path="/favorites" component={FavoritesIndexContainer} />
      <Route path="recipes/:id" component={RecipesShowContainer} />
    </Router>
  );
};

export default App;

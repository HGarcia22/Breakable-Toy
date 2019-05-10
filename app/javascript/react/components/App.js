import React from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";

import RecipesIndexContainer from "../container/RecipesIndexContainer";
import RecipesShowContainer from "../container/RecipesShowContainer";

export const App = props => {
  return (
    <Router history={browserHistory}>
      <Route path="/recipes" component={RecipesIndexContainer} />
      <Route path="recipes/:id" component={RecipesShowContainer} />
    </Router>
  );
};

export default App;

import React from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";

import RecipesIndexContainer from "../container/RecipesIndexContainer";

export const App = props => {
  return (
    <Router history={browserHistory}>
      <Route path="/recipes" component={RecipesIndexContainer} />
    </Router>
  );
};

export default App;

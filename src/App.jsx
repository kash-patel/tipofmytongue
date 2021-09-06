import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import logo from "./logo.svg";
import Home from "./screens/Home";
import Results from "./screens/Results";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Switch>
            <Route exact path="/" render={(props) => <Home />} />
            <Route path="/search" component={Results} />
          </Switch>
        </main>
      </Router>
    );
  }
}

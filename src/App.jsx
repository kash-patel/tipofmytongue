import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import logo from "./logo.svg";
import Home from "./screens/Home";
import Results from "./screens/Results";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queries: localStorage.getItem("queries")
        ? JSON.parse(localStorage.getItem("queries"))
        : [],
    };

    this.createQuery = this.createQuery.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.deleteQuery = this.deleteQuery.bind(this);
  }

  createQuery(rel, word) {
    const id = rel + "/" + word;
    this.setState({
      queries: [...this.state.queries, { id, rel, word }],
    });

    localStorage.setItem(
      "queries",
      JSON.stringify([...this.state.queries, { id, rel, word }])
    );
  }

  updateQuery(id, rel, word) {
    console.log("Updated query.");
  }

  deleteQuery(id) {
    this.setState({
      queries: this.state.queries.filter((q) => q.id !== id),
    });
    localStorage.setItem(
      "queries",
      JSON.stringify(this.state.queries.filter((q) => q.id !== id))
    );
  }

  render() {
    return (
      <Router>
        <main>
          <Route
            exact
            path="/"
            render={(props) => (
              <Home
                createQuery={this.createQuery}
                updateQuery={this.updateQuery}
                deleteQuery={this.deleteQuery}
                queries={this.state.queries}
                {...props}
              />
            )}
          />
          <Route path="/search" component={Results} />
        </main>
      </Router>
    );
  }
}

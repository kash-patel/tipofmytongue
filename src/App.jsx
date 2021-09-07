import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { query as queryReducer } from "./reducers/global/query";
// import logo from "./logo.svg";
import Home from "./screens/Home";
import Results from "./screens/Results";
import globalContext from "./contexts/global/context";

const App = () => {
  const initialState = {
    queries: JSON.parse(localStorage.getItem("queries")) || [],
  };

  const [state, dispatch] = useReducer(queryReducer, initialState);

  useEffect(() => {
    localStorage.setItem("queries", JSON.stringify(state.queries));
  }, [state.queries]);

  const Provider = ({ children }) => {
    return (
      <globalContext.Provider
        value={{
          queries: state.queries,
          dispatchQueryAction: dispatch,
        }}
      >
        {children}
      </globalContext.Provider>
    );
  };

  return (
    <Router>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Provider>
                <Home />
              </Provider>
            )}
          />
          <Route path="/search" component={Results} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect  } from "react-router-dom";

import Home from "./pages/home/home";
import Admin from "./pages/admin/admin";

import Context from "./app.context";

function App() {
  const [loading, setLoading] = useState();
  const [loggedIn, setLoggedIn] = useState(() => {});
  const [err, setErr] = useState();
  const [isAdmin, setIsAdmin] = useState();

  let history = useHistory();

  useEffect(() => {
    if (err) alert(err);
  }, [err]);

  const value = { loading, loggedIn, err, setLoading, setLoggedIn, setErr };

  return (
    <Context.Provider value={value}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/admin">
            { loggedIn ? <Admin /> : <Redirect to="/" /> }
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;

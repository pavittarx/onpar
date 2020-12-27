import axios from "axios";
import React, { useEffect, useState } from "react";

import dotenv from "dotenv";
dotenv.config();

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "./pages/home/home";
import Admin from "./pages/admin/admin";
import User from "./pages/user/user";

import Context from "./app.context";

function App() {
  const [loading, setLoading] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [err, setErr] = useState();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const endpoint = process.env.REACT_APP_DOMAIN + "/api/authenticate";
    axios.get(endpoint, { withCredentials: true }).then((res) => {
      console.log(res);
      if (res.data.success) setLoggedIn(true);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      const endpoint = process.env.REACT_APP_DOMAIN + "/api/admin/check";

      axios.get(endpoint, { withCredentials: true }).then((res) => {
        console.log("> ", res.data);
        setIsAdmin(true);
      });
    }

    if (!loggedIn) setIsAdmin(false);
  }, [loggedIn]);

  useEffect(() => {
    if (err) alert(err);
  }, [err]);

  const value = { loading, loggedIn, err, setLoading, setLoggedIn, setErr };

  return (
    <Context.Provider value={value}>
      <Router>
        <Switch>
          <Route exact path="/">
            {!loggedIn ? <Home /> : isAdmin ? <Admin /> : <User />}
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;

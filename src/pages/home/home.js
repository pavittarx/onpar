import React, { useState, useContext } from "react";
import Context from "./../../app.context";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {err, setErr, setLoading, setLoggedIn} = useContext(Context);

  const login = () => {
    
  }

  return (
    <>
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        id="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />

      <Button variant="contained" color="primary" onClick={login}>
        Login
      </Button>
    </>
  );
};

export default Home;

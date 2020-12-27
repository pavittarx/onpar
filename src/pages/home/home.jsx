import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Context from "../../app.context";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import dotenv from "dotenv";

dotenv.config();

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 1rem 2rem;

  max-width: 400px;
  height: 200px;

  .buttons {
    display: flex;
    justify-content: space-around;
  }
`;

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    err,
    setErr,
    setLoading,
    loggedIn,
    setLoggedIn,
    setIsAdmin,
  } = useContext(Context);

  const history = useHistory();

  useEffect(() => {
    const endpoint = process.env.REACT_APP_DOMAIN + "/api/admin/check";

    axios.get(endpoint).then((res) => {
      setIsAdmin(true);
      history.push('/admin');
    });
  }, [loggedIn]);

  const login = () => {
    const endpoint = `${process.env.REACT_APP_DOMAIN}/api/login`.trim();

    axios
      .post(endpoint, { username, password })
      .then((res) => {
        alert(res.data.message);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log("Error", err.message);
        setErr("An error occured while signing up");
      });
  };

  const signup = () => {
    const endpoint = `${process.env.REACT_APP_DOMAIN}/api/signup`.trim();

    axios
      .post(endpoint, { username, password })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log("Error", err.message);
        setErr("An error occured while signing up");
      });
  };

  return (
    <HomeWrapper>
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

      <div className="buttons">
        <Button variant="contained" color="primary" onClick={login}>
          Login
        </Button>

        <Button variant="contained" color="secondary" onClick={signup}>
          Signup
        </Button>
      </div>
    </HomeWrapper>
  );
};

export default Home;

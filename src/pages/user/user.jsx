import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Context from "./../../app.context";
import dotenv from "dotenv";

dotenv.config();

export default function () {
  const { setLoggedIn } = useContext(Context);

  const endpoint = process.env.REACT_APP_DOMAIN + "/api/logout";

  const logout = () => {
    axios.get(endpoint);
    setLoggedIn(false);
  };

  return (
    <>
      Welcome! Please login using admin account for admin access. 
      <br/>
      Thank you for stopping by. <br/>
      <button onClick={logout}> Logout </button>
    </>
  );
}

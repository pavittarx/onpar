import React from "react";

const initialState = {
  loading: false,
  loggedIn: false,
  err: '',

  setLoading: () => {},
  setLoggedIn: () => {},
  setErr: () => {}
}

export default React.createContext(initialState);
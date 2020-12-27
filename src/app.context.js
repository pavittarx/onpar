import React from "react";

const initialState = {
  loading: false,
  loggedIn: false,
  err: '',
  isAdmin: false,

  setLoading: () => {},
  setLoggedIn: () => {},
  setErr: () => {},
  setIsAdmin: () => {}
}

export default React.createContext(initialState);
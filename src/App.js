import React, { useEffect, useState } from "react";
import Home from "./pages/home/home";

import Context from "./app.context";

function App() {
  const [loading, setLoading] = useState();
  const [loggedIn, setLoggedIn] = useState();
  const [err, setErr] = useState();

  useEffect(() => {
    if(err) alert(err) ;
  }, [err]);

  const value = {loading, loggedIn, err, setLoading, setLoggedIn, setErr};
  return (
    <Context.Provider value={value}>
      <Home />
    </Context.Provider>
  );
}

export default App;

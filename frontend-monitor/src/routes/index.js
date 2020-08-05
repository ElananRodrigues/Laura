import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Context } from '../context/AuthContext';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

function RouteAuth({ path, ...rest }) {
  const { loading, authenticated, history } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (path === "/" && !authenticated) {
    history().push("/login")
  } else if (path !== "/login" && !authenticated) {
    history().push("/login")
  } else if (path === "/login" && authenticated) {
    history().push("/")
  } else {
    return <Route {...rest} />
  }
}

export default function Routes() {
  return (
    <Switch>
      <RouteAuth exact path="/login" component={Login} />
      <RouteAuth isPrivate exact path="/" component={Dashboard} />
      <RouteAuth exact path="/*" component={Dashboard} />
    </Switch>
  );
}
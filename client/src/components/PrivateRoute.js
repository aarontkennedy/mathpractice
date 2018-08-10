import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, userID, ...rest }) => {
  alert();
  return (
    <Route {...rest} render={(props) => (
      userID ? <Component {...props} /> : <Redirect to='/login' />
    )} />);
};

export default PrivateRoute;
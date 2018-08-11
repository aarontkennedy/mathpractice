import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, userID, location, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      userID ? <Component {...props} userID={userID}/> : <Redirect to='/signin' />
    )} />);
};

export default PrivateRoute;
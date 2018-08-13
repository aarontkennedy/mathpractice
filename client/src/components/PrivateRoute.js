import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, userID, signOut, ...rest }) => {
  console.log("PrivateRoute: "+userID);
  return (
    <Route {...rest} render={(props) => (
      userID ? <Component {...props} userID={userID} 
      signOut={signOut}/> : <Redirect to='/signin' />
    )} />);
};

export default PrivateRoute;
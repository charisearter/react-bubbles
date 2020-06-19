//Creates protected route for friends list
//remembers if logged in or not
//navigating to this route will redirect to login page

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem('token');
  return (
    <Route  {...rest} render={(props) => {
      if (token) {
        return <Component {...props} />
      } else {
        return <Redirect to='/login' />;
      }
    }} />
  )
};

export default PrivateRoute;
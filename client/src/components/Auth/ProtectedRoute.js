import React from "react";
import { Route, Redirect } from "react-router-dom";

/* 
    Custom protected route which we will use to protect our components for users who are logged in and those who aren't 

    WHY ?
    - Because we want to be able to pass down user's who are loggedIn to the components that need that information. 
    - Also, we want to redirect any user who isn't logged in to the login page 
*/
const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        // Check if there is some user logged in already
        // Return the component associated to the url if successful or redirect if not
        if (user) {
          return <Component {...props} loggedInUser={user} />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;

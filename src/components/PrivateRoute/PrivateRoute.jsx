// MARK : react imports
import React from "react";
import { Route, Redirect } from "react-router-dom";
// MARK: project imports
import store from "store";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return store.getState().user.accessToken.length > 0 ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;

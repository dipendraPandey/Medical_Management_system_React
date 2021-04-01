import React from "react";
import { Route, Redirect } from "react-router-dom";
import MainComponent from "../components/MainComponent";
import authHandler from "./authHandler";

export const PrivateRoute1 = ({ page, activepage, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authHandler.loggedIn() ? (
          <MainComponent page={page} activepage={activepage} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

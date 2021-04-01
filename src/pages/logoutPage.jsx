import React from "react";
import { Redirect } from "react-router-dom";
import authHandler from "../utils/authHandler";
import Config from "../utils/Config";

function LogoutComponent() {
  authHandler.logoutUser();
  return <Redirect to={Config.loginPageUrl} />;
}

export default LogoutComponent;

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../assets/css/style.css";
import "../assets/css/components.css";
import logo from "../assets/img/logo1.png";
import authHandler from "../utils/authHandler";
import Config from "../utils/Config";

class Login extends Component {
  state = {
    username: "",
    password: "",
    loginStatus: 0,
  };
  // saving
  saveInput = (e) => {
    let key = e.target.name;
    this.setState({ [key]: e.target.value });
  };

  formSubmit = (e) => {
    e.preventDefault();
    this.setState({ loginStatus: 1 });
    authHandler.login(
      this.state.username,
      this.state.password,
      this.handleAjaxResponse
    );
  };
  // this is callback fucntion when the api is called for the user logging token
  handleAjaxResponse = (data) => {
    console.log(data.error);
    if (data.error) {
      this.setState({ loginStatus: 4 });
    } else {
      this.setState({ loginStatus: 3 });
      window.location = Config.homeUrl;
    }
  };
  // this is used for the notification while logging in Error Success Waiting
  getMessage = () => {
    if (this.state.loginStatus === 0) {
      return "";
    } else if (this.state.loginStatus === 1) {
      return (
        <div className="alert alert-warming alert-has-icon">
          <div className="alert-icon">
            <i className="far fa-lightbulb"></i>
          </div>
          <div className="alert-body">
            <div className="alert-title">Logging in </div>
            Please wait while logging ....!
          </div>
        </div>
      );
    } else if (this.state.loginStatus === 3) {
      return (
        <div className="alert alert-success alert-has-icon">
          <div className="alert-icon">
            <i className="far fa-lightbulb"></i>
          </div>
          <div className="alert-body">
            <div className="alert-title">Login Success </div>
            Login successfull .........!
          </div>
        </div>
      );
    } else if (this.state.loginStatus === 4) {
      return (
        <div className="alert alert-danger alert-has-icon">
          <div className="alert-icon">
            <i className="far fa-lightbulb"></i>
          </div>
          <div className="alert-body">
            <div className="alert-title">Login Error </div>
            Wrong Credentials were provided .....!
          </div>
        </div>
      );
    }
  };
  render() {
    // Checking if the user is already logged in
    if (authHandler.loggedIn()) {
      return <Redirect to={Config.homeUrl} />;
    }

    return (
      <div id="app">
        <section className="section">
          <div className="container">
            {this.getMessage()}
            <div className="row">
              <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="login-brand">
                  <img src={logo} alt="logo" width="250" />
                </div>

                <div className="card card-primary">
                  <div className="card-header">
                    <h4>Login</h4>
                  </div>

                  <div className="card-body">
                    <form
                      method="post"
                      className="needs-validation"
                      onSubmit={this.formSubmit}
                    >
                      <div className="form-group">
                        <label htmlFor="email">UserName</label>
                        <input
                          id="username"
                          type="username"
                          className="form-control"
                          name="username"
                          tabIndex="1"
                          autoFocus
                          value={this.state.username}
                          onChange={this.saveInput}
                        />
                        <div className="invalid-feedback">
                          Please fill in your username
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="d-block">
                          <label htmlFor="password" className="control-label">
                            Password
                          </label>
                          <div className="float-right">
                            <a
                              href="auth-forgot-password.html"
                              className="text-small"
                            >
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                        <input
                          id="password"
                          type="password"
                          className="form-control"
                          name="password"
                          tabIndex="2"
                          value={this.state.password}
                          onChange={this.saveInput}
                        />
                        <div className="invalid-feedback">
                          please fill in your password
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="remember"
                            className="custom-control-input"
                            tabIndex="3"
                            id="remember-me"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="remember-me"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg btn-block"
                          tabIndex="4"
                          disabled={this.state.btn}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="mt-5 text-muted text-center">
                  Don't have an account?{" "}
                  <a href="auth-register.html">Create One</a>
                </div>
                <div className="simple-footer">
                  Copyright &copy; Stisla 2018
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Login;

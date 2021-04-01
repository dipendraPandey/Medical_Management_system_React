import React, { Component } from "react";
import "../assets/css/style.css";
import "../assets/css/components.css";
import Footer from "./footer";
import MainSideBar from "./mainSideBar";
import Navbar from "./navBar";
import NavbarBg from "./navbar-bg";
import "../assets/js/scripts.js";
import "../assets/js/custom.js";
class MainComponent extends Component {
  render() {
    if (window.screen.width < 900) {
      document.getElementById("root").className = "sidebar-gone";
    }

    var Page = this.props.page;
    return (
      <>
        <div id="app">
          <div className="main-wrapper">
            <NavbarBg />
            <Navbar />
            <MainSideBar activepage={this.props.activepage} />
            <Page  {...this.props} />
            <Footer />
          </div>
        </div>
      </>
    );
  }
}
export default MainComponent;

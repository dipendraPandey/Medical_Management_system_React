import React, { Component } from "react";
import { Link } from "react-router-dom";
import Config from "../utils/Config";

export default class MainSideBar extends Component {
  render() {
    const sidebarClick = () => {
      if (window.screen.width < 1025) {
        document.getElementById("bodyelement").className = "sidebar-gone";
      }
    };
    return (
      <>
        <div
          className="main-sidebar"
          tabIndex="1"
          style={{ overflow: "hidden", outline: "none" }}
        >
          <aside id="sidebar-wrapper">
            <div className="sidebar-brand">
              <Link to="/home">MMS</Link>
            </div>
            <div className="sidebar-brand sidebar-brand-sm">
              <Link to="/home">MMS</Link>
            </div>
            <ul className="sidebar-menu">
              {Config.sidebarItem.map((item) => (
                <li
                  key={item.index}
                  className={
                    item.index == this.props.activepage
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link
                    to={item.url}
                    className="nav-link "
                    onClick={sidebarClick}
                  >
                    
                    <i className={item.icon}></i>
                    
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </>
    );
  }
}

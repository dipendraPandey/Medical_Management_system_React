import React, { Component } from "react";

 class Footer extends Component {
  render() {
    return (
      <>
        <footer className="main-footer">
          <div className="footer-left">
            Copyright © 2020 <div className="bullet"></div> Modified By{" "}
            <a href="#">Dipendra Pandey</a>
          </div>
          <div className="footer-right">2.3.0</div>
        </footer>
      </>
    );
  }
}
export default Footer;
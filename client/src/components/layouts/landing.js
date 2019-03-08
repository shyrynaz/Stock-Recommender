import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

class Landing extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Navbar />
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Get stock analytics the best way </b>
              <span style={{ fontFamily: "monospace" }} />
            </h4>
            <p className="flow-text grey-text text-darken-1">
              we provide sentiment analysis, realTime Intraday stock price and
              access to articles about stock
            </p>
            <br />
            <Link
              to="/register"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </Link>
            <Link
              to="/login"
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable black-text"
            >
              LogIn
            </Link>
          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Landing;

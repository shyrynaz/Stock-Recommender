import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/layouts/landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import PrivateRoute from "./components/private-routes/privateRoute";
import Dashboard from "./components/dashboard/dashboard";

//check for token to keep user logged in
if (localStorage.jwtToken) {
  // set auth token
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //decode token and get user info
  const decoded = jwt_decode(token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

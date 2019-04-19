import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./actions/authActions";
import { Layout, Menu, Icon, Button } from "antd";

import Register from "./components/auth/register";
import Login from "./components/auth/login";
import PrivateRoute from "./components/private-routes/privateRoute";
import Dashboard from "./components/dashboard/dashboard";
import Technology from "./components/dashboard/technology";
import Finance from "./components/dashboard/finance";

const { Header, Content, Sider } = Layout;

class Main extends Component {
  state = {
    collapsed: false
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    let userAuth;
    const auth = this.props.auth;
    if (auth.isAuthenticated === true) {
      userAuth = (
        <Button
          style={{ margin: 10 }}
          className="button1"
          type="primary"
          onClick={this.onLogoutClick}
        >
          Logout
        </Button>
      );
    } else {
      userAuth = (
        <Button
          href="/login"
          className="button1"
          type="secondary"
          style={{ margin: 10 }}
        >
          Login
        </Button>
      );
    }
    return (
      <Router>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{
              height: "100vh",
              position: "fixed",
              left: 0
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="vertical-left" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Icon type="home" />
                <span>Dashboard</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>Technology</span>
                <Link to="/technology" />
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="bank" />
                <span>Finance</span>
                <Link to="/finance" />
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="bulb" />
                <span>Energy</span>
                <Link to="/energy" />
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="medicine-box" />
                <span>Health Care</span>
                <Link to="/healthCare" />
              </Menu.Item>
              <Menu.Item key="6">
                <Icon type="customer-service" />
                <span>Consumer Services</span>
                <Link to="/ConsumerServices" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header
              style={{
                background: "#fff",
                padding: 0,
                position: "fixed",
                zIndex: 1,
                width: "85%"
              }}
            >
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                style={{ cursor: "pointer" }}
                onClick={this.toggle}
              />
              Stock<b>Recommendation</b>
              {userAuth}
            </Header>
            <Content
              style={{
                margin: "24px 16px 0px",
                paddingTop: 45,
                overflow: "initial"
              }}
            >
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/technology" component={Technology} />
                <PrivateRoute path="/finance" component={Finance} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
Main.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Main);

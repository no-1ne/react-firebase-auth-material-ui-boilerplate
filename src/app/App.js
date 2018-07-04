import React, { Component } from "react";
import MyRoutes from "./MyRoutes";
import initAuthenticationAuthorization from "./common/security/initAuthenticationAuthorization";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";

class App extends Component {
  render() {
    return (
      <Router>
        <Layout auth={!!this.props.auth}>
          <MyRoutes />
        </Layout>
      </Router>
    );
  }
}

export default initAuthenticationAuthorization(App);

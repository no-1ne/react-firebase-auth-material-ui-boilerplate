import React, { Component } from "react";

import MyRoutes from "./MyRoutes";

import initAuthentication from "./common/security/initAuthentication";

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

export default initAuthentication(App);

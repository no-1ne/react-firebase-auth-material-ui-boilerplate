import React from "react";
import { withRouter } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import * as routes from "../../constants/routes";

import AuthUserContext from "./AuthUserContext";

const WithAuthenticationAuthorization = (Component, accessType = null) => {
  class withAuthenticationAuthorization extends React.Component {
    componentDidMount() {
      //fired when auth state changes
      //redirect to login page if authUser is null
      firebase.auth().onAuthStateChanged(authUser => {
        if (!authUser) {
          this.props.history.push(routes.LOGIN, {
            redirect_url: this.props.location.pathname
          });
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {store => {
            if (accessType != null) {
              return accessType(store.authorization) ? (
                <Component />
              ) : (
                <h1>Access Denied</h1>
              );
            } else {
              return <Component />;
            }
          }}
        </AuthUserContext.Consumer>
      );
    }
  }
  return withRouter(withAuthenticationAuthorization);
};
export {
  WithAuthenticationAuthorization as WithAuthorization,
  WithAuthenticationAuthorization as WithAuthentication
};

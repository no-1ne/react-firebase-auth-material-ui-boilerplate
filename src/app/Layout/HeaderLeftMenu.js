import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import { Button } from "@material-ui/core";
import AuthUserContext from "../common/security/AuthUserContext";
import * as routes from "../constants/routes";

const HeaderLeftMenu = () => (
  <AuthUserContext.Consumer>
    {store => <HeaderLeftMenuComponent authUser={store.authUser} />}
  </AuthUserContext.Consumer>
);
const HeaderLeftMenuComponent = ({ authUser }) => {
  return (
    <Fragment>
      {!authUser && (
        <Button component={Link} to={routes.LOGIN} color="inherit">
          Login
        </Button>
      )}
      {authUser && (
        <Button
          onClick={() => {
            firebase.auth().signOut();
          }}
          color="inherit"
        >
          Logout
        </Button>
      )}
      <Button component={Link} to={routes.ABOUT} color="inherit">
        About
      </Button>
    </Fragment>
  );
};

export default HeaderLeftMenu;

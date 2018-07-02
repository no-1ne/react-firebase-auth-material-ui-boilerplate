import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import { withRouter } from "react-router-dom";
import * as routes from "../../constants/routes";
import { USER_AUTHORIZATION } from "../../constants/db/firestoreRef";
import * as user_type from "../../constants/db/RegisterCustomerTypes";

const LoginPage = ({ history }) => (
  <div>
    <Login history={history} />
  </div>
);

class Login extends Component {
  state = {
    isSignedIn: false,
    currentUser: null,
    isNewUser: false
  };
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: authResult => {
        this.colRef = firebase.firestore().collection(USER_AUTHORIZATION);
        var currentUser = {};
        currentUser = authResult.user;
        if (currentUser.uid) {
          this.colRef
            .doc(currentUser.uid)
            .get()
            .then(val => {
              if (!val.exists) {
                this.colRef
                  .doc(currentUser.uid)
                  .set({ user_type: user_type.NORMAL });
              }
            })
            .catch(error => console.log(error));
        }

        return false;
      }
    },
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: "IN"
      }
    ]
  };
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      const location = this.props.history.location;
      if (user) {
        if (location.state && location.state.redirect_url) {
          this.props.history.push(location.state.redirect_url);
        } else this.props.history.push(routes.HOME);
      }
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>Please Login:</h1>
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
    return (
      <div>
        <p>If you seeing this something is wrong</p>
      </div>
    );
  }
}

export default withRouter(LoginPage);

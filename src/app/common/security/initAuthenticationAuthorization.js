import React from "react";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/messaging";
import AuthUserContext from "./AuthUserContext";
import { USER_AUTHORIZATION, TOKEN_REF } from "../../constants/db/firestoreRef";
import { fcmCredentials } from "../../config/fcmCredentials";

const initAuthentication = Component =>
  class InitAuthentication extends React.Component {
    state = {
      authUser: null,
      authorization: "",
      token: ""
    };

    componentDidMount() {
      // Retrieve Firebase Messaging object.
      const messaging = firebase.messaging();
      messaging.usePublicVapidKey(fcmCredentials.vapiKey);
      //requests permission from the user for the current origin to display notifications
      //if permission granted then gets token Id and add document it to TOKEN_REF collection  in firestore
      messaging
        .requestPermission()
        .then(() => {
          return messaging.getToken();
        })
        .then(token => {
          this.setState({ token });
          this.setTokenAndUserId(token);
        })
        .catch(error => {
          console.log("error: ", error);
        });
      // handle incoming messages to notification. Called when app send the messages
      messaging.onMessage(payload => {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
          icon: payload.notification.icon
        };
        return new Notification(notificationTitle, notificationOptions);
      });
      // listener fired if Instance ID token is updated.
      messaging.onTokenRefresh(this.handleTokenUpdate);
      //fired when auth state changes
      firebase.auth().onAuthStateChanged(this.handleAuthChange);
    }
    //called when token is refresh
    handleTokenUpdate = () => {
      const { token } = this.state;
      const messaging = firebase.messaging();
      messaging.getToken().then(updatedToken => {
        this.setTokenAndUserId(token, null, updatedToken);
      });
    };
    //handles user authorization and auth and set it to state object
    handleAuthChange = authUser => {
      const { token } = this.state;
      if (authUser && authUser.uid) {
        const userRef = firebase.firestore().collection(USER_AUTHORIZATION);
        this.setTokenAndUserId(token, authUser.uid);
        userRef
          .doc(authUser.uid)
          .get()
          .then(val => {
            if (val.exists) {
              var authorization = val.data().user_type;
              this.setState({ authorization });
            }
          });
      }
      this.setState({ authUser });
    };
    //set token ,userId to new document in "TOKEN_REF"  
    //also update the token if the token refresh
    setTokenAndUserId = (token, userId = null, updatedToken = null) => {
      const tokenRef = firebase.firestore().collection(TOKEN_REF);
      if (token) {
        tokenRef
          .where("token", "==", token)
          .get()
          .then(query => {
            //push token to new document if existing documents doesn't have this token
            if (!query.docs.length && !userId) {
              tokenRef.add({ token });
            }
            //update the old token with new refreshed token
            if (query.docs.length &&updatedToken &&query.docs[0].data().token !== updatedToken) {
              tokenRef.doc(query.docs[0].id).update({ token:updatedToken });
              this.setState({ token:updatedToken });
            }
            //adding userId to "TOKEN_REF" document ,only if token exist in one of the document
            if (userId && query.docs.length && !query.docs[0].data().userId) {
              tokenRef.doc(query.docs[0].id).update({ userId });
            }
          });
      }
    };

    render() {
      const { authUser, authorization, token } = this.state;
      return (
        <AuthUserContext.Provider
          value={{
            authUser,
            authorization,
            token
          }}
        >
          <Component auth={authUser} />
        </AuthUserContext.Provider>
      );
    }
  };

export default initAuthentication;

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

exports.sendNotification = functions.https.onRequest(
  async (request, response) => {
    //request.query contains params sent by get request
    let allTokens = [];
    const payload = {
      notification: {
        title: "hello user",
        icon: "./notification.png",
        body: "push notification"
        //click_action: "http://localhost:3000/"
      }
    };
    const tokenRefs = await admin
      .firestore()
      .collection("tokens")
      .get();
    tokenRefs.docs.map(doc => {
      allTokens = [...allTokens, ...[doc.data().token]];
    });

    admin
      .messaging()
      .sendToDevice(allTokens, payload)
      .then(() => {
        console.log("success");
      })
      .catch(error => console.log("error"));
    response.send("notifications sent");
  }
);

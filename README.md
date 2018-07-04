
  <h1>
**React Firebase material ui boilerplate &nbsp;**
</h1>
  

**React firebase auth material-ui boilerplate** for building modern, scalable web applications with React, material-ui using serverless infrastructure provided by <a href="https://firebase.google.com/">Firebase</a> (No SQL, Cloud Functions, CDN hosting, and file storage). It allows you to save time and build upon a solid foundation and design patterns.  

###  Prerequisites
*  Nodejs > 8.9 0r higher
*   VS Code editor (preferred)

*  Firebase tools `npm install -g firebase-tools`

###  Getting Started

clone the repo  
```bash
$ git clone https://github.com/startupgurukul/react-firebase-auth-material-ui-boilerplate.git
```
###  Credentials setup

*  copy and paste your Credentials from your <a href="https://firebase.google.com/">Firebase</a> into src/app/config/firebaseConfig.js and also in public/firebase-messaging-sw.js

*  copy and paste your **VPI PUBLIC KEY** into src/app/config/fcmCredentials.js which you can find it in <a href="https://console.firebase.google.com/project/_/settings/cloudmessaging/">Firebase Cloud Messaging </a>
```bash
$ cd react-firebase-auth-material-ui-boilerplate
$ npm install # Installs dependencies;
$ npm start # Compile the app and opens it in a browser with "live reload"

```
Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

###  deployment
* Initialize firebase
```bash
$ firebase init # follow the steps to setup
$ npm run build
$ firebase deploy
```
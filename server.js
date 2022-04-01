const express = require('express');
const app = express();

require('./startup/database')();
require('./startup/routes')(app);


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

/*

  Google Firestore setup

  // Import the functions you need from the SDKs you need

  import { initializeApp } from "firebase/app";

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

  const firebaseConfig = {

    apiKey: "AIzaSyDD0kOj1Ha0FH9Z0paxKkU5Zv5tT4DRC5A",

    authDomain: "empyrean-flight-345720.firebaseapp.com",

    projectId: "empyrean-flight-345720",

    storageBucket: "empyrean-flight-345720.appspot.com",

    messagingSenderId: "482654940770",

    appId: "1:482654940770:web:bfe62a75012e3fbb396b3b"

  };


  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
*/
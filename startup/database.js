const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


module.exports = function(){
  
  const firebaseConfig = {
  
    apiKey: "AIzaSyDD0kOj1Ha0FH9Z0paxKkU5Zv5tT4DRC5A",
  
    authDomain: "empyrean-flight-345720.firebaseapp.com",
  
    projectId: "empyrean-flight-345720",
  
    storageBucket: "empyrean-flight-345720.appspot.com",
  
    messagingSenderId: "482654940770",
  
    appId: "1:482654940770:web:bfe62a75012e3fbb396b3b",

    credential: applicationDefault()
  
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore();

}
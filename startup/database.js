const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

module.exports = function(){

    initializeApp({
        credential: applicationDefault()
      });
      
      const db = getFirestore();

}
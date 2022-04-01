const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const express = require('express');
const {Storage} = require('@google-cloud/storage');
const router = express.Router();
const storage = new Storage();

router.use(express.static(__dirname));

router.get('/', async (req,res) => {

      res.sendFile(__dirname + "/login.html");
});

router.get('/:id', async (req,res)=>{

      const db = getFirestore();

      const cityRef = db.collection("users").doc(req.params.id);
      const doc = await cityRef.get();
      if (!doc.exists) {
      console.log('No such document!');
      } else {
      console.log('Document data:', doc.data());
      }

});

module.exports = router;
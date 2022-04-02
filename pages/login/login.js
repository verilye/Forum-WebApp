const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const express = require('express');
const router = express.Router();

router.use(express.static(__dirname));

router.get('/', async (req,res) => {

      res.sendFile(__dirname + "/login.html");
});

router.get('/login', async (req,res)=>{

      const db = getFirestore();

      const idRef = db.collection('users').doc(req.query.id);
      const doc = await idRef.get();
      if (!doc.exists) {
      console.log('No such document!');
      } else {
      console.log('Document data:', doc.data());
      }
});

module.exports = router;
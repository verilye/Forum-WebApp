const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {

    res.render('login');
    
  });
  
  
router.get('/login', async (req,res)=>{

  const db = getFirestore();

  const idRef = db.collection('users').doc(req.query.id);
  const doc = await idRef.get();
  if (!doc.exists) {
    res.render('login', {error: "ID or password is invalid"});
  } else {
    res.render('forum');
  }
  });

module.exports = router;
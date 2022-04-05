const db = require('../startup/database'); 
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const express = require('express');
const {doc, getDoc } = require('firebase/firestore');
const router = express.Router();

router.get('/', async (req,res) => {

    res.render('login');
    
  });
  
  
router.get('/login', async (req,res)=>{

  const idRef = doc(db, 'users', req.query.id);
  const docSnap = await getDoc(idRef);
  if (!docSnap.exists) {
    res.render('login', {error: "ID or password is invalid"});
  } else {
    res.render('forum');
  }
  });

module.exports = router;
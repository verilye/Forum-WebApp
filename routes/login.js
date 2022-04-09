const db = require('../startup/database'); 
const express = require('express');
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const {doc, getDoc } = require('firebase/firestore');
const router = express.Router();
const fs = require('fs');
router.use(express.json());

router.get('/', async (req,res) => {

    res.render('login');
    
  });
 
// When redirected to /login, grab the user id from req.body and insert
// it into firestore query, returning the user with that id, making sure
// password and username match
  
router.get('/login', async (req,res)=>{
 
  const idRef = doc(db, 'users', req.body.id);
  const docSnap = await getDoc(idRef);

  // IMPLEMENT VALIDATION INSTEAD OF ENDLESS if else
  // 
  // AND COMPARE AGAINST HASHES AND SALTS NOT THE ACTUAL PASSWORD

  if (docSnap._document == null) {
    res.render('login', {error: "ID or password is invalid"});
  } else if(docSnap.data().user_name != req.body.user_name ){

    res.render('login', {error: "ID or password is invalid"});

  }else if (docSnap.data().password != req.body.password){
  
    res.render('login', {error: "ID or password is invalid"});
  
  }else{

    res.render('forum', {user_name : req.body.id});

  }
});

module.exports = router;
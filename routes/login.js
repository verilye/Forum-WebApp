const db = require('../startup/database'); 
const express = require('express');
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const {doc, getDoc } = require('firebase/firestore');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
router.use(express.json());

router.get('/', async (req,res) => {

    res.render('login');
    
  });

router.use(bodyParser.urlencoded({
  extended: true
}));
  
router.get('/login', async (req,res)=>{

 

  const idRef = doc(db, 'users', req.query.id);
  const docSnap = await getDoc(idRef);

  if (docSnap._document == null) {
    res.render('login', {error: "ID or password is invalid"});
  } else if(docSnap.data().user_name != req.query.user_name ){

    res.render('login', {error: "ID or password is invalid"});

  }else if (docSnap.data().password != req.query.password){
  
    res.render('login', {error: "ID or password is invalid"});
  
  }else{

    fs.writeFile('id.txt',JSON.stringify(docSnap._document.data.value.mapValue.fields.user_name.stringValue), function (err) {});
    fs.readFile('id.txt', 'utf8' , (err, data) => {
      
      const removed = data.replaceAll('"', '');
      console.log(removed);
      res.render('forum', {user_name: removed});

    });
  }
});

module.exports = router;
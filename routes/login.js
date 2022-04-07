const db = require('../startup/database'); 
const express = require('express');
const {doc, getDoc } = require('firebase/firestore');
const router = express.Router();
const bodyParser = require('body-parser');
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

  console.log(docSnap.data());

  if (docSnap._document == null) {
    res.render('login', {error: "ID or password is invalid"});
  } else if(docSnap.data().user_name != req.query.user_name ){

    res.render('login', {error: "ID or password is invalid"});

  }else if (docSnap.data().password != req.query.password){
  
    res.render('login', {error: "ID or password is invalid"});
  
  }else{

    res.render('forum', {user_name: docSnap.data().user_name, pic: docSnap.data().pic});
  }
  });

module.exports = router;
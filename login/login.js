const db = require('../_startup/database'); 
const express = require('express');
const auth = require('../_middleware/auth');
const { access } = require('./access');
const router = express.Router();
const bcrypt = require('bcrypt');
const {doc, getDoc } = require('firebase/firestore');
const jwt = require('jsonwebtoken');
const config =require('config');
router.use(express.json());

router.get('/', async (req,res) => {

    res.render('login');
    
});
 
// When redirected to /login, grab the user id from req.body and insert
// it into firestore query, returning the user with that id, making sure
// password and username match
  
router.post('/login', access, async (req,res)=>{

  const idRef = doc(db, 'users', req.body.id);
  const docSnap = await getDoc(idRef);

  if (docSnap._document == null) 
  {res.render('login', {error: "ID or password is invalid"});} 
  
  if(docSnap.data().user_name != req.body.user_name )
  {res.render('login', {error: "ID or password is invalid"});}

  const salt = docSnap.data().salt;
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const pass = docSnap.data().password;

  if(hashedPassword == pass){
      
      const user = docSnap.data().user_name;

      const token = jwt.sign({user}, config.get('jwtPrivateKey'));

      res.locals.token = token;

      res.render('forum');

  }else{

      res.render('login', {popup: "ID or password is invalid"}); 

  }  

});

module.exports = router;
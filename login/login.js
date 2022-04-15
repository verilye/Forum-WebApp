const db = require('../_startup/database'); 
const express = require('express');
const {doc, getDoc } = require('firebase/firestore');
const auth = require('../_middleware/auth');
const { async } = require('@firebase/util');
const router = express.Router();
router.use(express.json());

router.get('/', async (req,res) => {

    res.render('login');
    
  });
 
// When redirected to /login, grab the user id from req.body and insert
// it into firestore query, returning the user with that id, making sure
// password and username match
  
router.post('/login', async (req,res)=>{

  try{

    const idRef = doc(db, 'users', req.body.id);
    const docSnap = await getDoc(idRef);

    if (docSnap._document == null) 
    {res.render('login', {error: "ID or password is invalid"});} 
    
    if(docSnap.data().user_name != req.body.user_name )
    {res.render('login', {error: "ID or password is invalid"});}
    
    if (docSnap.data().password != req.body.password)
    {res.render('login', {error: "ID or password is invalid"});}

    const token = user.generateAuthToken();

    res.send(token);

  }catch(ex){

      for (field in ex.errors){
          console.log(ex.errors[field].message);
      }

  }
}), auth, async (req,res)=>{res.redirect(forum)};

module.exports = router;
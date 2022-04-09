



//On load, display name and the last few posts made by the user











const db = require('../startup/database'); 
const express = require('express');
const {doc, getDoc } = require('firebase/firestore');
const router = express.Router();
router.use(express.json());

router.use(bodyParser.urlencoded({
    extended: true
  }));

router.get('/', async (req,res) => {

    res.render('user');
    
  });


// Compare user password to whats on server, validate 
// then update

router.post('/change', async (req,res) => {

    //ADD COOKIE STORING USER INFO AND CHECK AGAINST IT

    //ADD VALIDATION
    const idRef = doc(db, 'users', removed);
    const docSnap = getDoc(idRef);
    if(docSnap.data().password == req.body.old){
    
        updateDoc(doc(db, "posts", post),{
            password:req.body.old
            })
        res.render('user', {error:"Password Changed"});
    
    }else{
        res.render('user', {error:"Incorrect Paswword"});
    }
    
});

module.exports = router;
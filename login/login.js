const express = require('express');
const auth = require('../_middleware/auth');
const { async } = require('@firebase/util');
const { access } = require('./access');
const router = express.Router();
router.use(express.json());

router.get('/', async (req,res) => {

    res.render('login');
    
});
 
// When redirected to /login, grab the user id from req.body and insert
// it into firestore query, returning the user with that id, making sure
// password and username match
  
router.post('/login', access, async (req,res)=>{

  res.render('forum', {popup:res.locals.token});
  
});

module.exports = router;
const db = require('../startup/database'); 
const {doc, getDoc, getDocs , where, query, collection, setDoc} = require('firebase/firestore');
const express = require('express');
const router = express.Router();
const {Storage} = require('@google-cloud/storage');
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({
      extended: true
    }));


router.get('/', async (req,res) => {

      res.render('register');
});

router.post('/add', async (req,res)=>{

      try{
            
            const idRef = doc(db, 'users', req.body.id);
            const id = await getDoc(idRef);

            if (id.exists) {
                  const q = query(collection (db, 'users'), where("user_name", "==", req.body.user_name));
                  
                  const user = await getDocs(q);

                  if(!user.exists){


                        await setDoc(doc(db, "users", req.body.id),{
                              password: req.body.password,
                              user_name: req.body.user_name   
                        })

                        

                        res.render('login', {error: "USER SUCCESSFULLY CREATED!"});

                  }else{
                        res.render('register', {error: "Username already exists"});
            
                  }

            } else {
                  res.render('register', {error: "ID already exists"});
            }
      }catch(err) { res.send(console.log(err))};
      
});


module.exports = router;
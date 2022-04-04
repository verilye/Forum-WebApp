const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {

      res.render('register');
});

router.post('/add', async (req,res)=>{
      
      console.log(req);

      const db = getFirestore();
      const idRef = db.collection('users');

      try{

            const id = await idRef.doc(req.body.id).get();

            if (!id.exists) {

                  const userQuery = idRef.where('user_name', '==', req.body.user_name).get();

                  const user = await userQuery;

                  console.log("bing");

                  if(!user.exists){

                        console.log("bong");

                        db.collection("users").doc(req.body.id).set({
                              password: req.body.password,
                              user_name: req.body.user_name   
                        })

                        console.log("bung");

                        res.render('register', {error: "USER SUCCESSFULLY CREATED!"});

                  }else{
                        res.render('register', {error: "Username already exists"});
                        console.log("2");
                  }

            } else {
                  res.render('register', {error: "ID already exists"});
                  console.log("1");
            }
      }catch(err) { res.send(console.log(err))};
      
});

module.exports = router;
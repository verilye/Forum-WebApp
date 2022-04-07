const firebase = require('../startup/database'); 
const {getStorage, ref, uploadString} =require("firebase/storage"); 
const storage = getStorage();
const storageRef = ref(storage); 
const folderRef = ref(storageRef, 'images');
global.XMLHttpRequest = require("xhr2"); 
const db = require('../startup/database'); 
const {doc, getDoc, getDocs , where, query, collection, setDoc} = require('firebase/firestore');
const {Storage} = require('@google-cloud/storage');

const registerUser = async (req, res, next) => {
      

    try{
            
        const idRef = doc(db, 'users', req.body.id);
        const id = await getDoc(idRef);
            
        if (id._document == null) {
              const q = query(collection (db, 'users'), where("user_name", "==", req.body.user_name));
              
              const user = await getDocs(q);
              console.log(user.size);
              if(user.size == 0){


                    await setDoc(doc(db, "users", req.body.id),{
                          password: req.body.password,
                          user_name: req.body.user_name   
                    })

                    

                    next();

              }else{
                    res.render('register', {error: "Username already exists"});
        
              }

        } else {
              res.render('register', {error: "ID already exists"});
        }
  }catch(err) { res.send(console.log(err))};
}
module.exports = {
    registerUser
}
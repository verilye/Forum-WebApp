const db = require('../_startup/database'); 
const {doc, addDoc,updateDoc, collection} = require('firebase/firestore');
const { v4: uuidv4 } = require('uuid');
const {getStorage,ref, uploadBytesResumable, getDownloadURL} =require("firebase/storage"); 
global.XMLHttpRequest = require("xhr2"); 
const jwt = require("jsonwebtoken");
const config =require('config');

const addPost = async (req, res, next) => {
   
    try{

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).end()
        }

        payload = jwt.verify(token, config.get('jwtPrivateKey'));
        
        const docRef = await addDoc(collection(db, "posts"),{
            subject:req.body.subject,
            msg: req.body.msg,
            postedBy:payload.user,
            date: new Date()
        });

        try{

            filename = `${uuidv4()}.png`;

            const metadata = {
                contentType: 'image/jpeg'
              };

            const storage = getStorage();

            const storageRef = ref(storage, 'images/'+filename );
                
    
            uploadBytesResumable(storageRef, req.file.buffer, metadata).then((snapshot) => {
                
                getDownloadURL(storageRef).then((url) => {
                    
                    updateDoc(doc(db, "posts", docRef.id),{
                        pic:url 
                    });
                    
                    next();
            
                });
            });
        
        }catch(err){
            console.log(err);
        }
       
    }catch(err){
        console.log(err);
    }
}


module.exports = {
      addPost
  }
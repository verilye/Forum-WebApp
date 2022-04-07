const db = require('../startup/database'); 
const {doc, updateDoc} = require('firebase/firestore');
const {getStorage, ref, uploadString, getDownloadURL} =require("firebase/storage"); 
const storage = getStorage();
const storageRef = ref(storage); 
const folderRef = ref(storageRef, 'images');
global.XMLHttpRequest = require("xhr2"); 
const addImage = async (req, res, next) => {
    try {
        
        const file = req.file;        
        const timestamp = Date.now();
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}_${timestamp}.${type}`;        
        const imageRef = ref(folderRef,fileName); 

        const metadata ={
            contentType: 'image/jpeg',
        };

        const snapshot = uploadString(imageRef,metadata).then((snapshot) => {
               
            const url = getDownloadURL(imageRef).then((url) => {
            
                updateDoc(doc(db, "users", req.body.id),{
                    pic: url  
                    });
            });
        });
        
        

        

        res.render('login', {error: "USER SUCCESSFULLY CREATED!"});
        
            
    }  catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
}
module.exports = {
    addImage
}
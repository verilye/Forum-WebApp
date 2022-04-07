const db = require('../startup/database'); 
const { v4: uuidv4 } = require('uuid');
const {doc, updateDoc} = require('firebase/firestore');
const {getStorage, ref, uploadBytesResumable, getDownloadURL} =require("firebase/storage"); 

global.XMLHttpRequest = require("xhr2"); 



const addImage = async (req, res, next) => {

    const storage = getStorage();

    const metadata = {
        contentType: 'image/jpeg'
      };
    

    const storageRef = ref(storage, 'images/'+ `${uuidv4()}.png`);

    const uploadTask = uploadBytesResumable(storageRef, req.file.buffer, metadata).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
            updateDoc(doc(db, "users", req.body.id),{
                pic:url 
            });
        });
    });
                    
                

    res.render('login', {error: "USER SUCCESSFULLY CREATED!"});
    
}
module.exports = {
    addImage
}
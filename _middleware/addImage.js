const db = require('../_startup/database'); 
const { v4: uuidv4 } = require('uuid');
const {doc, updateDoc} = require('firebase/firestore');
const {getStorage, ref, uploadBytesResumable, getDownloadURL} =require("firebase/storage"); 
global.XMLHttpRequest = require("xhr2"); 

const addImage = async (req, res, next) => {

    const storage = getStorage();

    const metadata = {
        contentType: 'image/jpeg'
      };
    
    filename = `${uuidv4()}.png`;

    const storageRef = ref(storage, 'images/'+filename );

    uploadBytesResumable(storageRef, req.file.buffer, metadata).then((snapshot) => {
        console.log(snapshot.name);
        getDownloadURL(storageRef).then((url) => {
            updateDoc(doc(db, "users", req.body.id),{
                pic:url 
            });
        });
    });
                    
    console.log("Doneski")

    next();
};

module.exports = {
    addImage
}
const db = require('../startup/database'); 
const {doc, updateDoc} = require('firebase/firestore');
const {getStorage, ref, uploadBytesResumable, getDownloadURL} =require("firebase/storage"); 

global.XMLHttpRequest = require("xhr2"); 



const addImage = async (req, res, next) => {

    const storage = getStorage();

    const metadata = {
        contentType: 'image/jpeg'
      };
    
    console.log("recieved "+ res.locals.fileName);

    const file = '../public/images/'+ res.locals.fileName;

    const storageRef = ref(storage, 'images/'+ res.locals.fileName);

    const uploadTask = uploadBytesResumable(storageRef, req.file.buffer, metadata);

    uploadTask.on('state_changed', (snapshot) => {}, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            updateDoc(doc(db, "users", req.body.id),{
                                pic: url  
                                });
        });
    }
    );

    res.render('login', {error: "USER SUCCESSFULLY CREATED!"});
    
}
module.exports = {
    addImage
}
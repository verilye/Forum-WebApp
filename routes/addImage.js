const firebase = require('../startup/database'); 
const {getStorage, ref, uploadString} =require("firebase/storage"); 
const storage = getStorage();
const storageRef = ref(storage); 
const folderRef = ref(storageRef, 'images');
global.XMLHttpRequest = require("xhr2"); 
const addImage = async (req, res) => {
    try {
        
        const file = req.file;        
        const timestamp = Date.now();
        const name = file.originalname.split(".")[0];
        const type = file.originalname.split(".")[1];
        const fileName = `${name}_${timestamp}.${type}`;        
        const imageRef = ref(folderRef,fileName); 
        const message =name;
        const snapshot = uploadString(imageRef, message).then((snapshot) => {
                console.log("Uploaded a string");
            })
        
        res.send("Uploaded");
    }  catch (error) {
        console.log (error)
        res.status(400).send(error.message);
    }
}
module.exports = {
    addImage
}
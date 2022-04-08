const express = require('express');
const multer = require('multer');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../startup/database'); 
const { v4: uuidv4 } = require('uuid');
const {doc, setDoc, orderBy, limit, collection, query, where, collectionGroup, getDocs} = require('firebase/firestore');
const {getStorage, ref, uploadBytesResumable, getDownloadURL} =require("firebase/storage"); 
const fs = require('fs');

global.XMLHttpRequest = require("xhr2"); 


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(bodyParser.urlencoded({
    extended: true
  }));

router.get('/', async (req,res) => {

    try{

        const messages =[];

        const postsRef =collection(db, "posts");

        const q = query(postsRef, orderBy('date'), limit(10));

        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) =>{

            messages.push(doc.data());

        });
        //console.log(posts);

       res.render('forum', {messages:messages});

    } catch (err) {
        console.log(err);
    }


});




router.post('/submit', upload.single('attachment'), async (req,res) => {

    

   const storage = getStorage();

    const metadata = {
        contentType: 'image/jpeg'
    };
    
    filename = `${uuidv4()}.png`;
    post = `${uuidv4()}`;


    const storageRef = ref(storage, 'images/'+filename );

    setDoc(doc(db, "posts", post),{
        subject:req.body.subject,
        msg: req.body.msg,
        date: new Date()
        })
    if(req.body.attachment == null){

        fs.readFile('id.txt', 'utf8' , (err, data) => {

            const removed = data.replaceAll('"', '');

            res.render('forum', {user_name: removed, error:"POST SUBMITTED"});
    
        });       
    }else{

    const uploadTask = uploadBytesResumable(storageRef, req.file.buffer, metadata).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
        updateDoc(doc(db, "posts", post),{
            attachment:url  
            })

            fs.readFile('id.txt', 'utf8' , (err, data) => {

                const removed = data.replaceAll('"', '');

                res.redirect('/forum');
        
            });       
        });
    });

    }    
   
});


// const storage = getStorage();
//     const pathReference = ref(storage, 'images/'+ docSnap.data().pic);

//     getDownloadURL(pathReference)
//       .then((url) =>{

//         const img = this.document.getElementById('profile-pic');
//          img.setAttribute('src', url);

module.exports = router;
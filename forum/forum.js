const express = require('express');
const router = express.Router();
const db = require('../_startup/database'); 
const { v4: uuidv4 } = require('uuid');
const {doc, setDoc, orderBy, limit, collection, query, where, collectionGroup, getDocs, updateDoc} = require('firebase/firestore');
const {getStorage, ref, uploadBytesResumable, getDownloadURL} =require("firebase/storage"); 
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const config =require('config');

//On load, display the last 10 posts and display the user image and name

router.use(cookieParser());

router.get('/', async (req,res) => {


    const token = req.cookies.token;

    if (!token) {
		return res.status(401).end()
	}


    const messages =[];

    const postsRef =collection(db, "posts");

    const q = query(postsRef, orderBy('date', 'desc'), limit(10));

    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) =>{

        messages.push(JSON.stringify(doc.data())); 

    });

    payload = jwt.verify(token, config.get('jwtPrivateKey'));

    console.log(payload);
    
    res.render('forum', {
        popup:payload.user,
        messages:messages
    });
});




router.post('/submit', async (req,res) => {

        const messages =[];

        const postsRef =collection(db, "posts");

        const q = query(postsRef, orderBy('date'), limit(10));

        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) =>{

            messages.push(JSON.stringify(doc.data()));

        });
        //console.log(posts);

    
    try{


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

    }catch(err){
        res.redirect('/forum');
    }
});    


// const storage = getStorage();
//     const pathReference = ref(storage, 'images/'+ docSnap.data().pic);

//     getDownloadURL(pathReference)
//       .then((url) =>{

//         const img = this.document.getElementById('profile-pic');
//          img.setAttribute('src', url);

module.exports = router;
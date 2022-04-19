const express = require('express');
const router = express.Router();
const db = require('../_startup/database'); 
const {orderBy, limit, collection, query, where, collectionGroup, getDocs, updateDoc} = require('firebase/firestore');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const config =require('config');
const { addPost } = require('./addPost');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

router.use(express.json());
router.use(express.urlencoded({extended: true})); 

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

    
    res.render('forum', {
        user_name:payload.user,
        messages:messages
    });
    
});

router.post('/submit', upload, addPost, async (req,res)=>{

    res.redirect('/forum');

});



module.exports = router;
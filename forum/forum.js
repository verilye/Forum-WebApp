const express = require('express');
const router = express.Router();
const db = require('../_startup/database'); 
const {orderBy, limit, collection, query, where, collectionGroup, getDocs, updateDoc, startAfter, endBefore, limitToLast} = require('firebase/firestore');
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


    const postsRef =collection(db, "posts");


    if(req.query.next == undefined){
        if(req.query.previous ==undefined){

            var q = query(postsRef, orderBy('date', 'desc'), limit(3));

        }
        else{
        
        const obj = JSON.parse(req.query.previous);

        var q = query(postsRef, orderBy('date', 'desc'), limitToLast(3), endBefore(obj.date));

        }
    }else{

        const obj = JSON.parse(req.query.next);

        var q = query(postsRef, orderBy('date', 'desc'), limit(3), endBefore(obj.date));
         

    }


    const querySnapshot = await getDocs(q);


    const messages =[];
    
    querySnapshot.forEach((doc) =>{


        const message ={
            msg:doc.data().msg,
            subject:doc.data().subject,
            postedBy:doc.data().postedBy,
            pic:doc.data().pic,
            date:doc.data().date.seconds
        }

        messages.push(message); 

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
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {addImage} = require('../_middleware/addImage');
const {doc, getDoc, getDocs , where, query, collection, setDoc} = require('firebase/firestore');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single('image');

router.use(express.json());


router.get('/', async (req,res) => {

      res.render('register');
});

// REGISTER USER
// MIDDLEWARE IS IMPLEMENTED IN THE WRONG ORDER CURRENTLY!

router.post('/add', upload, addImage, async(req,res)=>{

      try{
            
            const idRef = doc(db, 'users', req.body.id);
            const id = await getDoc(idRef);
                
            if (id._document == null) {
                  const q = query(collection (db, 'users'), where("user_name", "==", req.body.user_name));
                  
                  const user = await getDocs(q);
                  console.log(user.size);
                  if(user.size == 0){
    
    
                        await setDoc(doc(db, "users", req.body.id),{
                              password: req.body.password,
                              user_name: req.body.user_name   
                        })
    
                        
    
                        next();
    
                  }else{
                        res.render('register', {error: "Username already exists"});
            
                  }
    
            }else {
                  res.render('register', {error: "ID already exists"});
            }
      }catch(err) { res.send(console.log(err))};
});


module.exports = router;
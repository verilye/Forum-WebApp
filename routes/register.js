const express = require('express');
const router = express.Router();
const multer = require('multer');
const {registerUser } = require('./registerUser');
const {addImage} = require('../middleware/addImage');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single('image');

router.use(express.json());

router.use(bodyParser.urlencoded({
      extended: true
    }));


router.get('/', async (req,res) => {

      res.render('register');
});

// REGISTER USER
// MOVE CONTENTS OF registerUser.js to here

router.post('/add', upload, registerUser, addImage);


module.exports = router;
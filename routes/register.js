const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const {registerUser } = require('./registerUser');
const {addImage} = require('./addImage');
global.XMLHttpRequest = require("xhr2"); 

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single('image');

router.use(express.json());

router.use(bodyParser.urlencoded({
      extended: true
    }));


router.get('/', async (req,res) => {

      res.render('register');
});

router.post('/add', upload, registerUser, addImage);


module.exports = router;
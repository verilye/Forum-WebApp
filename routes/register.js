const express = require('express');
const multer = require('multer');
const {addImage} = require('./addImage');
const router = express.Router();
const bodyParser = require('body-parser');
const { registerUser } = require('./registerUser');
global.XMLHttpRequest = require("xhr2"); 

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).single('file');

router.use(express.json());

router.use(bodyParser.urlencoded({
      extended: true
    }));


router.get('/', async (req,res) => {

      res.render('register');
});

router.post('/add', upload, registerUser, addImage);


module.exports = router;
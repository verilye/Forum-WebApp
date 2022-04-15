global.XMLHttpRequest = require("xhr2"); 
const express = require('express');
const router = express.Router();
const {addImage} = require('../_middleware/addImage');
const multer = require('multer');
const {addUser} = require("./addUser");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

router.use(express.json());
router.use(express.urlencoded({extended: true})); 

router.get('/', async (req,res) => {

      res.render('register');
});

// REGISTER USER

router.post('/', upload, addUser, addImage);

    
module.exports = router;
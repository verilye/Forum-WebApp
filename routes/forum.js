const express = require('express');
const multer = require('multer');
const {addImage} = require('./addImage');
const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.get('/', async (req,res) => {

    res.render('forum');
});

module.exports = router;
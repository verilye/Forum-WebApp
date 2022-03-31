const express = require('express');
const {Storage} = require('@google-cloud/storage');
const router = express.Router();
const storage = new Storage();

router.use(express.static(__dirname));

router.get('/', async (req,res) => {

      res.sendFile(__dirname + "/login.html");
});

module.exports = router;
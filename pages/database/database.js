const express = require('express');
const {Storage} = require('@google-cloud/storage');
const router = express.Router();
const storage = new Storage();

router.use(express.static(__dirname));

router.get('/database', async (req,res) => {

    try {
        const results = await storage.getBuckets();
    
        const [buckets] = results;
    
        console.log('Buckets:');
        buckets.forEach(bucket => {
          console.log(bucket.name);
        });
      } catch (err) {
        console.error('ERROR:', err);
      }

      res.sendFile(__dirname + "/index.html");
});

module.exports = router;
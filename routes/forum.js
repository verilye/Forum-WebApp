const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {

    res.render('forum');
});

router.post('/add', async (req,res)=>{
    uploadImage();
});

function uploadImage(){

    const ref = firebase.storage.ref()

    const file = document.querySelector("#photo").files[0]

    const name = new Date() + '-' + file.name

    const metadata ={
      contentType:file.type
    }

    const task = ref.child(name).put(file,metadata)

    task
    .then(snapshot => snapshot.ref.getDownloadUrl())
    .then(url =>{
        console.log(url)
        alert("Image Upload Successful")
    })
  }

module.exports = router;
const path = require('path');
const Resize = require('./Resize.js');

const uploadImage = async (req, res, next) => {

    const imagePath = path.join(__dirname, '../public/images');
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
    }
    const filename = await fileUpload.save(req.file.buffer);
    console.log({ name: filename });
    res.locals.filename = filename;
    next();


}

module.exports = {
    uploadImage
}
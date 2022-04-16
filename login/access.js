const db = require('../_startup/database'); 
const {doc, getDoc } = require('firebase/firestore');
const jwt = require('jsonwebtoken');
const config =require('config');


const access = async (req, res, next) => {

        const idRef = doc(db, 'users', req.body.id);
        const docSnap = await getDoc(idRef);

        if (docSnap._document == null) 
        {res.render('login', {error: "ID or password is invalid"});} 
        
        if(docSnap.data().user_name != req.body.user_name )
        {res.render('login', {error: "ID or password is invalid"});}
        
        if (docSnap.data().password != req.body.password)
        {res.render('login', {error: "ID or password is invalid"});}
        

        const user = docSnap.data().user_name;

        const token = jwt.sign({user}, config.get('jwtPrivateKey'));

        res.locals.token = token;

        next();
}

module.exports = {
    access
}
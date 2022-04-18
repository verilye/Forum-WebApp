const bcrypt = require('bcrypt');
const db = require('../_startup/database'); 
const {doc, getDoc } = require('firebase/firestore');
const jwt = require('jsonwebtoken');
const config =require('config');


const access = async (err,req, res, next) => {

        const idRef = doc(db, 'users', req.body.id);
        const docSnap = await getDoc(idRef);

        if (docSnap._document == null) 
        {res.render('login', {error: "ID or password is invalid"});} 
        
        if(docSnap.data().user_name != req.body.user_name )
        {res.render('login', {error: "ID or password is invalid"});}

        const salt = docSnap.data().salt;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const pass = docSnap.data().password;

        console.log(pass);
        console.log(hashedPassword);

        if(hashedPassword == pass){
            
            const user = docSnap.data().user_name;

            const token = jwt.sign({user}, config.get('jwtPrivateKey'));
    
            res.locals.token = token;
    
            next();

        }else{

            res.render('login', {error: "ID or password is invalid"}); 

        }        
}

module.exports = {
    access
}
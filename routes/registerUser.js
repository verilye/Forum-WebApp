//    THIS MODULE SHOULD BE IN THE MAIN ROUTE FILE
//    AS USUAL ADD VALIDATION







const db = require('../startup/database'); 
const {doc, getDoc, getDocs , where, query, collection, setDoc} = require('firebase/firestore');

const registerUser = async (req, res, next) => {
      

    try{
            
        const idRef = doc(db, 'users', req.body.id);
        const id = await getDoc(idRef);
            
        if (id._document == null) {
              const q = query(collection (db, 'users'), where("user_name", "==", req.body.user_name));
              
              const user = await getDocs(q);
              console.log(user.size);
              if(user.size == 0){


                    await setDoc(doc(db, "users", req.body.id),{
                          password: req.body.password,
                          user_name: req.body.user_name   
                    })

                    

                    next();

              }else{
                    res.render('register', {error: "Username already exists"});
        
              }

        } else {
              res.render('register', {error: "ID already exists"});
        }
  }catch(err) { res.send(console.log(err))};
}
module.exports = {
    registerUser
}
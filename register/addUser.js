const db = require('../_startup/database'); 
const {doc, getDoc, getDocs , where, query, collection, setDoc} = require('firebase/firestore');

const addUser = async (req, res, next) => {
      
      try{

            const idRef = doc(db, 'users', req.body.id);
            const id = await getDoc(idRef);
                  
            if (id._document == null) {
                  const q = query(collection (db, 'users'), where("user_name", "==", req.body.user_name));
                  
                  const user = await getDocs(q);

                  if(user.size == 0){


                        await setDoc(doc(db, "users", req.body.id),{
                              password: req.body.password,
                              user_name: req.body.user_name   
                        })

                        next();

                  }else{
                        res.render('register', {popup: "Username already exists"});
            
                  }

            }else {
                  res.render('register', {popup: "ID already exists"});
            }
      }catch(err) { res.send(console.log(err))};
}



module.exports = {
      addUser
  }
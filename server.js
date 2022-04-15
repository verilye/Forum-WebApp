const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");


require('./_startup/config')();
require('./_startup/database');
require('./_startup/routes')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


// To add -
// hook processes up to sequential routes etc. login -> auth -> render forum page 
// salt and hash passwords
// error handling
// unit testing (JEST)
// secret keys
// jwt authentication
// startup classes - check for jwt, clean up database init 
// implement error module in routes file
// implement front end validation
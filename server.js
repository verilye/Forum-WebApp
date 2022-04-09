const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded());

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");


//To add -
// salt and has passwords
// error handling and loggin (WINSTON)
// unit testing (JEST)
// environment variables
// secret keys
// jwt authentication
// implement models, views and controllers
// startup classes - check for jwt, clean up database init, 
// implement error module in routes file
// implement front and and back end validation
// change view engine from pug to ecjs

require('./startup/database');
require('./startup/routes')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

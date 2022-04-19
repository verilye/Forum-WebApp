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
// unit testing (JEST)
// JWT MIDDLEWARE
// implement error module in routes file
// Display user details
// Display forum posts
// Make it look good
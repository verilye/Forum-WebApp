const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "pug");


require('./startup/database')();
require('./startup/routes')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

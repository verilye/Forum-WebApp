const error = require('../_middleware/error');
const login = require('../login/login');
const register = require('../register/register');
const forum = require('../forum/forum');
const profile = require('../profile/profile');
const auth = require('../_middleware/auth');


module.exports = function(app){
    
    app.use('/', login);
    app.use('/register', register);
    app.use('/forum', forum);
    app.use('/profile', profile);
    app.use('/auth', auth);
    app.use(error);
    
}
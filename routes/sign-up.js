const { Router } = require('express');
const signupRouter = Router();
const {isGuest,isAuth,isAdmin} = require('../middlewares/login-check');
const validateSignup = require('../middlewares/formsValidation');
const signupController = require('../controllers/signupController');

signupRouter.get('/', 
        isGuest,
        (req, res) => {
    res.render('sign-up-form',{errors:[]});
});

signupRouter.post(
        '/',
        validateSignup.validSignup,
        signupController

);

module.exports = signupRouter;
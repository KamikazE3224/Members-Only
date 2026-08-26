const {Router} = require('express');
const loginRouter = Router();
const {isGuest} = require('../middlewares/login-check');
const loginController = require('../controllers/loginController');

loginRouter.get('/',
        isGuest,
        (req,res)=>{
        res.render('login');
})
loginRouter.post('/',loginController);


module.exports = loginRouter;
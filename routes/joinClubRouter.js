const {Router} = require('express');
const joinClubRouter = Router();
const {isAuth} = require('../middlewares/login-check');
const {validClubPasscode} = require('../middlewares/formsValidation');
const joinController = require('../controllers/joinClubController');

joinClubRouter.get('/',isAuth,(req,res)=>{
        res.render('joinclub',{errors:[]});
})
const { validationResult } = require('express-validator');

joinClubRouter.post(
    '/',
    isAuth,
    validClubPasscode,
    joinController

);
module.exports = joinClubRouter;
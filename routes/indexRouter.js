const path = require('node:path');
const {Router} = require('express');
const indexRouter = Router();
const {isAuth,isAdmin} = require('../middlewares/login-check');
const messageController = require('../controllers/messageController');
const deleteMessageController = require('../controllers/deleteController');
const {validateAdminPasscode,validClubPasscode} = require('../middlewares/formsValidation');
const {getBecomeAdmin,postBecomeAdmin} = require('../controllers/becomeAdminController');

const db = require('../db/queries');

indexRouter.get('/', async (req, res, next) => {
    try {
        const messages = await db.getAllMessages();

        res.render('index', {
            messages
        });
    } catch (err) {
        next(err);
    }
});


indexRouter.get('/new-message',isAuth,(req,res)=>{
        res.render('new-messages');
})
indexRouter.post('/new-message',isAuth,messageController);

indexRouter.get('/become-admin',isAuth,getBecomeAdmin);

indexRouter.post('/become-admin',isAuth,validateAdminPasscode,postBecomeAdmin);

indexRouter.post('/messages/:id/delete', isAdmin, deleteMessageController);


module.exports =  indexRouter;
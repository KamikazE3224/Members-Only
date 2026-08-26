const path = require('node:path');
const {Router} = require('express');
const indexRouter = Router();
const {isAuth} = require('../middlewares/login-check');
const messageController = require('../controllers/messageController');


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

module.exports =  indexRouter;
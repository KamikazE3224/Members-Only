const {Router} = require('express');
const logoutRouter = Router();

logoutRouter.get('/',(req,res)=>{
        req.logout((err)=>{
                if(err){
                        return next(err);
                }
                res.redirect('/');
        })
})
module.exports = logoutRouter;
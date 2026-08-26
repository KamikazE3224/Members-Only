const {validationResult} = require('express-validator');
const db = require('../db/queries');

async function joinClub(req,res){
        console.log(req.user);
        const errors = validationResult(req);
        if(!errors.isEmpty()){
                return res.render('joinclub',{errors:errors.array()})
        }
        try{
                await db.makeMember(req.user.id);
                res.redirect('/');
        }

        catch(err){
                console.log(err);
        }

}
module.exports = joinClub;
const {validateAdminPasscode} = require('../middlewares/formsValidation');
const db = require('../db/queries');
const { validationResult } = require('express-validator');

function getBecomeAdmin(req,res){
        res.render('become-admin',{errors:[]});
}

async function postBecomeAdmin(req,res){
        const errors = validationResult(req);

        if(!errors.isEmpty()){
                return res.render('become-admin',{errors:errors.array()});
        }
        try{
                await db.updateMemberStatus(req.user.id,'admin');
                res.redirect('/');

        }
        catch(err){
                console.log(err);
                res.status(500).send('something went wrong');
        }
}

module.exports = {
        getBecomeAdmin,
        postBecomeAdmin
}

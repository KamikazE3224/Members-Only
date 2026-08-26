const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const db = require('../db/queries');
//const passport = require('passport');

async function signup(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
                return res.render('sign-up-form',{errors:errors.array()})
        }

        const {first_name,last_name,username,password} = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        await db.createUser(first_name,last_name,username,hashedPassword);
        res.redirect('/');

}

module.exports = signup;

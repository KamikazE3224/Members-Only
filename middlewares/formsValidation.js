const { body } = require('express-validator');
const db = require('../db/queries');

const validSignup = [
    body('first_name')
        .trim()
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('name cannot contain numbers or special letters')
        .isLength({ min: 1, max: 20 })
        .withMessage('the name must be in 1 to 20 characters.'),

    body('last_name')
        .trim()
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage('name cannot contain numbers or special letters')
        .isLength({ min: 1, max: 20 })
        .withMessage('the last name must be in 1 to 20 characters.'),

    body('username')
        .trim()
        .isEmail()
        .withMessage('Enter a valid email address')
        .bail()
        .custom(async (value) => {
            const user = await db.getUserByUsername(value);

            if (user) {
                throw new Error('email already in use');
            }

            return true;
        }),

    body('password')
        .trim()
        .isLength({ min: 5 })
        .withMessage('the min limit for password is 5'),

    body('confirmPassword')
        .custom((value, { req }) => {
            return value === req.body.password;
        })
        .withMessage('password does not match')
];

const validClubPasscode = [
        body('passcode')
                .trim()
                .toLowerCase()
                .custom((value)=>{
                        const correctPasscode = process.env.SECRET;
                        if(value !== correctPasscode){
                                throw new Error('thats not the answer to the riddle');

                        }
                        return true;
                })
];

module.exports = {
        validSignup,
        validClubPasscode
};
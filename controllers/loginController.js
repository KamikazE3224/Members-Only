const passport = require('passport');

async function login(req,res,next){
        passport.authenticate('local',{
                successRedirect: '/',
                failureRedirect: '/log-in',
                failureMessage: true            
                }
        )(req, res, next);
}
 module.exports = login;
//custom 
// async function postLoginForm(req, res, next) {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.render("login", {
//         errors: [{ msg: info ? info.message : "Invalid credentials" }],
//         formData: req.body,
//       });
//     }
//     req.login(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect("/");
//     });
//   })(req, res, next);
// }
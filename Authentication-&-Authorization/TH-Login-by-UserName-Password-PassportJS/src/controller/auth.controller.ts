import passport from "passport";

class AuthController {
    constructor(){

    }

    checkLogin(req,res, next){
        passport.authenticate("local", (err, user) => {
            if(err){
                return next(err)
            }
            if(!user){
                return res.send("Wrong email or password")
            }
            req.login(user, () => {
                res.redirect("/book/list")
            })
        })(req, res, next)
    }
}

export default AuthController;
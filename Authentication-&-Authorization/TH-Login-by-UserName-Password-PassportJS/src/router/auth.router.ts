import express from "express";

const router = express.Router();

import passport from "passport";

import multer from 'multer';



const upload = multer();

// router.post("/login", passport.authenticate("local", {
//     failureRedirect: "/auth/login",
//     successRedirect: "/book/list"
// }));



router.get("/login", (req, res) => {

    // this will render login.ejs file


    res.render("login");

});



router.post('/login', upload.none(), (req, res, next) => {

    console.log(req.body)

    passport.authenticate("local", (err, user) => {

        if(err){

            return next(err)

        }

        if(!user){

            console.log(req.body)

            return res.send("Wrong email or password")

        }

        req.login(user, () => {
            res.redirect("/book/list")

        })

    })(req, res, next)

})

router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
})




export default router;
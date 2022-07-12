import express from "express";

const router = express.Router();

import passport from "passport";

import multer from 'multer';

const upload = multer();

import AuthContr from "../controller/auth.controller"


// router.post("/login", passport.authenticate("local", {
//     failureRedirect: "/auth/login",
//     successRedirect: "/book/list"
// }));
const authCtrl =  new AuthContr();


router.get("/login", (req, res) => {

    // this will render login.ejs file


    res.render("login");

});

router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}));



// Retrieve user data using the access token received

router.get(

    "/google/callback",

    passport.authenticate('google'),

    (req, res) => {

        res.redirect('http://localhost:3000/book/list')

    }

);



router.post('/login', upload.none(), (req, res, next) => {
   authCtrl.checkLogin(req,res,next);

})

router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/auth/login');
    });
});






export default router;
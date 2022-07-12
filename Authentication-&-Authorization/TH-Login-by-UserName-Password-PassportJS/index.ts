import express from "express";

import bodyParser from "body-parser";

import mongoose from "mongoose";

import bookRoutes from "./src/router/book.router";

import authRoutes from "./src/router/auth.router";

import passport from "./src/controller/passport";

import session from "express-session";

import auth from "./src/middleware/AuthMiddleWare"


const PORT = 3000;

const app = express();
app.set("view engine", "ejs");
app.set('views', './src/views');


const DB_URL = 'mongodb+srv://conbinhbe:123@modul4.a22t9.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URL)

    .then(() => console.log('DB Connected!'))

    .catch(error => console.log('DB connection error:', error.message));

app.use(bodyParser.json());

app.use(session({

    secret: 'SECRET',

    resave: false,

    saveUninitialized: true,

    cookie: { maxAge: 60 * 60 * 1000 }

}));




app.use(bodyParser.urlencoded({ extended: true }));


app.use(passport.initialize());

app.use(passport.session());


app.use(express.urlencoded({ extended: false }));

app.use('/book', auth.authCheck,bookRoutes);
app.use("/auth", authRoutes);


app.use((req,res,next)=>{
    res.status(400).render('error');
})






app.listen(PORT, () => {

    console.log("App running on port: " + PORT)

})

export default app;
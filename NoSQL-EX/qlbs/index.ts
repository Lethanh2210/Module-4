import express from "express";

import bodyParser from "body-parser";

import mongoose from "mongoose";

import bookRoutes from "./src/router/book.router";

import {logger} from "./src/logger/winston";

const errorToSlack = require('express-error-slack');



const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "ejs");

app.set('views', './src/views');

const DB_URL = 'mongodb+srv://conbinhbe:123@modul4.a22t9.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URL)

    .then(() => console.log('DB Connected!'))

    .catch(error => console.log('DB connection error:', error.message));


app.use('/book', bookRoutes);

// function errorMiddleware(err,req,res,next){
//     logger.error(err)
// }
//
// app.use(errorMiddleware);

app.get('/error', function (req, res, next) {
    const err = new Error('Internal Server Error')
    next(err)
})

app.use(errorToSlack({ webhookUri: 'https://hooks.slack.com/services/xoxe.xoxp-1-Mi0yLTM3ODQzNDIwNTI5MDAtMzc4MTg2NjcyNTY4My0zNzk0NTg3NTM1MDI1LTM4MDU2OTY2MTM3MTItZmE3NGIwOWE5YjA3OTc2YTJjMGVkMzczYjkzOGZiYTdlNmUxMTRiN2NiZDU3ZTIyZjhkNDNhNzgwMWY4NWVjMA' }))


app.listen(PORT, () => {

    console.log("App running on port: " + PORT)

})
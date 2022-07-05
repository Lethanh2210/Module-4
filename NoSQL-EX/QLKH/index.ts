import express from "express";

import bodyParser from "body-parser";

import mongoose from "mongoose";

import productRoutes from './src/router/User.router';



const PORT = 3000;

const app = express();

app.set("view engine", "ejs");

app.set('views', './src/views');

const DB_URL = 'mongodb+srv://conbinhbe:123@modul4.a22t9.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URL)

    .then(() => console.log('DB Connected!'))

    .catch(error => console.log('DB connection error:', error.message));

app.use(bodyParser.json());

app.use('/users', productRoutes);



app.listen(PORT, () => {

    console.log("App running on port: " + PORT)

})
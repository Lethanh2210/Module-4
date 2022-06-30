import express from "express";

import bodyParser from "body-parser";

const PORT = 3000;
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {

    res.end("<h1>Hello world!</h1>")

})


app.listen(PORT, () => {

    console.log("App running on port: "+ PORT)

})
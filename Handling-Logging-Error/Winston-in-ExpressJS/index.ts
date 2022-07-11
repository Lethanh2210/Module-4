import express from "express";

import bodyParser from "body-parser";

import { logger } from "./src/logger/winston";

import * as Sentry from "@sentry/node";

import * as Tracing from "@sentry/tracing";

const PORT = 3000;

const app = express();

app.use(bodyParser.json());

Sentry.init({

    dsn: "https://dcbbefa1081c407ea672433d6824fbe3@o1313393.ingest.sentry.io/6563495",

    integrations: [

        new Sentry.Integrations.Http({ tracing: true }),

        new Tracing.Integrations.Express({ app }),

    ],



    tracesSampleRate: 1.0,

});



app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());





app.get('/', (req, res,next) => {

    try {

        res.end("<h1>Hello winston!</h1>");

        throw new Error("Error test winston");

    } catch (err) {
        next(err);

        logger.error(err);

    }

})
app.use(Sentry.Handlers.errorHandler());

app.use(function onError(err, req, res, next) {

    res.statusCode = 500;

    res.end(res.sentry + "\n");

});



app.get("/debug-sentry", function mainHandler(req, res) {

    throw new Error("My first Sentry error!");

});



app.listen(PORT, () => {

    console.log("App running on port: " + PORT)

})

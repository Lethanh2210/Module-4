"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_router_1 = __importDefault(require("./src/router/book.router"));
const errorToSlack = require('express-error-slack');
const PORT = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', './src/views');
const DB_URL = 'mongodb+srv://conbinhbe:123@modul4.a22t9.mongodb.net/?retryWrites=true&w=majority';
mongoose_1.default.connect(DB_URL)
    .then(() => console.log('DB Connected!'))
    .catch(error => console.log('DB connection error:', error.message));
app.use('/book', book_router_1.default);
app.get('/error', function (req, res, next) {
    const err = new Error('Internal Server Error');
    next(err);
});
app.use(errorToSlack({ webhookUri: 'https://hooks.slack.com/services/xoxe.xoxp-1-Mi0yLTM3ODQzNDIwNTI5MDAtMzc4MTg2NjcyNTY4My0zNzk0NTg3NTM1MDI1LTM4MDU2OTY2MTM3MTItZmE3NGIwOWE5YjA3OTc2YTJjMGVkMzczYjkzOGZiYTdlNmUxMTRiN2NiZDU3ZTIyZjhkNDNhNzgwMWY4NWVjMA' }));
app.listen(PORT, () => {
    console.log("App running on port: " + PORT);
});
//# sourceMappingURL=index.js.map
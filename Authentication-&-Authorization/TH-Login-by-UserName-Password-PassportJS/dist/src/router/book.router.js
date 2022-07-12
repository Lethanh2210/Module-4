"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRoutes = (0, express_1.Router)();
const book_controller_1 = require("../controller/book.controller");
let bookContr = new book_controller_1.BookController();
bookRoutes.get('/list', (req, res, next) => {
    bookContr.showListBook(req, res).then();
});
bookRoutes.get('/add', (req, res, next) => {
    res.render('createBook');
});
bookRoutes.post('/add', async (req, res, next) => {
    bookContr.addBook(req, res, next).then();
});
exports.default = bookRoutes;
//# sourceMappingURL=book.router.js.map
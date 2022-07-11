"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const author_model_1 = require("../schemas/author.model");
const publisher_model_1 = require("../schemas/publisher.model");
const book_model_1 = require("../schemas/book.model");
const bookRoutes = (0, express_1.Router)();
const book_controller_1 = require("../controller/book.controller");
bookRoutes.get('/list', (req, res, next) => {
    let bookContr = new book_controller_1.BookController();
    bookContr.showListBook(req, res).then();
});
bookRoutes.get('/add', (req, res, next) => {
    res.render('createBook');
});
bookRoutes.post('/add', async (req, res, next) => {
    let author = new author_model_1.Author({
        name: req.body.author
    });
    await author.save();
    let publisher = new publisher_model_1.Publisher({
        name: req.body.publisher
    });
    await publisher.save();
    let book = new book_model_1.Book({
        title: req.body.title,
        name: req.body.name,
        author: author._id,
        publisher: publisher._id
    });
    book.keywords.push({ keyword: req.body.keyword });
    await book.save();
    res.redirect('/book/list');
});
exports.default = bookRoutes;
//# sourceMappingURL=book.router.js.map
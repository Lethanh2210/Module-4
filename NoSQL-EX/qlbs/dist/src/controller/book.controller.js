"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_model_1 = require("../schemas/book.model");
class BookController {
    constructor() {
    }
    async showListBook(req, res) {
        const books = await book_model_1.Book.find().populate({ path: "publisher", select: "name" }).populate({ path: "author", select: "name" });
        if (books) {
            res.render("listBook", { books: books });
        }
        else {
            res.send(404);
        }
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map
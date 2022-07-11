"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_model_1 = require("../schemas/book.model");
const author_model_1 = require("../schemas/author.model");
const publisher_model_1 = require("../schemas/publisher.model");
class BookController {
    constructor() {
    }
    async showListBook(req, res) {
        try {
            let query = {};
            if (req.query.keyword && req.query.keyword !== "") {
                let keywordFind = req.query.keyword || "";
                query = {
                    "keywords.keyword": {
                        $regex: keywordFind
                    }
                };
            }
            if (req.query.publisher && req.query.publisher !== "") {
                let authorFind = req.query.publisher || "";
                let publisher = await publisher_model_1.Publisher.findOne({ name: { $regex: authorFind } });
                query = Object.assign(Object.assign({}, query), { publisher: publisher });
            }
            if (req.query.author && req.query.author !== "") {
                let authorFind = req.query.author || "";
                console.log(authorFind);
                let author = await author_model_1.Author.findOne({ name: { $regex: authorFind } });
                query = Object.assign(Object.assign({}, query), { author: author });
            }
            const books = await book_model_1.Book.find(query).populate({
                path: "publisher", select: "name"
            }).populate({ path: "author", select: "name" });
            res.render("listBook", { books: books });
        }
        catch (_a) {
            res.render("error");
        }
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map
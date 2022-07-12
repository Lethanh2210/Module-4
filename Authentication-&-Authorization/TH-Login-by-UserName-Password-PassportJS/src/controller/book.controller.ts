import {Book} from "../schemas/book.model";
import {Author} from "../schemas/author.model";
import {Publisher} from "../schemas/publisher.model";

export class BookController{
    constructor() {
    }

    async showListBook(req,res){
        try {
            let query = {};
            if (req.query.keyword && req.query.keyword !== "") {
                let keywordFind = req.query.keyword || "";
                query = {
                    "keywords.keyword": {
                        $regex: keywordFind
                    }
                }
            }
            if (req.query.publisher && req.query.publisher !== "") {
                let authorFind = req.query.publisher || "";
                let publisher = await Publisher.findOne({name: { $regex: authorFind}})
                query = {
                    ...query,
                    publisher: publisher
                }
            }
            if (req.query.author && req.query.author !== "") {
                let authorFind = req.query.author || "";
                let author = await Author.findOne({name: { $regex: authorFind}})
                query = {
                    ...query,
                    author: author
                }
            }
            const books = await Book.find(query).populate({
                path: "publisher", select: "name"
            }).populate({path :"author",select: "name"});
            res.status(200).render("listBook", { books: books });
        } catch {
            res.render("error");
        }
    }

    async addBook(req,res,next) {
        let author = new Author({
            name: req.body.author
        })
        await author.save();

        let publisher = new Publisher({
            name: req.body.publisher
        });
        await publisher.save()
        let book = new Book({
            title: req.body.title,
            name: req.body.name,
            author: author._id,
            publisher: publisher._id
        })
        book.keywords.push({keyword: req.body.keyword});
        await book.save()
        res.redirect('/book/list');
    }

}
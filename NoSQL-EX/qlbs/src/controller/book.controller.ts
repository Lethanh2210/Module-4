import {Book} from "../schemas/book.model";
import {Author} from "../schemas/author.model";
import {Publisher} from "../schemas/publisher.model";

export class BookController{
    constructor() {
    }

    async showListBook(req,res){
        const books = await Book.find().populate({path :"publisher",select: "name"}).populate({path :"author",select: "name"});


        if(books){

            res.render("listBook", { books: books });
        }else{
            res.send(404);
        }
    }
}
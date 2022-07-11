import {Schema, model} from "mongoose";
import {Author} from "./author.model";
import {Publisher} from "./publisher.model";

// interface IBook {
//
//     title: string;
//
//     name: string;
//
//     author: any;
//
//     keywords: object[];
//
//     publisher: any;
//
// }

const keywordsSchema = new Schema({

    keyword: String

})

const bookSchema = new Schema({

    title: String,

    name: String,

    author: { type:Schema.Types.ObjectId, ref: "Author" },

    keywords: [keywordsSchema],

    publisher: { type:Schema.Types.ObjectId, ref: "Publisher" },

})


const Book = model('Book', bookSchema);



export { Book };
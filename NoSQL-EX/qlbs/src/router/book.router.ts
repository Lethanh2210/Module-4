import { Router } from 'express';
import {Author} from '../schemas/author.model'
import {Publisher} from '../schemas/publisher.model'
import {Book} from '../schemas/book.model'
const bookRoutes = Router();



import {BookController} from "../controller/book.controller";


bookRoutes.get('/list', (req, res) => {
    let bookContr = new BookController();
    bookContr.showListBook(req, res).then();
});
bookRoutes.get('/add', (req, res) => {
    res.render('createBook')
})
bookRoutes.post('/add', async(req, res) => {
    console.log(req.body)
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

})

export default bookRoutes
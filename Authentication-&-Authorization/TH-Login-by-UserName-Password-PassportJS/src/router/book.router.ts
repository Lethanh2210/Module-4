import { Router } from 'express';
import {Author} from '../schemas/author.model'
import {Publisher} from '../schemas/publisher.model'
import {Book} from '../schemas/book.model'
const bookRoutes = Router();
import {BookController} from "../controller/book.controller";
import auth from '../middleware/AuthMiddleWare'

let bookContr = new BookController();


bookRoutes.get('/list', (req, res,next) => {

    bookContr.showListBook(req, res).then();
});
bookRoutes.get('/add', (req, res,next) => {
    res.render('createBook')
})
bookRoutes.post('/add', async(req, res,next) => {
   bookContr.addBook(req, res,next).then();
})

export default bookRoutes
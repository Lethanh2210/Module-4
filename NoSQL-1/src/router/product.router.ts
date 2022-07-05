import { Router } from 'express';

const productRoutes = Router();

import { Product } from "../schemas/product.model";

import multer from 'multer';

const upload = multer();






productRoutes.get('/create', (req, res) => {

    res.render("createProduct");

});



productRoutes.post('/create', upload.none(), async (req, res) => {

    try {

        const productNew = new Product(req.body);

        const product = await productNew.save();

        if (product) {

            res.render("success");

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});



productRoutes.get('/list', async (req, res) => {


    try {

        let limit: number = 3;

        let offset: number;

        if(!req.query.offset) {

            offset = 0;

        } else {

            offset = parseInt(req.query.offset as string) ;

        }
        console.log(offset)

        const products = await Product.find().limit(limit).skip(limit*offset);

        res.render("listProduct", { products: products, offset: offset });

    } catch {

        res.render("error");

    }

});



export default productRoutes;
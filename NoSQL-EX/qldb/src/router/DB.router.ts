import { Router } from 'express';

const DBRouter = Router();

import { DB } from "../schemas/DB.model";

import multer from 'multer';

const upload = multer();






DBRouter.get('/create', (req, res) => {

    res.render("createDB");

});

DBRouter.get('/update/:id', async (req, res) => {

    try {

        const user = await DB.findOne({ _id: req.params.id });

        console.log(user, 'user')

        if (user) {

            res.render("update", {product: user})

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});

DBRouter.post('/update', upload.none(), async (req, res) => {

    try {

        const user = await DB.findOne({ _id: req.body.id });

        user.name = req.body.name;

        user.address = req.body.address;

        user.email = req.body.email;

        user.phone = req.body.phone;

        await user.save();

        if (user) {

            res.redirect('http://localhost:3000/users/list');

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});

DBRouter.delete('/delete/:id', async (req, res) => {

    try {

        const user = await DB.findOne({ _id: req.params.id });

        if (user) {

            await user.remove();

            res.status(200).json({ message: "success" });

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});



DBRouter.post('/create', upload.none(), async (req, res) => {

    try {

        const UserNew = new DB(req.body);

        const user = await UserNew.save();

        if (user) {

            res.redirect('http://localhost:3000/users/list');

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});



DBRouter.get('/list', async (req, res) => {


    try {

        let limit: number = 3;

        let offset: number;

        if(!req.query.offset) {

            offset = 0;

        } else {

            offset = parseInt(req.query.offset as string) ;

        }
        console.log(offset)

        const Users = await DB.find().limit(limit).skip(limit*offset);

        res.render("listDB", { DB: Users, offset: offset });

    } catch {

        res.render("error");

    }

});



export default DBRouter;
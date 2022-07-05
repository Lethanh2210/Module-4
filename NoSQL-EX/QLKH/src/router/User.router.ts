import { Router } from 'express';

const UserRouter = Router();

import { User } from "../schemas/User.model";

import multer from 'multer';

const upload = multer();






UserRouter.get('/create', (req, res) => {

    res.render("createUser");

});

UserRouter.get('/update/:id', async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.params.id });

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

UserRouter.post('/update', upload.none(), async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.body.id });

        user.name = req.body.name;

        user.MaSo = req.body.MaSo;

        user.email = req.body.email;

        user.phone = req.body.phone;

        await user.save();

        if (user) {

            res.render("success");

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});

UserRouter.delete('/delete/:id', async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.params.id });

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



UserRouter.post('/create', upload.none(), async (req, res) => {

    try {

        const UserNew = new User(req.body);

        const user = await UserNew.save();

        if (user) {

            res.render("success");

        } else {

            res.render("error");

        }

    } catch (err) {

        res.render("error");

    }

});



UserRouter.get('/list', async (req, res) => {


    try {

        let limit: number = 3;

        let offset: number;

        if(!req.query.offset) {

            offset = 0;

        } else {

            offset = parseInt(req.query.offset as string) ;

        }
        console.log(offset)

        const Users = await User.find().limit(limit).skip(limit*offset);

        res.render("listUser", { Users: Users, offset: offset });

    } catch {

        res.render("error");

    }

});



export default UserRouter;
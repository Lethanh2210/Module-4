"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DBRouter = (0, express_1.Router)();
const DB_model_1 = require("../schemas/DB.model");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
DBRouter.get('/create', (req, res) => {
    res.render("createDB");
});
DBRouter.get('/update/:id', async (req, res) => {
    try {
        const user = await DB_model_1.DB.findOne({ _id: req.params.id });
        console.log(user, 'user');
        if (user) {
            res.render("update", { product: user });
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
DBRouter.post('/update', upload.none(), async (req, res) => {
    try {
        const user = await DB_model_1.DB.findOne({ _id: req.body.id });
        user.name = req.body.name;
        user.address = req.body.address;
        user.email = req.body.email;
        user.phone = req.body.phone;
        await user.save();
        if (user) {
            res.redirect('http://localhost:3000/users/list');
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
DBRouter.delete('/delete/:id', async (req, res) => {
    try {
        const user = await DB_model_1.DB.findOne({ _id: req.params.id });
        if (user) {
            await user.remove();
            res.status(200).json({ message: "success" });
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
DBRouter.post('/create', upload.none(), async (req, res) => {
    try {
        const UserNew = new DB_model_1.DB(req.body);
        const user = await UserNew.save();
        if (user) {
            res.redirect('http://localhost:3000/users/list');
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
DBRouter.get('/list', async (req, res) => {
    try {
        let limit = 3;
        let offset;
        if (!req.query.offset) {
            offset = 0;
        }
        else {
            offset = parseInt(req.query.offset);
        }
        console.log(offset);
        const Users = await DB_model_1.DB.find().limit(limit).skip(limit * offset);
        res.render("listDB", { DB: Users, offset: offset });
    }
    catch (_a) {
        res.render("error");
    }
});
exports.default = DBRouter;
//# sourceMappingURL=DB.router.js.map
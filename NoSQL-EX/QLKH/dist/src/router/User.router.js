"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRouter = (0, express_1.Router)();
const User_model_1 = require("../schemas/User.model");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
UserRouter.get('/create', (req, res) => {
    res.render("createUser");
});
UserRouter.get('/update/:id', async (req, res) => {
    try {
        const user = await User_model_1.User.findOne({ _id: req.params.id });
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
UserRouter.post('/update', upload.none(), async (req, res) => {
    try {
        const user = await User_model_1.User.findOne({ _id: req.body.id });
        user.name = req.body.name;
        user.MaSo = req.body.MaSo;
        user.email = req.body.email;
        user.phone = req.body.phone;
        await user.save();
        if (user) {
            res.render("success");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
UserRouter.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User_model_1.User.findOne({ _id: req.params.id });
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
UserRouter.post('/create', upload.none(), async (req, res) => {
    try {
        const UserNew = new User_model_1.User(req.body);
        const user = await UserNew.save();
        if (user) {
            res.render("success");
        }
        else {
            res.render("error");
        }
    }
    catch (err) {
        res.render("error");
    }
});
UserRouter.get('/list', async (req, res) => {
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
        const Users = await User_model_1.User.find().limit(limit).skip(limit * offset);
        res.render("listUser", { Users: Users, offset: offset });
    }
    catch (_a) {
        res.render("error");
    }
});
exports.default = UserRouter;
//# sourceMappingURL=User.router.js.map
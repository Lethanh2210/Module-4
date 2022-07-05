"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRoutes = (0, express_1.Router)();
const product_model_1 = require("../schemas/product.model");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
productRoutes.get('/create', (req, res) => {
    res.render("createProduct");
});
productRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const productNew = new product_model_1.Product(req.body);
        const product = await productNew.save();
        if (product) {
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
productRoutes.get('/list', async (req, res) => {
    try {
        const products = await product_model_1.Product.find();
        res.render("listProduct", { products: products });
    }
    catch (_a) {
        res.render("error");
    }
});
exports.default = productRoutes;
//# sourceMappingURL=product.router.js.map
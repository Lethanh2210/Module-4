"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const auth_controller_1 = __importDefault(require("../controller/auth.controller"));
const authCtrl = new auth_controller_1.default();
router.get("/login", (req, res) => {
    res.render("login");
});
router.get('/login/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", passport_1.default.authenticate('google'), (req, res) => {
    res.redirect('http://localhost:3000/book/list');
});
router.post('/login', upload.none(), (req, res, next) => {
    authCtrl.checkLogin(req, res, next);
});
router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/auth/login');
    });
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map
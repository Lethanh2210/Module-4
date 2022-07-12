"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
class AuthController {
    constructor() {
    }
    checkLogin(req, res, next) {
        passport_1.default.authenticate("local", (err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send("Wrong email or password");
            }
            req.login(user, () => {
                res.redirect("/book/list");
            });
        })(req, res, next);
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = {
    authCheck: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        }
        else {
            res.redirect('/auth/login');
        }
    }
};
exports.default = auth;
//# sourceMappingURL=AuthMiddleWare.js.map
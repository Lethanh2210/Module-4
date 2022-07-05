"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const mongoose_1 = require("mongoose");
const dbSchema = new mongoose_1.Schema({
    name: String,
    address: String,
    email: String,
    phone: String
});
const DB = (0, mongoose_1.model)('DB', dbSchema);
exports.DB = DB;
//# sourceMappingURL=DB.model.js.map
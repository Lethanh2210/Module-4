"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorSchema = exports.Author = void 0;
const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
    name: String
});
exports.authorSchema = authorSchema;
const Author = mongoose.model('Author', authorSchema);
exports.Author = Author;
//# sourceMappingURL=author.model.js.map
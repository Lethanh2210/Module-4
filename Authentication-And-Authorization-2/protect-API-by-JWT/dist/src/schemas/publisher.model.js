"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const mongoose_1 = require("mongoose");
const PublisherSchema = new mongoose_1.Schema({
    name: String
});
const Publisher = (0, mongoose_1.model)('Publisher', PublisherSchema);
exports.Publisher = Publisher;
//# sourceMappingURL=publisher.model.js.map
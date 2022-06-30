"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./src/data-source");
const User_1 = require("./src/entity/User");
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const userRepository = connection.getRepository(User_1.User);
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get("/users", async function (req, res) {
        const users = await userRepository.find();
        res.json(users);
    });
    app.get("/users/:id", async function (req, res) {
        const results = await userRepository.findOneBy({ id: Number(req.params.id) });
        return res.send(results);
    });
    app.post("/users", async function (req, res) {
        const user = await userRepository.create(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });
    app.put("/users/:id", async function (req, res) {
        const user = await userRepository.findOneBy({ id: Number(req.params.id) });
        userRepository.merge(user, req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });
    app.delete("/users/:id", async function (req, res) {
        const results = await userRepository.delete(req.params.id);
        return res.send(results);
    });
    app.listen(3000);
});
//# sourceMappingURL=index.js.map
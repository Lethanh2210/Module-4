import { AppDataSource } from "./src/data-source";

import { Blog } from "./src/entity/Blog";

import multer from 'multer';

const upload = multer();

import express from "express";

import bodyParser from 'body-parser';



const PORT = 3000;



AppDataSource.initialize().then(async connection => {

    const app = express();

    app.set("view engine", "ejs");

    app.set("views", "./src/views");

    app.use(bodyParser.json());

    app.use(express.json());

    const blogRepo = connection.getRepository(Blog);
    app.get("/blog/create", (req, res) => {

        res.render("create");

    });

    app.post("/blog/create", async (req, res) => {
        try {
            const blogSearch = await blogRepo.findOneBy({ title: req.body.title });
            if (blogSearch) {
                res.status(500).json({
                    message: "Sản phẩm đã tồn tại"
                })
            }
            const blogData = {
                title: req.body.title,
                text: req.body.text,
            };
            const blog = await blogRepo.save(blogData);
            if (blog) {
                res.status(200).json({
                    message: "Create blog success",
                    blog: blog
                });
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    });

    app.get("/blog/detail", async (req, res) => {
        try {
            let blogId = String(req.query.id as string);
            const blog = await blogRepo.findOneBy({title: blogId});
            if (blog) {
                res.status(200).json({ message: "Success", blog })
            }
        } catch (err) {
            res.status(500).json({ message: err.mesage })
        }
    });

    app.get("/blog/list", async (req, res) => {
        try {
            const blogs = await blogRepo.find();
            if (blogs) {
                res.status(200).json({ message: "Success", blogs: blogs })
            }
        } catch (err) {
            res.status(500).json({ message: err.mesage })
        }
    });

    app.put("/blog/update", async (req, res) => {
        try {
            let blogSearch = await blogRepo.findOneBy({ id: req.body.id });
            if (!blogSearch) {
                res.status(500).json({
                    message: "Sản phẩm không tồn tại"
                })
            }
            const blog = await blogRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: "Update blog success",
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    });

    app.delete("/blog/delete", async (req, res) => {
        try {
            let blogSearch = await blogRepo.findOneBy({ id: req.body.id });
            if (!blogSearch) {
                res.status(500).json({
                    message: "Sản phẩm không tồn tại"
                })
            }
            const blog = await blogRepo.delete({ id: req.body.id });
            res.status(200).json({
                message: "Delete blog success",
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    });



    app.listen(PORT, () => {

        console.log("App running with port: " + PORT)

    })

});
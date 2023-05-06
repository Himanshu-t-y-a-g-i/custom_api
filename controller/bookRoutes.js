const express = require("express");
const { bookModel } = require("../model/book");

const bookRoutes = express.Router();

bookRoutes.get("/", async (req, res) => {
    const queries = req.query;
    console.log("Hello")
    const query = {};
    if (queries.category) {
        query.category = queries.category;
    }
    if (queries.author) {
        query.author = queries.author;
    }
    console.log(query)
    try {
        const data = await bookModel.find(query);
        res.send({ msg: data, response: "success" });
    } catch (e) {
        res.send({ msg: [], response: e.message });
    }
})

bookRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const data = await bookModel.findOne({ id });
        res.status(200).send({ msg: [data || {}], response: "success" });
    } catch (e) {
        res.send({ msg: [], response: e.message });
    }
})

bookRoutes.post("/", async (req, res) => {
    const { title, author, category, price, quantity } = req.body;
    if (title && author && category && price && quantity) {
        try {
            const preCheck = await bookModel.findOne({ title, author, category, price, quantity });
            if (preCheck) {
                res.status(400).send({ msg: [], response: "cannot add same product again" });
            } else {
                const newBook = new bookModel(req.body);
                await newBook.save();
                res.status(201).send({ msg: [req.body], response: "new product added" });
            }
        } catch (e) {
            res.send({ msg: [], response: e.message });
        }
    } else {
        res.status(400).send({ msg: [], response: "invalid data format" });
    }
})

bookRoutes.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {

    } catch (e) {
        res.send({ msg: [], response: e.message });
    }
})

bookRoutes.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await bookModel.findByIdAndDelete(id);
        res.status(202).send({ msg: [], response: "success" });
    } catch (e) {
        res.send({ msg: [], response: e.message });
    }
})

module.exports = { bookRoutes };
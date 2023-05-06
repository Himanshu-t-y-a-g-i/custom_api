const express = require("express");
const { bookModel } = require("../model/book");

const bookRoutes = express.Router();

bookRoutes.get("/", async (req, res) => {
    try {
        const data = await bookModel.find();
        console.log(data);
        res.send({ msg: [data], response: "success" });
    } catch (e) {
        console.log(e, "error");
        res.status(400).send({ msg: [], response: e.message });
    }
})

module.exports = { bookRoutes };
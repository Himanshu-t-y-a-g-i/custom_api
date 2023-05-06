const express = require("express");
const { orderModel } = require("../model/order");

const orderRoutes = express.Router();

orderRoutes.get("/", async (req, res) => {
    try {
        const data = await orderModel.find();
        console.log(data);
        res.send({ msg: [data], response: "success" });
    } catch (e) {
        console.log(e, "error");
        res.status(400).send({ msg: [], response: e.message });
    }
})

module.exports = { orderRoutes };
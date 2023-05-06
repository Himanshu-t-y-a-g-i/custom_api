const express = require("express");
const { userModel } = require("../model/user");

const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
    try {
        const data = await userModel.find();
        res.send({ msg: [data], response: "success" });
    } catch (e) {
        console.log(e, "error");
        res.status(400).send({ msg: [], response: e.message });
    }
})

module.exports = { userRoutes };
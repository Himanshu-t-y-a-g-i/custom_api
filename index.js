const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userRoutes } = require("./controller/userRoutes");
const { userModel } = require("./model/user");
const { connection } = require("./utils/db");
const { orderRoutes } = require("./controller/orderRoutes");
const { bookRoutes } = require("./controller/bookRoutes");
const { verify } = require("./middleware/adminVerification");
const { verifyOrder } = require("./middleware/orderVerification");
const app = express();
app.use(express.json());
app.get("/", async (req, res) => {
    res.send("Welcome to custom API documentation");
})

app.post("/register", async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    if (name && email && password) {
        try {
            const userCheck = await userModel.findOne({ email });
            if (userCheck) {
                res.status(400).send({ msg: [], response: "user is already registered" });
            } else {
                const encrypted = bcrypt.hashSync(password, 5);
                const newUser = new userModel({ name, email, password: encrypted, isAdmin });
                await newUser.save();
                res.status(201).send({ msg: [], response: "user has been registered" });
            }
        } catch (e) {
            res.status(400).send({ msg: [], response: e.message })
        }
    } else {
        res.status(400).send({ msg: [], response: "all details required" });
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        try {
            const userCheck = await userModel.findOne({ email });
            console.log(userCheck);
            if (userCheck) {
                const passCheck = bcrypt.compare(password, userCheck.password);
                if (passCheck) {
                    res.status(201).send({ msg: [], response: "user logged in", token: jwt.sign({ isAdmin: userCheck.isAdmin, userId: userCheck._id }, "custom_api") });
                } else {
                    res.status(400).send({ msg: [], response: "incorrect password" });
                }
            } else {
                res.status(400).send({ msg: [], response: "invalid credentials" });
            }
        } catch (e) {

        }
    } else {
        res.status(400).send({ msg: [], response: "all details required" });
    }
})
app.use(verify);
app.use("/books", bookRoutes);
app.use(verifyOrder);
app.use("/orders", orderRoutes);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("DB connection established");
    } catch (e) {
        console.log(e, "DB error");
    }
    console.log("Server is live at port 7700");
})
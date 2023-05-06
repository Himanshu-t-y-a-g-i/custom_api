const express = require("express");
const dotenv = require("dotenv").config();
const { userRoutes } = require("./controller/userRoutes");
const { userModel } = require("./model/user");
const { connection } = require("./utils/db");
const { orderRoutes } = require("./controller/orderRoutes");
const { bookRoutes } = require("./controller/bookRoutes");
const app = express();
app.use(express.json());
app.get("/", async (req, res) => {
    res.send("Welcome to custom API documentation");
})

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
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
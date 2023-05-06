const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user: Object,
    books: Array,
    totalAmount: Number
})

const orderModel = mongoose.model("order", schema);

module.exports = { orderModel };
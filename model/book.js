const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number
})

const bookModel = mongoose.model("book", schema);

module.exports = { bookModel };

obj = {
    "title": "A horror story",
    "author": "Dave",
    "category": "Horror",
    "price": 432,
    "quantity": 2
}
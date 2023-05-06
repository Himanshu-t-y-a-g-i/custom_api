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

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjp0cnVlLCJ1c2VySWQiOiI2NDU2MTJhZDM2N2ZhZmVjMzQ4YmU5ODUiLCJpYXQiOjE2ODMzNjkyMTF9.Foq-1yqXwzbdawgGZ7VBqjVMUMStdkahwZrzU0xjM2Q
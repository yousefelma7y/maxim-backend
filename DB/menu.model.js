const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    }
}, {timestamps: true});


const menuModel = mongoose.model("menu", menuSchema);

module.exports = menuModel;
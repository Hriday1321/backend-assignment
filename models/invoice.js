const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number
    },
    misc: {
        type: String
    }
});

const invoiceSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    due: {
        type: Date
    },
    items: [itemSchema],
    notes: {
        type: String
    },
    status: {
        type: String,
        default: "due"
    }
});

module.exports = mongoose.model("invoice", invoiceSchema);
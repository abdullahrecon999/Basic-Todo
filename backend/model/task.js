const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "checked"],
        default: "active"
    },
    checkedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
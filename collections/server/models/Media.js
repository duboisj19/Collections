const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    id: { type: String, required: true },
    imageUrl: { type: String, required: true },
    collectionsId: { type: mongoose.Schema.Types.ObjectId, ref: "Collections" },
    webUrl: {type: String, required: true},

});

module.exports = mongoose.model("Media", MediaSchema);

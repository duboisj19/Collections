const mongoose = require("mongoose");

const RecentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    id: { type: String, required: true },
    imageUrl: { type: String, required: true },
    webUrl: { type: String, required: true },

});

module.exports = mongoose.model("Recent", RecentSchema);

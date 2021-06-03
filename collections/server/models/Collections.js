const mongoose = require("mongoose");

const CollectionsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },

});

module.exports = mongoose.model("Collections", CollectionsSchema);

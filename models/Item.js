const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  task: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;

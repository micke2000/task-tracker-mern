const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
  },
  desc: {
    type: String,
    default: "No description",
  },
  status: {
    type: String,
    enum: ["active", "finished"],
    default: "active",
  },
});

module.exports = mongoose.model("Task", taskSchema);

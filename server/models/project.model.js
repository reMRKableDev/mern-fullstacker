const { Schema, model } = require("mongoose");
const User = require("./user.model");

const projectSchema = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" }, // owner will be added later on
});

module.exports = model("Project", projectSchema);

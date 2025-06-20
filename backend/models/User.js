// backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
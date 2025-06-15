// backend/models/TimeSlot.js
const mongoose = require("mongoose");

const TimeSlotSchema = new mongoose.Schema({
  dayOfWeek: { type: String, required: true }, // "T2", "T3", etc.
  period: { type: String, required: true }, // "Sang", "Chieu", "Toi"
  maxStudents: { type: Number, required: true, default: 5 },
  currentStudents: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("TimeSlot", TimeSlotSchema);
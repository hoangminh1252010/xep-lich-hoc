// backend/routes/timeSlotRoutes.js
const express = require("express");
const router = express.Router();
const TimeSlot = require("../models/TimeSlot");

// Lấy danh sách các buổi học
router.get("/", async (req, res) => {
  try {
    const timeSlots = await TimeSlot.find({ isActive: true });
    res.json(timeSlots);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Tạo buổi học mới (cho admin)
router.post("/", async (req, res) => {
  try {
    const timeSlot = new TimeSlot(req.body);
    await timeSlot.save();
    res.status(201).json(timeSlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
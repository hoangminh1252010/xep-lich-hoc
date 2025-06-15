// backend/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const TimeSlot = require("../models/TimeSlot");

// Lấy danh sách booking của học viên
router.get("/my-bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId })
      .populate('timeSlotId');
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Đặt lịch học
router.post("/", async (req, res) => {
  try {
    const { timeSlotId } = req.body;
    
    // Kiểm tra số lượng học viên
    const timeSlot = await TimeSlot.findById(timeSlotId);
    if (!timeSlot || !timeSlot.isActive) {
      return res.status(400).json({ message: "Buổi học không tồn tại hoặc đã bị vô hiệu hóa" });
    }
    
    if (timeSlot.currentStudents >= timeSlot.maxStudents) {
      return res.status(400).json({ message: "Buổi học đã đủ số lượng học viên" });
    }
    
    // Kiểm tra xem học viên đã đặt buổi này chưa
    const existingBooking = await Booking.findOne({
      userId: req.user.userId,
      timeSlotId: timeSlotId
    });
    
    if (existingBooking) {
      return res.status(400).json({ message: "Bạn đã đặt buổi học này" });
    }
    
    // Tạo booking mới
    const booking = new Booking({
      userId: req.user.userId,
      timeSlotId: timeSlotId
    });
    
    await booking.save();
    
    // Cập nhật số lượng học viên
    timeSlot.currentStudents += 1;
    await timeSlot.save();
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Hủy lịch học
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy lịch học" });
    }
    
    if (booking.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Không có quyền hủy lịch học này" });
    }
    
    // Cập nhật số lượng học viên
    const timeSlot = await TimeSlot.findById(booking.timeSlotId);
    timeSlot.currentStudents -= 1;
    await timeSlot.save();
    
    await booking.remove();
    res.json({ message: "Hủy lịch học thành công" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
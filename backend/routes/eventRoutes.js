const express = require("express");
const router = express.Router();
const { 
  proposeEvent, 
  reviewEvent, 
  getEvents, 
  registerForEvent, 
  getRegistrations 
} = require("../controllers/eventController");
const { protect, organizerOnly, adminOnly } = require("../middleware/authMiddleware");

// Public/Student
router.get("/", getEvents);

// Organizer/Admin
router.post("/", protect, organizerOnly, proposeEvent);
router.get("/:id/registrations", protect, getRegistrations);

// Admin
router.patch("/:id/approve", protect, adminOnly, reviewEvent);

// Student Registration
router.post("/:id/register", protect, registerForEvent);

module.exports = router;

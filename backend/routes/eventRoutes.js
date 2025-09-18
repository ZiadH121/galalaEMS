const express = require("express");
const router = express.Router();
const { proposeEvent, reviewEvent, getEvents } = require("../controllers/eventController");
const { protect, organizerOnly, adminOnly } = require("../middleware/authMiddleware");

// Public/Student
router.get("/", getEvents);

// Organizer/Admin
router.post("/", protect, organizerOnly, proposeEvent);

// Admin
router.patch("/:id/approve", protect, adminOnly, reviewEvent);

module.exports = router;

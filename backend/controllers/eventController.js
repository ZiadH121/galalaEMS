const Event = require("../models/Event");

// @desc   Submit event proposal
// @route  POST /api/events
// @access Organizer/Admin
const proposeEvent = async (req, res) => {
  const { title, description, date, location, category, capacity } = req.body;

  try {
    const event = await Event.create({
      title,
      description,
      date,
      location,
      category,
      capacity,
      status: "pending",
      createdBy: req.user._id
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Approve or reject event
// @route  PATCH /api/events/:id/approve
// @access Admin
const reviewEvent = async (req, res) => {
  const { status } = req.body; // expected: "approved" or "rejected"

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    event.status = status;
    await event.save();

    res.json({ message: `Event ${status}`, event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get events
// @route  GET /api/events
// @access Public (students), Protected (organizers/admins see more)
const getEvents = async (req, res) => {
  try {
    let events;

    if (req.user && req.user.role === "admin") {
      // Admin sees everything
      events = await Event.find().populate("createdBy", "name email role");
    } else if (req.user && req.user.role === "organizer") {
      // Organizer sees their own events
      events = await Event.find({ createdBy: req.user._id }).populate("createdBy", "name email role");
    } else {
      // Public/Students only see approved events
      events = await Event.find({ status: "approved" }).populate("createdBy", "name");
    }

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Register student for event
// @route  POST /api/events/:id/register
// @access Student
const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.status !== "approved") return res.status(400).json({ message: "Event not open for registration" });

    // Check capacity
    if (event.capacity > 0 && event.registrations.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Prevent duplicate registration
    if (event.registrations.includes(req.user._id)) {
      return res.status(400).json({ message: "Already registered" });
    }

    event.registrations.push(req.user._id);
    await event.save();

    res.json({ message: "Registration successful", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get registrations for an event
// @route  GET /api/events/:id/registrations
// @access Organizer/Admin
const getRegistrations = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("registrations", "name email");

    if (!event) return res.status(404).json({ message: "Event not found" });

    // Only creator or admin can see registrations
    if (req.user.role !== "admin" && event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json({ registrations: event.registrations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { proposeEvent, reviewEvent, getEvents, registerForEvent, getRegistrations };

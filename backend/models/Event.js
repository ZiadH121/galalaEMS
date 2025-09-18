const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { 
      type: String, 
      enum: ["trip", "sports", "movie", "recruitment", "academic", "cultural", "other"], 
      default: "other" 
    },
    capacity: { type: Number, default: 0 },
    status: { 
      type: String, 
      enum: ["pending", "approved", "rejected", "archived"], 
      default: "pending" 
    },
    createdBy: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

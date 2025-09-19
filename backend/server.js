const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(morgan("dev"));
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Backend ping route for UptimeRobot pings to keep backend alive, remove this when system has a dedicated backend hosting.
app.get("/ping", (req, res) => {
  console.log(`[UptimeRobot] Ping received at ${new Date().toISOString()}`);
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

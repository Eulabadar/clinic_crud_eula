require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

/* ================== CORS (VERY IMPORTANT) ================== */
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "https://magnificent-trifle-1e1e63.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// Preflight
app.options("*", cors());

/* =========================================================== */

app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Test endpoints
app.get("/", (req, res) => {
  res.send("Clinic API is running...");
});

app.get("/version", (req, res) => {
  res.json({ ok: true, version: "CORS-OK" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);

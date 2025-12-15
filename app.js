// ===============================
// IMPORTS
// ===============================
const express = require("express");
const mongoose = require("mongoose");

// Routes
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

// ===============================
// 🔥 FORCE CORS (FINAL FIX)
// ===============================
app.use((req, res, next) => {
  const origin = req.headers.origin;

  const allowedOrigins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "https://monstera-6dcf01.netlify.app"
  ];

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ===============================
// BODY PARSER
// ===============================
app.use(express.json());

// ===============================
// TEST ENDPOINT (IMPORTANT)
// ===============================
app.get("/version", (req, res) => {
  res.json({
    ok: true,
    service: "clinic-api",
    cors: "working"
  });
});

// ===============================
// API ROUTES
// ===============================
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// ===============================
// DATABASE CONNECTION
// ===============================
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ===============================
// SERVER START
// ===============================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

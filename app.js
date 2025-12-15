// ===============================
// LOAD ENV
// ===============================
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// ===============================
// INIT APP
// ===============================
const app = express();

// ===============================
// CORS (FIXED FOR LOCALHOST + NETLIFY)
// ===============================
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "https://magnificent-trifle-1e1e63.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: preflight
app.options("*", cors());

// ===============================
// BODY PARSER
// ===============================
app.use(express.json());

// ===============================
// DB
// ===============================
const connectDB = require("./config/db");
connectDB();

// ===============================
// ROUTES
// ===============================
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// ===============================
// TEST ROUTE (OPTIONAL)
// ===============================
app.get("/", (req, res) => {
  res.send("✅ Clinic API is running");
});

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

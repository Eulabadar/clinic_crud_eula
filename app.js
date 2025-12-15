require("dotenv").config({
  path: require("path").join(__dirname, ".env"),
  override: true,
});

const express = require("express");
const connectDB = require("./config/db");

// ROUTES
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

/* =====================================================
   🔥 BRUTE-FORCE CORS (GUARANTEED)
   ===================================================== */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

/* =====================================================
   MIDDLEWARE
   ===================================================== */
app.use(express.json());

/* =====================================================
   🔎 VERSION CHECK (DEBUG)
   ===================================================== */
app.get("/version", (req, res) => {
  res.json({ ok: true, version: "CORS-TEST-1" });
});

/* =====================================================
   API ROUTES
   ===================================================== */
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

/* =====================================================
   ROOT
   ===================================================== */
app.get("/", (req, res) => {
  res.send("Clinic API is running...");
});

/* =====================================================
   START SERVER
   ===================================================== */
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

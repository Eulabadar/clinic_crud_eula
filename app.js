require("dotenv").config({
  path: require("path").join(__dirname, ".env"),
  override: true,
});

console.log("ENV FILE:", require("path").join(__dirname, ".env"));
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("PORT =", process.env.PORT);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// Connect DB
connectDB();

const app = express();

/* =========================
   TEMP: ALLOW ALL CORS
   (for testing only)
========================= */
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.get("/", (req, res) => {
  res.send("Clinic API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

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

/* =======================
   ENABLE CORS (IMPORTANT)
======================= */
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "https://monstera-6dcf01.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

/* =========
   ROUTES
========= */
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

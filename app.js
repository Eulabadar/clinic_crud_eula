const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

/* =====================================================
   ✅ FINAL CORS CONFIG (NO MORE ERRORS)
   Allows:
   - localhost
   - ALL netlify.app domains
   - Postman / curl
===================================================== */
app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools
      if (!origin) return callback(null, true);

      // allow localhost
      if (
        origin.startsWith("http://localhost") ||
        origin.startsWith("http://127.0.0.1")
      ) {
        return callback(null, true);
      }

      // allow ALL Netlify apps
      if (origin.endsWith(".netlify.app")) {
        return callback(null, true);
      }

      return callback(new Error("❌ CORS blocked: " + origin));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

// ✅ REQUIRED FOR PREFLIGHT (VERY IMPORTANT)
app.options("*", cors());

/* =====================================================
   MIDDLEWARES
===================================================== */
app.use(express.json());

/* =====================================================
   DATABASE
===================================================== */
connectDB();

/* =====================================================
   ROUTES
===================================================== */
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

/* =====================================================
   HEALTH CHECK
===================================================== */
app.get("/", (req, res) => {
  res.send("✅ Clinic API is running");
});

/* =====================================================
   SERVER
===================================================== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();

/* =====================================================
   ✅ CORS CONFIG (MUST BE BEFORE ROUTES)
   ===================================================== */
const allowedOrigins = [
  // Local development
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:5500",
  "http://127.0.0.1:5500",

  // ✅ Netlify frontends (ADD ALL YOU USE)
  "https://magnificent-trifle-1e1e63.netlify.app",
  "https://enchanting-licorice-1deb1a.netlify.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests without origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("❌ CORS blocked: " + origin));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ REQUIRED FOR PREFLIGHT REQUESTS
app.options("*", cors());

/* =====================================================
   Middlewares
   ===================================================== */
app.use(express.json());

/* =====================================================
   Database
   ===================================================== */
connectDB();

/* =====================================================
   Routes
   ===================================================== */
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Clinic API is running...");
});

/* =====================================================
   Server
   ===================================================== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

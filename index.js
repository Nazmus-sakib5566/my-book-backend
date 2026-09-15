const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// ============================
// DATABASE
// ============================
connectDB();

// ============================
// MIDDLEWARE
// ============================
app.use(cors());
app.use(express.json());

// ============================
// ROUTES
// ============================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "My Book API is running",
  });
});

app.use("/api/books", require("./routes/bookRoutes"));

// ============================
// SERVER
// ============================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
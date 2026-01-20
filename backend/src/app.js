const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();

const app = express();

/* ✅ CORS MUST COME FIRST */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://ivoryrentcar-1.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* ✅ Explicitly handle preflight */
app.options("*", cors());

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    dailyRate: { type: Number, required: true, min: 0 },
    seats: { type: Number, default: 4 },
    transmission: { type: String, enum: ["Auto", "Manual"], default: "Auto" },
    fuelType: { type: String, default: "Petrol" },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);

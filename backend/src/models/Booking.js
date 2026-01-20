const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },

    pickupDateTime: { type: Date, required: true },
    returnDateTime: { type: Date, required: true },
    pickupLocation: { type: String, required: true, trim: true },

    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    serviceOptionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],

    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);

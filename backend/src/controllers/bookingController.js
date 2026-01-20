const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicles");
const Service = require("../models/Service");
const { sendEmail } = require("../utils/email");
const { sendSms } = require("../utils/sms");

function normalizePhone(p) {
  const s = String(p || "").trim();
  if (s.startsWith("+")) return s;
  if (s.startsWith("0")) return "+94" + s.slice(1);
  return s;
}

exports.createBooking = async (req, res, next) => {
  try {
    const {
      fullName,
      phone,
      email,
      pickupDateTime,
      returnDateTime,
      pickupLocation,
      vehicleId,
      serviceOptionIds = [],
    } = req.body;

    if (!fullName || !phone || !email || !pickupDateTime || !returnDateTime || !pickupLocation || !vehicleId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const pickup = new Date(pickupDateTime);
    const ret = new Date(returnDateTime);
    if (isNaN(pickup.getTime()) || isNaN(ret.getTime())) {
      return res.status(400).json({ message: "Invalid pickup/return date" });
    }
    if (ret <= pickup) {
      return res.status(400).json({ message: "Return date/time must be after pickup date/time" });
    }

    const vehicle = await Vehicle.findById(vehicleId).lean();
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const booking = await Booking.create({
      fullName,
      phone: normalizePhone(phone),
      email,
      pickupDateTime: pickup,
      returnDateTime: ret,
      pickupLocation,
      vehicleId,
      serviceOptionIds,
      status: "pending",
    });

    const services = await Service.find({ _id: { $in: serviceOptionIds } }).lean();
    const serviceNames = services.map((s) => s.name).join(", ") || "None";

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPhone = process.env.ADMIN_PHONE;

    const subject = `New Booking: ${vehicle.title}`;
    const messageText =
`Booking Details:
Name: ${fullName}
Phone: ${normalizePhone(phone)}
Email: ${email}
Pickup: ${pickup.toLocaleString()}
Return: ${ret.toLocaleString()}
Pickup Location: ${pickupLocation}
Vehicle: ${vehicle.title}
Services: ${serviceNames}
Status: pending`;

    try {
      if (adminEmail) await sendEmail(adminEmail, subject, messageText);
      if (email) await sendEmail(email, "Your Booking Request Received", messageText);

      if (adminPhone) await sendSms(adminPhone, `NEW BOOKING: ${vehicle.title} - ${fullName} ${normalizePhone(phone)}`);
      if (phone) await sendSms(normalizePhone(phone), `Booking received for ${vehicle.title}. We will contact you soon.`);
    } catch (notifyErr) {
      console.error("Notify failed:", notifyErr.message);
    }

    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  }
};

exports.listBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate("vehicleId", "title category dailyRate imageUrl")
      .populate("serviceOptionIds", "name price")
      .lean();

    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

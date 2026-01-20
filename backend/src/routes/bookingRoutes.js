const router = require("express").Router();
const {
  createBooking,
  listBookings,
} = require("../controllers/bookingController");

// Customer create booking
router.post("/", createBooking);

// Admin list bookings (temporarily public while you finish auth)
// later we will protect it with requireAuth + requireAdmin
router.get("/", listBookings);

module.exports = router;

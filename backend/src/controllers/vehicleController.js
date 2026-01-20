const Vehicle = require("../models/Vehicles");

async function createVehicle(req, res) {
  const body = req.body;

  const imageUrl = req.file ? `/uploads/vehicles/${req.file.filename}` : "";
  const vehicle = await Vehicle.create({ ...body, imageUrl });

  res.status(201).json(vehicle);
}

async function getVehicles(req, res) {
  const { available } = req.query;

  const filter = {};
  if (available === "true") filter.isAvailable = true;

  const list = await Vehicle.find(filter).sort({ createdAt: -1 });
  res.json(list);
}

async function getVehicleById(req, res) {
  const v = await Vehicle.findById(req.params.id);
  if (!v) return res.status(404).json({ message: "Vehicle not found" });
  res.json(v);
}

async function updateVehicle(req, res) {
  const body = req.body;
  const update = { ...body };

  if (req.file) update.imageUrl = `/uploads/vehicles/${req.file.filename}`;

  const v = await Vehicle.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!v) return res.status(404).json({ message: "Vehicle not found" });
  res.json(v);
}

async function deleteVehicle(req, res) {
  const v = await Vehicle.findByIdAndDelete(req.params.id);
  if (!v) return res.status(404).json({ message: "Vehicle not found" });
  res.json({ ok: true });
}

module.exports = { createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle };

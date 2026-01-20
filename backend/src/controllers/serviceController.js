const Service = require("../models/Service");

async function createService(req, res) {
  const s = await Service.create(req.body);
  res.status(201).json(s);
}

async function getServices(req, res) {
  const list = await Service.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(list);
}

async function updateService(req, res) {
  const s = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!s) return res.status(404).json({ message: "Service not found" });
  res.json(s);
}

async function deleteService(req, res) {
  const s = await Service.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
  if (!s) return res.status(404).json({ message: "Service not found" });
  res.json({ ok: true });
}

module.exports = { createService, getServices, updateService, deleteService };

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BookingPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const preselectedVehicleId = query.get("vehicleId");

  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    pickupDateTime: "",
    returnDateTime: "",
    pickupLocation: "",
    vehicleId: preselectedVehicleId || "",
    serviceOptionIds: [],
  });

  const selectedVehicle = useMemo(
    () => vehicles.find(v => v._id === form.vehicleId),
    [vehicles, form.vehicleId]
  );

  useEffect(() => {
    (async () => {
      const [vRes, sRes] = await Promise.all([
        api.get("/vehicles"),
        api.get("/services"),
      ]);
      setVehicles(vRes.data || []);
      setServices(sRes.data || []);
    })();
  }, []);

  const toggleService = (id) => {
    setForm(prev => ({
      ...prev,
      serviceOptionIds: prev.serviceOptionIds.includes(id)
        ? prev.serviceOptionIds.filter(x => x !== id)
        : [...prev.serviceOptionIds, id],
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.email || !form.pickupDateTime || !form.returnDateTime || !form.pickupLocation || !form.vehicleId) {
      alert("Please fill all required fields");
      return;
    }

    await api.post("/bookings", form);

    alert("Booking submitted! We will contact you soon.");

    // ✅ redirect back to home from ANY location
    navigate("/");
  };

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>Book Now</h1>

      {selectedVehicle && (
        <p style={{ opacity: 0.8 }}>
          Selected Vehicle: <b>{selectedVehicle.title}</b>
        </p>
      )}

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <label>Pickup Date/Time</label>
        <input type="datetime-local" value={form.pickupDateTime} onChange={(e) => setForm({ ...form, pickupDateTime: e.target.value })} />

        <label>Return Date/Time</label>
        <input type="datetime-local" value={form.returnDateTime} onChange={(e) => setForm({ ...form, returnDateTime: e.target.value })} />

        <input placeholder="Pickup Location" value={form.pickupLocation} onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })} />

        <label>Vehicle</label>
        <select value={form.vehicleId} onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}>
          <option value="">Select vehicle...</option>
          {vehicles.map(v => (
            <option key={v._id} value={v._id}>
              {v.title} — LKR {Number(v.dailyRate || 0).toLocaleString()}/day
            </option>
          ))}
        </select>

        <label>Service Options</label>
        <div style={{ display: "grid", gap: 6 }}>
          {services.map(s => (
            <label key={s._id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={form.serviceOptionIds.includes(s._id)}
                onChange={() => toggleService(s._id)}
              />
              {s.name} (LKR {Number(s.price || 0).toLocaleString()})
            </label>
          ))}
        </div>

        <button type="submit" style={{ padding: 12, marginTop: 8 }}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

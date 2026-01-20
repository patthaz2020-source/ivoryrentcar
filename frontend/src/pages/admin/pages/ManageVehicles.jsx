import { useEffect, useState } from "react";
import { api } from "../../../api/api";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [seats, setSeats] = useState("");
  const [transmission, setTransmission] = useState("Auto");
  const [fuelType, setFuelType] = useState("Petrol");
  const [description, setDescription] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await api.get("/vehicles");
    setVehicles(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDailyRate("");
    setSeats("");
    setTransmission("Auto");
    setFuelType("Petrol");
    setDescription("");
    setIsAvailable(true);
    setImageFile(null);
    setEditingId(null);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!title || !category || !dailyRate) return alert("Title, category, dailyRate required");

    const form = new FormData();
    form.append("title", title);
    form.append("category", category);
    form.append("dailyRate", dailyRate);
    form.append("seats", seats || 4);
    form.append("transmission", transmission);
    form.append("fuelType", fuelType);
    form.append("description", description);
    form.append("isAvailable", String(isAvailable));

    if (imageFile) form.append("image", imageFile);

    if (editingId) {
      await api.put(`/vehicles/${editingId}`, form, { headers: { "Content-Type": "multipart/form-data" } });
    } else {
      await api.post("/vehicles", form, { headers: { "Content-Type": "multipart/form-data" } });
    }

    resetForm();
    load();
  };

  const edit = (v) => {
    setEditingId(v._id);
    setTitle(v.title);
    setCategory(v.category);
    setDailyRate(String(v.dailyRate));
    setSeats(String(v.seats || 4));
    setTransmission(v.transmission || "Auto");
    setFuelType(v.fuelType || "Petrol");
    setDescription(v.description || "");
    setIsAvailable(!!v.isAvailable);
    setImageFile(null);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete vehicle?")) return;
    await api.delete(`/vehicles/${id}`);
    load();
  };

  return (
    <div>
      <h1>Manage Vehicles</h1>

      <form onSubmit={submit} style={card}>
        <h3>{editingId ? "Edit Vehicle" : "Add Vehicle"}</h3>

        <input placeholder="Title (Toyota Prius)" value={title} onChange={(e) => setTitle(e.target.value)} style={input} />
        <input placeholder="Category (Car/Van)" value={category} onChange={(e) => setCategory(e.target.value)} style={input} />

        <input placeholder="Daily Rate" value={dailyRate} onChange={(e) => setDailyRate(e.target.value)} style={input} />
        <input placeholder="Seats" value={seats} onChange={(e) => setSeats(e.target.value)} style={input} />

        <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
          <select value={transmission} onChange={(e) => setTransmission(e.target.value)} style={input}>
            <option>Auto</option>
            <option>Manual</option>
          </select>
          <input placeholder="Fuel Type" value={fuelType} onChange={(e) => setFuelType(e.target.value)} style={input} />
        </div>

        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...input, minHeight: 80 }} />

        <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
          Available
        </label>

        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button style={btnPrimary}>{editingId ? "Update" : "Create"}</button>
          <button type="button" onClick={resetForm} style={btn}>Clear</button>
        </div>
      </form>

      <div style={card}>
        <h3>Vehicle List</h3>
        <table width="100%" cellPadding="8">
          <thead>
            <tr>
              <th align="left">Image</th>
              <th align="left">Title</th>
              <th align="left">Category</th>
              <th align="left">Rate</th>
              <th align="left">Available</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v._id}>
                <td>
                {v.imageUrl ? (
  <img
    src={`http://localhost:5005${v.imageUrl}`}
    alt="vehicle"
    style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 8 }}
  />
) : (
  "-"
)}

                </td>
                <td>{v.title}</td>
                <td>{v.category}</td>
                <td>{v.dailyRate}</td>
                <td>{v.isAvailable ? "Yes" : "No"}</td>
                <td align="right">
                  <button onClick={() => edit(v)} style={btn}>Edit</button>{" "}
                  <button onClick={() => remove(v._id)} style={btnDanger}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const card = { background: "white", padding: 16, borderRadius: 12, marginBottom: 20 };
const input = { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc", marginBottom: 10 };
const btnPrimary = { padding: "10px 14px", borderRadius: 8, border: "none", background: "#111", color: "white", cursor: "pointer" };
const btn = { padding: "8px 12px", borderRadius: 8, border: "1px solid #aaa", cursor: "pointer" };
const btnDanger = { padding: "8px 12px", borderRadius: 8, border: "none", background: "#d11", color: "white", cursor: "pointer" };

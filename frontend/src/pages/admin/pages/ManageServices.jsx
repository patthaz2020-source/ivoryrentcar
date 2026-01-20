import { useEffect, useState } from "react";
import { api } from "../../../api/api";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setEditingId(null);
  };

  const submit = async (e) => {
    e.preventDefault();

    const payload = { name, price: Number(price || 0), description };

    if (!name) return window.alert("Service name required");


    if (editingId) {
      await api.put(`/services/${editingId}`, payload);
    } else {
      await api.post("/services", payload);
    }

    resetForm();
    load();
  };

  const edit = (s) => {
    setEditingId(s._id);
    setName(s.name);
    setPrice(String(s.price));
    setDescription(s.description || "");
  };

  const remove = async (id) => {
    if (!window.confirm("Delete service?")) return;
    await api.delete(`/services/${id}`);
    load();
  };

  return (
    <div>
      <h1>Manage Services</h1>

      <form onSubmit={submit} style={card}>
        <h3>{editingId ? "Edit Service" : "Add Service"}</h3>

        <input placeholder="Service name" value={name} onChange={(e) => setName(e.target.value)} style={input} />
        <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} style={input} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={input} />

        <div style={{ display: "flex", gap: 10 }}>
          <button style={btnPrimary}>{editingId ? "Update" : "Create"}</button>
          <button type="button" onClick={resetForm} style={btn}>
            Clear
          </button>
        </div>
      </form>

      <div style={card}>
        <h3>Service List</h3>
        <table width="100%" cellPadding="8">
          <thead>
            <tr>
              <th align="left">Name</th>
              <th align="left">Price</th>
              <th align="left">Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.price}</td>
                <td>{s.description}</td>
                <td align="right">
                  <button onClick={() => edit(s)} style={btn}>Edit</button>{" "}
                  <button onClick={() => remove(s._id)} style={btnDanger}>Delete</button>
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

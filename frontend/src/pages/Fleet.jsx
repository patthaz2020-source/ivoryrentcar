import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // or your api instance
import "../styles/fleet.css";

export default function Fleet() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/vehicles"); // CRA proxy adds /api if your base is /api
        setVehicles(res.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(vehicles.map(v => (v.category || "").toLowerCase()).filter(Boolean)));
    return [{ id: "all", name: "All Vehicles" }, ...unique.map(c => ({ id: c, name: c.toUpperCase() }))];
  }, [vehicles]);

  const filteredVehicles =
    selectedCategory === "all"
      ? vehicles
      : vehicles.filter(v => (v.category || "").toLowerCase() === selectedCategory);

  const bookNow = (vehicle) => {
    // ✅ pass vehicleId via query string
    navigate(`/book?vehicleId=${vehicle._id}`);
  };

  return (
    <div className="fleet">
      <section className="fleet-hero">
        <div className="container">
          <h1>Our Fleet</h1>
          <p>Choose from our wide selection of well-maintained vehicles</p>
        </div>
      </section>

      <section className="fleet-filter">
        <div className="container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="fleet-vehicles">
        <div className="container">
          {loading && <p>Loading vehicles...</p>}

          <div className="vehicles-grid">
            {filteredVehicles.map(v => (
              <div key={v._id} className="vehicle-card">
                <div className="vehicle-image">
                  {v.imageUrl ? (
                    <img
                      src={`http://localhost:5005${v.imageUrl}`}
                      alt={v.title}
                      style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 12 }}
                    />
                  ) : (
                    <div style={{ height: 180, display: "grid", placeItems: "center" }}>No Image</div>
                  )}
                </div>

                <div className="vehicle-content">
                  <h3>{v.title}</h3>
                  <p className="vehicle-type">{v.category}</p>

                  <div className="vehicle-footer">
                    <div className="vehicle-price">
                      <span className="price-label">From</span>
                      <span className="price-amount">LKR {Number(v.dailyRate || 0).toLocaleString()}</span>
                      <span className="price-period">/ day</span>
                    </div>

                    <button className="btn btn-primary" onClick={() => bookNow(v)}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredVehicles.length === 0 && (
            <div className="no-vehicles"><p>No vehicles found.</p></div>
          )}
        </div>
      </section>
    </div>
  );
}

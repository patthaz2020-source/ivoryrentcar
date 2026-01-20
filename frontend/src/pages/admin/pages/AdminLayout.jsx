import { Link, Outlet, useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../../../hooks/useAuth";

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = getUser();

  const logout = () => {
    clearAuth();
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 260, padding: 20, background: "#111", color: "#fff" }}>
        <h2 style={{ marginTop: 0 }}>Admin Dashboard</h2>
        <p style={{ opacity: 0.8, fontSize: 14 }}>
          {user?.fullName || "Admin"}
        </p>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
          <Link style={linkStyle} to="/admin/vehicles">Manage Vehicles</Link>
          <Link style={linkStyle} to="/admin/services">Manage Services</Link>
        </nav>

        <button onClick={logout} style={btnStyle}>
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: 24, background: "#f6f6f6" }}>
        <Outlet />
      </main>
    </div>
  );
}

const linkStyle = { color: "white", textDecoration: "none", padding: "10px 12px", borderRadius: 8, background: "#222" };
const btnStyle = { marginTop: 20, width: "100%", padding: 10, borderRadius: 8, border: "none", cursor: "pointer" };

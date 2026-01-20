import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { setAuth } from "../../../hooks/useAuth";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const res = await api.post("/api/auth/login", { email, password });
      setAuth(res.data.token, res.data.user);
      navigate("/admin/vehicles");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#111" }}>
      <form onSubmit={submit} style={{ width: 360, padding: 24, borderRadius: 12, background: "#fff" }}>
        <h2 style={{ marginTop: 0 }}>Admin Login</h2>

        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button disabled={loading} style={buttonStyle}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = { width: "100%", padding: 10, margin: "6px 0 14px", borderRadius: 8, border: "1px solid #ccc" };
const buttonStyle = { width: "100%", padding: 12, borderRadius: 8, border: "none", background: "#111", color: "white", cursor: "pointer" };

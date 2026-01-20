import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Fleet from "./pages/Fleet";
import Services from "./pages/Services";
import About from "./pages/About";
import BookNowPage from "./pages/BookNowPage";
import NotFound from "./pages/NotFound";

import Login from "./pages/admin/pages/Login";
import AdminLayout from "./pages/admin/pages/AdminLayout";
import Dashboard from "./pages/admin/pages/Dashboard";
import ManageVehicles from "./pages/admin/pages/ManageVehicles";
import ManageServices from "./pages/admin/pages/ManageServices";

// Simple auth guard
function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/fleet" element={<Fleet />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/book" element={<BookNowPage />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Protected Area */}
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="vehicles" element={<ManageVehicles />} />
        <Route path="services" element={<ManageServices />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

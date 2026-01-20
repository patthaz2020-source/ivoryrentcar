import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./Login";
import AdminLayout from "./AdminLayout";
import VehiclesPage from "./ManageVehicles";
import ServicesPage from "./ManageServices";
import BookNowPage from "../../BookNowPage";
import { isLoggedIn } from "../../../hooks/useAuth";

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public customer booking */}
        <Route path="/book" element={<BookNowPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/admin/vehicles" replace />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="services" element={<ServicesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/book" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

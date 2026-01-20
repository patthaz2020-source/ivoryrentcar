import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Fleet from "./pages/Fleet";
import Login from "./pages/admin/pages/Login";
import Dashboard from "./pages/admin/pages/Dashboard";
import BookNowPage from "./pages/BookNowPage";

function App() {
  return (
    <>
      {/* ALWAYS visible */}
      <Navbar />

      {/* Page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fleet" element={<Fleet />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/book" element={<BookNowPage />} />

      </Routes>
    </>
  );
}

export default App;

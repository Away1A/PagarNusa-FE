import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Pemasukan from "./pages/Pemasukan";
import Pengeluaran from "./pages/Pengeluaran";
import LaporanGuest from "./pages/LaporanGuest";
import DokumentasiGuest from "./pages/DokumentasiGuest";
import Pendaftaran from "./pages/Pendaftaran";
import PrivateRoute from "./components/PrivateRoute";
import GantiPassword from "./pages/GantiPassword";

export default function App() {
  const { auth } = useAuth(); // auth: { token, role, user }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Tampilkan Navbar hanya jika sudah login */}
        {auth.token && <Navbar />}

        <main className={`${auth.token ? "max-w-6xl mx-auto" : ""}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/laporan/guest" element={<LaporanGuest />} />
            {/* <Route path="/acara/guest" element={<AcaraGuest />} /> */}
            <Route path="/dokumentasi/guest" element={<DokumentasiGuest />} />

            {/* Route utama diarahkan berdasarkan login */}
            <Route
              path="/"
              element={
                auth.token ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/laporan/guest" replace />
                )
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/pemasukan"
              element={
                <PrivateRoute>
                  <Pemasukan />
                </PrivateRoute>
              }
            />
            <Route
              path="/pendaftaran"
              element={
                <PrivateRoute>
                  <Pendaftaran />
                </PrivateRoute>
              }
            />
            <Route
              path="/ganti-password"
              element={
                <PrivateRoute>
                  <GantiPassword />
                </PrivateRoute>
              }
            />
            <Route
              path="/pengeluaran"
              element={
                <PrivateRoute>
                  <Pengeluaran />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

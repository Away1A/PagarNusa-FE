// pages/GantiPassword.jsx
import { useState } from "react";
import api from "../api";
import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function GantiPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setMessage({ type: "error", text: "Semua field wajib diisi" });
    }

    if (newPassword !== confirmPassword) {
      return setMessage({ type: "error", text: "Password baru tidak sama" });
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await api.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      setMessage({ type: "success", text: res.data.message });
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Gagal mengganti password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <LockClosedIcon className="h-8 w-8 text-green-700" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Ganti Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Pastikan password baru Anda aman dan mudah diingat.
        </p>

        {message && (
          <div
            className={`mb-5 p-3 rounded-md text-sm font-medium ${
              message.type === "error"
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Lama
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password Baru
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi Password Baru
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {loading ? "Menyimpan..." : "Simpan Password"}
        </button>
      </div>
    </div>
  );
}

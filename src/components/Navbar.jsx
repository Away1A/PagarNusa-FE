import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Key, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const role = auth.role;
  const name = auth.user?.username || "User";
  const roleFormatted = role.charAt(0).toUpperCase() + role.slice(1);

  const isAdmin = role === "admin";

  const navItem = (to, label) => (
    <Link
      to={to}
      onClick={closeMenu}
      className="hover:bg-white/10 hover:text-[#FFD700] transition px-4 py-2 rounded-md font-semibold text-sm"
    >
      {label}
    </Link>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-[#1A3B5D] to-[#1F6E43] text-white px-6 py-4 shadow-lg sticky top-0 z-50 backdrop-blur-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/pagar-nusa.jpg"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight">Pagar NuSa</span>
            <span className="text-xs text-gray-200">pagar NU dan Bangsa</span>
          </div>
        </Link>

        {/* Mobile Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {navItem("/", "Dashboard")}
          {isAdmin && navItem("/pemasukan", "Pemasukan")}
          {isAdmin && navItem("/pengeluaran", "Pengeluaran")}
          {/* {navItem("/laporan", "Laporan")} */}

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-full transition text-sm font-semibold"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${name}&background=ffffff&color=1A3B5D&size=32`}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>
                {name} ({roleFormatted})
              </span>
              <ChevronDown size={16} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-xl z-50 overflow-hidden">
                <button
                  onClick={() => navigate("/ganti-password")}
                  className="w-full px-5 py-3 text-left hover:bg-gray-100 flex items-center gap-2 text-sm font-medium"
                >
                  <Key size={16} /> Ganti Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-5 py-3 text-left hover:bg-gray-100 flex items-center gap-2 text-sm font-medium"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-4 gap-4 bg-white/10 rounded-xl p-4 text-sm font-semibold">
          {/* User Profile Info */}
          <div className="flex items-center gap-3 bg-white/20 p-3 rounded-lg">
            <img
              src={`https://ui-avatars.com/api/?name=${name}&background=ffffff&color=1A3B5D&size=40`}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-bold">{name}</span>
              <span className="text-xs text-gray-200">{roleFormatted}</span>
            </div>
          </div>

          {/* Nav Links */}
          {navItem("/", "Dashboard")}
          {isAdmin && navItem("/pemasukan", "Pemasukan")}
          {isAdmin && navItem("/pengeluaran", "Pengeluaran")}

          {/* Ganti Password */}
          <button
            onClick={() => {
              closeMenu();
              navigate("/ganti-password");
            }}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition"
          >
            <Key size={16} /> Ganti Password
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}

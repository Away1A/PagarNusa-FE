import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";

export default function GuestNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleLogin = () => navigate("/login");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItem = (to, label) => (
    <Link
      to={to}
      onClick={() => setIsOpen(false)}
      className="relative px-4 py-2 text-sm font-medium text-[#333333] hover:text-[#1F6E43] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#FFD700] hover:after:w-full after:transition-all after:duration-300"
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-6 py-3 flex items-center justify-between">
        {/* Logo + Judul */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/pagar-nusa.jpg"
              alt="Pagar NuSa Logo"
              className="w-10 h-10 object-cover rounded-full border border-gray-300 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-[#1A3B5D] tracking-tight group-hover:text-[#1F6E43] transition-colors duration-300">
                Pagar Nusa
              </span>
              <span className="text-xs text-[#333333] opacity-70">
                pagar NU dan Bangsa
              </span>
            </div>
          </Link>
        </div>

        {/* Menu Tengah */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {navItem("/dokumentasi/guest", "Dokumentasi")}
          {navItem("/laporan/guest", "Keuangan")}
        </div>

        {/* Account */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-3 py-2 bg-[#F5F5F5] hover:bg-[#EAEAEA] rounded-full text-[#333333] transition-colors duration-300 border border-gray-200"
            >
              <img
                src="https://ui-avatars.com/api/?name=Guest&background=cccccc&color=000000&size=32"
                alt="Guest Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">Guest</span>
              <ChevronDown size={16} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-50 border border-gray-200">
                <button
                  onClick={handleLogin}
                  className="w-full flex items-center gap-2 px-5 py-3 text-sm text-[#333333] hover:bg-[#F5F5F5] transition-colors duration-300"
                >
                  <LogOut size={16} className="text-[#1F6E43]" />
                  Login Admin
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-[#333333] rounded-lg hover:bg-[#F5F5F5] transition-colors duration-300"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 flex flex-col gap-2 text-[#333333]">
            {navItem("/dokumentasi/guest", "Dokumentasi")}
            {navItem("/laporan/guest", "Keuangan")}
            <button
              onClick={handleLogin}
              className="flex items-center gap-2 px-4 py-2 mt-2 bg-[#F5F5F5] hover:bg-[#EAEAEA] rounded-md transition-colors duration-300"
            >
              <LogOut size={16} className="text-[#1F6E43]" />
              Login Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

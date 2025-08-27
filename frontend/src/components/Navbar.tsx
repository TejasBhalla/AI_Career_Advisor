import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "./store/useUserStore.ts";
import axios from "axios";

function Navbar() {
  const { user, isLoggedIn, logout, fetchUser } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch user on mount (persisted login)
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 🔹 Logout handler
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      logout(); // update Zustand store
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // 🔹 Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/career", label: "Career" },
    { to: "/skills", label: "Skills" },
    { to: "/internships", label: "Internships" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-black/40 shadow-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <NavLink
          to="/"
          className="relative text-2xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 bg-[length:200%_200%] bg-clip-text text-transparent animate-gradient-move"
        >
          CareerAI
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm items-center">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `transition duration-300 relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r from-cyan-400 to-fuchsia-500 after:transition-all after:duration-500 hover:after:w-full ${
                  isActive
                    ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    : "text-white/80 hover:text-fuchsia-400"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <>
              <span className="text-white/80">Hi, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-xl text-sm font-medium text-white/90 border border-red-500/50 hover:bg-red-600/20 hover:shadow-[0_0_12px_rgba(239,68,68,0.8)] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-1.5 rounded-xl text-sm font-medium text-white/90 border border-cyan-400/40 hover:bg-cyan-400/20 hover:shadow-[0_0_12px_rgba(34,211,238,0.7)] transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-1.5 rounded-xl text-sm font-medium text-white/90 border border-fuchsia-400/40 hover:bg-fuchsia-400/20 hover:shadow-[0_0_12px_rgba(232,121,249,0.7)] transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-black/20 backdrop-blur-lg border-t border-white"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-cyan-400 transition"
            >
              {label}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-red-400 hover:text-red-500 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-cyan-400 hover:text-cyan-300 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-fuchsia-400 hover:text-fuchsia-300 transition"
              >
                Register
              </NavLink>
            </>
          )}
        </motion.div>
      )}

      {/* Gradient Animation */}
      <style>
        {`
          @keyframes gradient-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-move {
            animation: gradient-move 6s ease infinite;
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome
          ? "bg-white/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-3"
          }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                <img
                  src="/scrubbNewLg-removebg-preview.png"
                  alt="ScrubbPro Logo"
                  className="w-36 sm:w-36 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors duration-200 hover:text-sky-600 ${isActive
                      ? "text-sky-600"
                      : scrolled || !isHome
                        ? "text-slate-600"
                        : "text-white"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/pricing"
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors duration-200 hover:text-sky-600 ${isActive
                      ? "text-sky-600"
                      : scrolled || !isHome
                        ? "text-slate-600"
                        : "text-white"
                    }`
                  }
                >
                  Pricing
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-base font-medium transition-colors duration-200 hover:text-sky-600 ${isActive
                      ? "text-sky-600"
                      : scrolled || !isHome
                        ? "text-slate-600"
                        : "text-white"
                    }`
                  }
                >
                  About Us
                </NavLink>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openQuoteModal"))
                }
                className="px-6 py-2.5 rounded-full bg-sky-600 text-white text-base font-semibold shadow-md  hover:bg-sky-700 hover:shadow-lg hover:shadow-sky-200 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Request a Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl transition-all duration-300 origin-top transform md:hidden ${isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible"
            }`}
        >
          <div className="px-4 py-6 space-y-4">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive
                  ? "bg-sky-50 text-sky-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/pricing"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive
                  ? "bg-sky-50 text-sky-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              Pricing
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive
                  ? "bg-sky-50 text-sky-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              About
            </NavLink>
            <div className="pt-2">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("openQuoteModal"));
                  setIsOpen(false);
                }}
                className="w-full py-3.5 rounded-xl bg-sky-600 text-white font-semibold shadow-lg shadow-sky-200 active:scale-[0.98] transition-all"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

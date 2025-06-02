import React, { useState, useEffect } from "react";
import { Link, Links, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  // const [dropdownOpen, setDropdownOpen] = useState(false);  // Dropdown state
  // Function to close dropdown when clicking outside
  // useEffect(() => {
  // const handleClickOutside = (event) => {
  // if (!event.target.closest(".dropdown-menu")) {
  // setDropdownOpen(false);
  // }
  // };
  // document.addEventListener("click", handleClickOutside);
  // return () => {
  // document.removeEventListener("click", handleClickOutside);
  // };
  // }, []);
  return (
    <>
      <nav className="bg-green-800 w-full fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white focus:ring-1 focus:ring-white focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
            {/* Logo and Navigation Links */}
            <div className="flex items-center justify-between w-full">
              <div className="flex-shrink-0">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  Logo
                </Link>
              </div>
              <div className="hidden sm:flex sm:space-x-12 mx-auto">
                <div className="ml-10 flex items-baseline space-x-10">
                  <Link
                    to="/"
                    className="text-white hover:text-green-200 px-3 py-2 rounded-md text-[14px] font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-white hover:text-green-200 px-3 py-2 rounded-md text-[14px] font-medium"
                  >
                    Services
                  </Link>
                  <Link
                    href="/contact"
                    className="text-white hover:text-green-200 px-3 py-2 rounded-md text-[14px] font-medium"
                  >
                    About
                  </Link>
                </div>
              </div>
              <div className="hidden sm:block">
                <Link
                  href="/Qoute"
                  className="text-white hover:text-green-200 px-3 py-2 rounded-md text-[14px] font-medium"
                >
                  Request a Qoute
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;

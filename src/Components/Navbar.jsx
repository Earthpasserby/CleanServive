import React, { useState, useEffect } from "react";
import { Link, Links, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  // Function to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-white-100 w-full fixed top-0 left-0 right-0 z-50">
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
                <Link to="/" className="text-xl font-bold text-white">
                  Scrubb
                </Link>
              </div>
              <div className="hidden sm:flex sm:space-x-12 mx-auto">
                <div className="ml-10 flex items-baseline space-x-10">
                  <NavLink
                    to="/"
                    className="text-yellow-300 hover:underline px-3 py-2 rounded-md text-[14px] font-medium"
                  >
                    Home
                  </NavLink>

                  <NavLink
                    href="/about"
                    className="text-yellow-300  px-3 py-2 rounded-md text-[14px] font-medium"
                  >
                    Pricing
                  </NavLink>
                  <NavLink
                    href="/contact"
                    className="text-yellow-300  px-3 py-2 rounded-md text-[14px] font-medium"
                  >
                    About Us
                  </NavLink>
                </div>
              </div>
              <div className="hidden sm:block">
                <NavLink
                  href="/Qoute"
                  className="text-yellow-300  px-3 py-2 rounded-md text-[14px] font-medium"
                >
                  Request a Qoute
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="sm:hidden absolute top-16 left-0 w-full bg-green-800 ">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <NavLink
                exact
                to="/"
                className="text-white hover:text-green-200 px-3 py-2 rounded-md text-[14px] font-medium block"
                activeClassName="text-red-500"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              {/* Dropdown for Our Services */}
              {/* <div className="relative dropdown-menu"> */}
              {/* <button */}
              {/* onClick={(e) => { */}
              {/* e.stopPropagation(); // Prevent closing when clicking the button */}
              {/* setDropdownOpen(!dropdownOpen); */}
              {/* }} */}
              {/* className="text-gray-700  px-3 py-2 focus:outline-none flex items-center gap-1 hover:bg-red-100  hover:text-red-700" */}
              {/* > */}
              {/* Our Services */}
              {/* <svg */}
              {/* className="w-4 h-4 mt-1" */}
              {/* fill="none" */}
              {/* stroke="currentColor" */}
              {/* viewBox="0 0 24 24" */}
              {/* > */}
              {/* <path d="M19 9l-7 7-7-7" /> */}
              {/* </svg> */}
              {/* </button> */}
              {/* Dropdown Menu */}
              {/* {dropdownOpen && ( */}
              {/* <div className="absolute left-0 mt-2  text-[12px] px-4 py-2 bg-white border-1 border-red-100 rounded-md shadow-lg z-50 grid grid-cols-2 gap-4 p-2 mb-4"> */}
              {/* <Link */}
              {/* // to="/service" // className="block px-4 py-2 text-gray-700 */}
              {/* hover:bg-red-100 hover:text-red-700" // onClick= */}
              {/* {() => setDropdownOpen(false)} */}
              {/* // ><img */}
              {/* // to="/" // alt="Service Icon" // className="inline-block w-4 */}
              {/* h-4 mr-2 " // /> */}
              {/* School service */}
              {/* </Link> */}
              {/* <Link */}
              {/* // to="/visaservice" // className="block px-4 py-2 text-gray-700 */}
              {/* hover:bg-red-100 hover:text-red-700" // onClick= */}
              {/* {() => setDropdownOpen(false)} */}
              {/* // ><img */}
              {/* // to="/" // alt="Service Icon" // className="inline-block w-4 */}
              {/* h-4 mr-2 " // /> */}
              {/* Visa service */}
              {/* </Link> */}
              {/* <Link */}
              {/* // to="/ticket" // className="block px-4 py-2 text-gray-700 */}
              {/* hover:bg-red-100 hover:text-red-700" // onClick= */}
              {/* {() => setDropdownOpen(false)} */}
              {/* // ><img */}
              {/* // to="/" // alt="Service Icon" // className="inline-block w-6 */}
              {/* h-6 mr-2 " // /> */}
              {/* Ticketing & Reservation */}
              {/* </Link> */}
              {/* <Link */}
              {/* // to="/birthservice" // className="block px-4 py-2 */}
              {/* text-gray-700 hover:bg-red-100 hover:text-red-700" // onClick= */}
              {/* {() => setDropdownOpen(false)} */}
              {/* // ><img */}
              {/* // to="/" // alt="Service Icon" // className="inline-block w-6 */}
              {/* h-6 mr-2 " // /> */}
              {/* Birth abroad service */}
              {/* </Link> */}
              {/* <Link */}
              {/* // to="/holidaypack" // className="block px-4 py-2 text-gray-700 */}
              {/* hover:bg-red-100 hover:text-red-700" // onClick= */}
              {/* {() => setDropdownOpen(false)} */}
              {/* // ><img */}
              {/* // to="/" // alt="Service Icon" // className="inline-block w-5 */}
              {/* h-5 mr-2 " // /> */}
              {/* Holiday packages */}
              {/* </Link> */}
              {/* <Link */}
              {/* // to="/relocateserv" // className="block px-4 py-2 */}
              {/* text-gray-700 hover:bg-red-100 hover:text-red-700" // onClick= */}
              {/* {() => setDropdownOpen(false)} */}
              {/* // ><img */}
              {/* // to="/" // alt="Service Icon" // className="inline-block w-6 */}
              {/* h-6 mr-2 " // /> */}
              {/* Relocation service */}
              {/* </Link> */}
              {/* </div> */}
              {/* )} */}
              {/* </div> */}
              <NavLink
                to="/Services"
                className="text-white hover:text-green-200 px-3 py-2 rounded-md text-[14px] font-medium block"
                activeClassName="text-red-500"
                onClick={() => setIsOpen(false)}
              >
                Services
              </NavLink>
              <NavLink
                to="/About"
                className="text-white hover:text-green-200 px-3 py-2 rounded-md text-[14px] font-medium block"
                activeClassName="text-red-500"
                onClick={() => setIsOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/Qoute"
                className="text-white hover:text-green-200 px-3 py-2 rounded-md text-[14px] font-medium block"
                activeClassName="text-red-500"
                onClick={() => setIsOpen(false)}
              >
                Request a Qoute
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
export default Navbar;

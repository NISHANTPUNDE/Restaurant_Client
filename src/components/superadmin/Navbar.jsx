import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa"; // Notification icon
import { FaBars } from "react-icons/fa"; // Mobile menu icon
import { IoMdAdd } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://blog.deveraa.com/_next/static/media/deveraa.52ebdceb.jpg"
            className="h-8"
            alt="Logo"
          />
        </NavLink>

        

        <div className="hidden md:flex items-center md:order-2">
        <NavLink
            to="/"
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Dashboard"
          >
            <IoHomeOutline  className="w-6 h-6" />
          </NavLink>
          <NavLink
            to="/superadmin/create-restaurant"
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Dashboard"
          >
            <IoMdAdd className="w-6 h-6" />
          </NavLink>
          <NavLink
            to="/superadmin/notifications"
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Notifications"
          >
            <FaBell className="w-6 h-6" />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <FaBars className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // demo state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = (
    <>
      <Link href="/" className="mr-10">
        Home
      </Link>
      <Link href="/all_products" className="mr-10">
        All Products
      </Link>
    </>
  );

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm relative z-50">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end relative">
        {isLoggedIn ? (
          <div className="relative">
            {/* USER ICON */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="btn btn-ghost btn-circle"
            >
              <FaUserCircle className="text-3xl text-blue-600" />
            </button>

            {/* DROPDOWN + ARROW */}
            <AnimatePresence>
              {dropdownOpen && (
                <>
                  {/* Arrow */}
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-3 top-12 w-0 h-0 
                    border-l-8 border-r-8 border-b-8 
                    border-transparent border-b-white shadow-sm"
                  />

                  {/* Dropdown Box */}
                  <motion.ul
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-0 mt-4 w-44 bg-white 
                    rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden"
                  >
                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition"
                      >
                        Log Out
                      </button>
                    </li>
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link href="/login" className="btn btn-outline">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
}

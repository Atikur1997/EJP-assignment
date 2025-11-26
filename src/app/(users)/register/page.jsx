"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    let data = {};
    try {
      data = await res.json();
    } catch {
      alert("Server returned invalid JSON.");
      return;
    }

    if (!res.ok) {
      alert("Registration failed: " + data.error);
      return;
    }

    alert("Account created!");
    window.location.href = "/login";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600"
    >
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <h1 className="text-4xl text-center font-bold text-white mb-6">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* USERNAME */}
          <div>
            <label className="text-white mb-1 block">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="input w-full bg-white/20 text-white placeholder-white/60 border-white/30"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-white mb-1 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input w-full bg-white/20 text-white placeholder-white/60 border-white/30"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-white mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="input w-full bg-white/20 text-white placeholder-white/60 border-white/30"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2 px-2 py-1 text-white bg-white/20 rounded-md text-xs"
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-white mb-1 block">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfPass ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="input w-full bg-white/20 text-white placeholder-white/60 border-white/30"
              />
              <button
                type="button"
                onClick={() => setShowConfPass(!showConfPass)}
                className="absolute right-3 top-2 px-2 py-1 text-white bg-white/20 rounded-md text-xs"
              >
                {showConfPass ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* REGISTER BUTTON */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="btn w-full bg-white text-indigo-600 font-bold shadow-lg"
          >
            Register
          </motion.button>
        </form>

        <p className="text-center mt-4 text-white/80">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-white">
            Login
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
}

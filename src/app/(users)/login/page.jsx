"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Login failed: " + data.error);
        return;
      }

      alert("Login successful!");

      // redirect
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-indigo-500 to-blue-400 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-lg"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-white text-center mb-4"
        >
          Welcome Back
        </motion.h1>

        <p className="text-center text-white/80 mb-8">
          Login to access your dashboard
        </p>

        <form onSubmit={handleLogin}>
          <fieldset className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="label text-white">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full bg-white/20 text-white placeholder-white/60 border-white/30"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="label text-white">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full bg-white/20 text-white placeholder-white/60 border-white/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="btn btn-xs absolute right-3 top-2 bg-white/30 text-white border-white/20"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right">
              <a className="link text-white/80 text-sm">Forgot password?</a>
            </div>

            {/* LOGIN BUTTON */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn w-full bg-white text-indigo-600 font-bold border-none shadow-lg mt-4"
            >
              Login
            </motion.button>
          </fieldset>
        </form>

        {/* REGISTER LINK */}
        <p className="text-center mt-5 text-white/80">
          Don’t have an account?{" "}
          <a href="/register" className="link text-white font-semibold">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
}

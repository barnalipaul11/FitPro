import React, { useState } from "react";
import Image from "../assets/img.jpg";
import Logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/img2.jpg";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/login`,
        { email, password },
        { withCredentials: true }
      );
      login(res.data.token || "session-cookie");
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-500">
      <div className="hidden md:flex flex-1 items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${bgImg})` }}
        />

        <img
          src={Image}
          alt="Login visual"
          className="relative z-10 rounded-2xl shadow-2xl"
        />
      </div>

      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-lg">
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="Logo" className="w-16 h-16" />
          </div>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Welcome back!
            </h2>
            <p className="text-slate-500">Please enter your details</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-slate-700"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-indigo-500"
                />
                <span className="text-slate-500">Remember for 30 days</span>
              </label>
              <a
                href="#"
                className="text-indigo-500 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition"
            >
              Log In
            </button>
          </form>
          <p className="mt-8 text-center text-slate-500">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="text-indigo-500 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
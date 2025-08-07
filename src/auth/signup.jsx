import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "librarian",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const signup = useUserStore((state) => state.signup);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await signup({
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      setSuccess("Account created! You can now log in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="rounded-lg bg-white shadow-sm shadow-gray-400 w-full max-w-md ">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="text-3xl font-bold">
            <h1>Sign Up</h1>
          </div>
          <div className="text-gray-500">
            <p>Create a new account</p>
          </div>
        </div>
        <div className="p-6 pt-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-md mb-1 font-medium flex"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 my-2"
                placeholder="Enter your username"
                required
                value={form.username}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-md mb-1 font-medium flex" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 my-2"
                placeholder="Enter your email"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-md mb-1 font-medium flex"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 my-2"
                placeholder="Enter your password"
                required
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <label className="text-md mb-1 font-medium flex" htmlFor="role">
                Role
              </label>
              <select
                name="role"
                id="role"
                className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 my-2"
                value={form.role}
                onChange={handleChange}
              >
                <option value="librarian">Librarian</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 cursor-pointer rounded-md text-sm font-medium bg-black text-white hover:bg-primary/90 h-10 px-4 py-2 w-full hover:bg-neutral-900"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="pt-2 border-t border-gray-200  text-center pb-3">
          <span>Already have an account? </span>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

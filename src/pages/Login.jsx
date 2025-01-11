import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import * as Icons from "@radix-ui/react-icons";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState("light");
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  useEffect(
    (prev) => {
      if (prev) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    },
    [isDark]
  );
  const toggleDarkMode = () => {
    setIsDark(document.documentElement.classList.toggle("dark"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://json-api.uz/api/project/blog-api/auth/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("Response:", response.data);
        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Password or Username not correct");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="p-8 rounded-lg shadow-2xl  max-w-sm w-full bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <Toaster position="bottom-center" />
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 bg-indigo-500 text-white rounded-full"
        >
          {isDark ? <Icons.SunIcon /> : <Icons.MoonIcon />}
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium  ">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-600 dark:text-white"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-indigo-700"
          >
            Login
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-600"
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

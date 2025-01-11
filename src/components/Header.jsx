import React, { useEffect, useState } from "react";
import ThemeProvider from "./ThemeProvider";

import NavBar from "../pages/NavBar";
import { NavLink } from "react-router-dom";

function Header() {
  const [isLogin, setIsLogin] = useState("false");
  useEffect(() => {
    const loginStatus = localStorage.getItem("user") ? true : false;
    setIsLogin(loginStatus);
  }, []);
  return (
    <header className="flex items-center static sm:sticky flex-wrap-reverse sm:flex-nowrap gap-3 top-0 z-50 bg-white justify-between py-4 px-6  w-full dark:bg-gray-800 shadow-md">
      <NavBar />
      <ThemeProvider />
      {isLogin && (
        <NavLink
          to="/articles/create"
          className={` dark:text-gray-300 font-mono hover:text-indigo-500 sm:hidden block`}
        >
          <span>Create</span>
        </NavLink>
      )}
    </header>
  );
}

export default Header;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ExitIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

function NavBar() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const loginStatus = localStorage.getItem("user") ? true : false;
    setIsLogin(loginStatus);
  }, []);
  return (
    <nav className="flex gap-6 container mx-auto ">
      <NavLink
        to="/"
        className={` dark:text-gray-300 font-mono hover:text-indigo-500 `}
      >
        Articles
      </NavLink>
      {isLogin ? (
        <div className="flex items-center justify-between max-w-[80%] w-full sm:w-30% md:w-full sm:gap-20 gap-5 ">
          <NavLink
            to="/articles/create"
            className={` dark:text-gray-300 font-mono hover:text-indigo-500`}
          >
            <span className="hidden sm:block">Create Article</span>
          </NavLink>
          <button
            onClick={() => {
              if (
                confirm("Rostdan ham profilingizdan chiqib ketmoqchimisiz?")
              ) {
                localStorage.removeItem("user");
                setIsLogin(false);
                navigate("/login");
              }
            }}
            className={`flex items-center gap-2 dark:text-gray-300 font-mono hover:text-indigo-500 
              `}
          >
            <ExitIcon />
            <span className="hidden sm:block">Quit</span>
          </button>
        </div>
      ) : (
        <NavLink
          to="/login"
          className={` dark:text-gray-300 font-mono hover:text-indigo-500 
              `}
        >
          Login
        </NavLink>
      )}
    </nav>
  );
}

export default NavBar;

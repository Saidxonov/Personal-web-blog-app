import React from "react";
import ThemeProvider from "../components/ThemeProvider";
import Header from "../components/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-5">{children}</main>
    </div>
  );
};

export default MainLayout;

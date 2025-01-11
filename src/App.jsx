import React from "react";
import ThemeProvider from "./components/ThemeProvider";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ArticleList from "./pages/ArticleList";
import ArticleDetail from "./pages/ArticleDetails";
import CreateArticle from "./pages/CreateArticle";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <MainLayout>
              <ArticleList />
            </MainLayout>
          }
        />

        <Route
          path="/article-details"
          element={
            <MainLayout>
              <ArticleDetail />
            </MainLayout>
          }
        />

        <Route
          path="/articles/create"
          element={
            <MainLayout>
              <CreateArticle />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

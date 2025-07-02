import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductFormPage from "./pages/ProductFormPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/create" element={<ProductFormPage />} />
      <Route path="/products/edit/:id" element={<ProductFormPage />} />
    </Routes>
  );
};

export default App;

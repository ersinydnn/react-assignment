import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegister from "./components/login-register";
import Homepage from "./components/homepage";
import Companies from "./components/companies";
import Products from "./components/products";
import Layout from "./components/layout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="companies" element={<Companies />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

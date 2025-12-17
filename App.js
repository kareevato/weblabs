import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FilmsProvider } from "./contexts/FilmsContext";
import "./App.css";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Home from "./Home";
import Catalog from "./pages/Catalog/catalog";

export default function App() {
  return (
    <FilmsProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </FilmsProvider>
  );
}

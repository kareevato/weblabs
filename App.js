import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { FilmsProvider } from "./contexts/FilmsContext";
import store from "./redux/store";
import "./App.css";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Home from "./Home";
import Catalog from "./pages/Catalog/catalog";
import Item from "./pages/Item/item";
import Cart from "./pages/Cart/cart";

export default function App() {
  return (
    <Provider store={store}>
      <FilmsProvider>
        <BrowserRouter>
          <div className="app">
            <Header />
            <main className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/film/:id" element={<Item />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </FilmsProvider>
    </Provider>
  );
}

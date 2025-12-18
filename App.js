import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { FilmsProvider } from "./contexts/FilmsContext";
import store from "./redux/store";
import { loadUserCart } from "./redux/actions";
import "./App.css";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./Home";
import Catalog from "./pages/Catalog/catalog";
import Item from "./pages/Item/item";
import Cart from "./pages/Cart/cart";
import Checkout from "./pages/Checkout/checkout";
import Success from "./pages/Success/success";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import NotFound from "./pages/NotFound/NotFound";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Завантажуємо кошик користувача при завантаженні додатку
    dispatch(loadUserCart());
  }, [dispatch]);

  return (
    <FilmsProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/catalog" 
                element={
                  <ProtectedRoute>
                    <Catalog />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/film/:id" 
                element={
                  <ProtectedRoute>
                    <Item />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/success" 
                element={
                  <ProtectedRoute>
                    <Success />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </FilmsProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

import React from "react";
import "./App.css";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Hero from "./components/Hero/hero";
import Features from "./components/Features/features";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <div className="home-page">
          <Hero />
          <Features />
        </div>
      </main>
      <Footer />
    </div>
  );
}

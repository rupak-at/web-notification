import { useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Login from "./components/login";
import HomePage from "./components/home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;

"use client";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./components/dashboard";
import Hello from "./components/hello";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="hello" element={<Hello />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

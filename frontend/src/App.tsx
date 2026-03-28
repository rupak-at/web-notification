"use client";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/landingPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./components/dashboard";
import Hello from "./components/hello";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <LandingPage />
          }
        />
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route index element={<Dashboard />} />
          <Route path="hello" element={<Hello />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

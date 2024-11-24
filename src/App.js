import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./pages/Login"; // File di folder `pages`
import Dashboard from "./pages/Dashboard"; // File di folder `pages`
import Profile from "./pages/Profile"; // Profile utama
import SignUp from "./pages/SignUp"; // Tambahkan import untuk SignUp
import "./App.css";

// Komponen untuk Melindungi Rute
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

class App extends Component {
  state = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true", // Ambil status login dari localStorage
  };

  handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true"); // Simpan status login
    this.setState({ isAuthenticated: true });
  };

  handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Hapus status login
    this.setState({ isAuthenticated: false });
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <Router>
        <Routes>
          {/* Rute Login */}
          <Route
            path="/login"
            element={<Login handleLogin={this.handleLogin} />}
          />

          {/* Rute Sign Up */}
          <Route
            path="SignUp"
            element={<SignUp />}
          />

          {/* Rute Dashboard dengan Proteksi */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard handleLogout={this.handleLogout} />
              </ProtectedRoute>
            }
          />

          {/* Rute Profile Utama */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Rute Default: Redirect ke Login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }
}

export default App;

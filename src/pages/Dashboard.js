import React, { Component } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Profile from "./Profile.js";
import RecipeJournal from "./RecipeJournal";
import Cariide from "./Cariide";
import Gallery from "./Gallery";
import Rekomendasi from "./Rekomendasi";
import AboutCreator from "./AboutCreator";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        {/* Header */}
        <header
          className="header"
          style={{
            backgroundImage: "url('/header.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            textAlign: "center",
            padding: "30px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/dashboard/Profile" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img
              src="/user.png" // Ganti dengan path gambar profil Anda
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
                textAlign: "right"
              }}
            />
            <span style={{ color: "black" }}>Profile</span>
          </Link>
        </header>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Gambar pada sidebar */}
          <div className="sidebar-image">
            <img
              src="/kitchenwhisper.jpg"
              alt="Deskripsi Gambar"
              style={{
                width: "75%",
                borderRadius: "1000px",
                marginBottom: "20px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>

          {/* Menu navigasi */}
          <ul>
            <li>
              <Link to="/dashboard/Gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/dashboard/recipejournal">Berbagi Resep</Link>
            </li>
            <li>
              <Link to="/dashboard/Cariide">Cari Ide Resep</Link>
            </li>
            <li>
              <Link to="/dashboard/Rekomendasi">Rekomendasi Tutorial</Link>
            </li>
            <li>
              <Link to="/dashboard/AboutCreator">About Creator</Link>
            </li>
          </ul>
          <button onClick={this.props.handleLogout}>Logout</button>
        </aside>

        {/* Main Content */}
        <main className="content">
          <Routes>
            <Route path="Profile" element={<Profile />} />
            <Route path="recipejournal" element={<RecipeJournal />} />
            <Route path="Cariide" element={<Cariide />} />
            <Route path="Gallery" element={<Gallery />} />
            <Route path="Rekomendasi" element={<Rekomendasi />} />
            <Route path="AboutCreator" element={<AboutCreator />} />
            <Route path="*" element={<Navigate to="Profile" />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">2024© Universitas Klabat</footer>
      </div>
    );
  }
}

export default Dashboard;

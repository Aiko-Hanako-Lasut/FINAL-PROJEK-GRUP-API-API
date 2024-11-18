import React, { Component } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./Home";
import RecipeJournal from "./RecipeJournal";
import Class from "./Class";
import Help from "./Help";
class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <aside className="sidebar">
          <ul>
            <li>
              <Link to="/dashboard/home">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/recipejournal">pekerja</Link>
            </li>
            <li>
              <Link to="/dashboard/class">Penghuni</Link>
            </li>
            <li>
              <Link to="/dashboard/help">Barang</Link>
            </li>
            <li>
              <Link to="/dashboard/help">Peraturan</Link>
            </li>
          </ul>
          <button onClick={this.props.handleLogout}>Logout</button>
        </aside>
        <main className="content">
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="recipejournal" element={<RecipeJournal />} />
            <Route path="class" element={<Class />} />
            <Route path="help" element={<Help />} />
            <Route path="*" element={<Navigate to="home" />} />
          </Routes>
        </main>
        <footer className="footer">2024©Universitas Klabat</footer>
      </div>
    );
  }
}

export default Dashboard;

import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import { database } from "../config"; // Import konfigurasi Firebase
import { serverTimestamp, collection, addDoc, setDoc, doc } from "firebase/firestore"; // Firestore functions

const loginCollection = collection(database, "LOGIN");

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      redirectToLogin: false,
      error: null,
      success: false,
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match!" });
      return;
    }

    try {
      // Simpan ke koleksi LOGIN
      await addDoc(loginCollection, {
        UpdatedAt: serverTimestamp(),
        CreatedAt: serverTimestamp(),
        email: email,
        name: name,
        password: password,
        role: "user",
      });

      // Simpan ke koleksi profiles
      const profileData = {
        email: email,
        name: name,
        favoriteFood: [],
        role: "user",
        CreatedAt: serverTimestamp(),
        UpdatedAt: serverTimestamp(),
      };

      await setDoc(doc(database, "profiles", email), profileData);

      // Reset form dan beri notifikasi sukses
      this.setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        success: true,
      });

      alert("Sign Up successful! Please log in.");
      this.setState({ redirectToLogin: true });
    } catch (error) {
      this.setState({ error: error.message });
      console.error("Error during sign-up: ", error);
    }
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
            required
          />
          <button type="submit">Sign Up</button>
          {this.state.error && <p className="error">{this.state.error}</p>}
        </form>
        <div className="login-redirect">
          <p>Already have an account?</p>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default SignUp;

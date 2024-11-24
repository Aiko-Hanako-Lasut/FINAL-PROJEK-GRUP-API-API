import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom"; // Tambahkan Link untuk navigasi
import { database } from "../config";
import { collection, getDocs, query, where } from "firebase/firestore";


class Login extends Component {
  state = {
    email: "",
    password: "",
    redirectToDashboard: false,
    error: null,
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({ isLoading: true, error: null });

    try {
      const usersRef = collection(database, "LOGIN"); //MENGAMBIL COLLECTION
      const q = query( //MENCARI USER ADA DI DATABASE ATAU TIDAK
        usersRef,
        where("email", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q); 

      if (!querySnapshot.empty) { 
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const userRole = userData.role;

        this.setState({email:"", password:"", confirmPassword:""});

        localStorage.setItem("role", userRole); 
        this.props.handleLogin();
        this.setState({ role: userRole, redirectToDashboard: true });
      } else {
        this.setState({
          error: "Invalid email or password.",
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      this.setState({
        error: "An error occurred during login. Please try again.",
        isLoading: false,
      });
    }
  };

  render() {
    if (this.state.redirectToDashboard) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="login-container">
        <img
          src="/kitchenwhisper.jpg"
          alt="Profile Avatar"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover"
          }}></img>
        <h2>Login to Your Kitchen Whisperss Account</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <button type="submit">User Login</button>
          {this.state.error && <p className="error">{this.state.error}</p>}
        </form>
        {/* Tambahkan tombol untuk Sign Up */}
        <div className="signup-redirect">
          <Link to="/signup">
            <p></p>
            <button>Sign Up</button>
            <p>Belum punya akun?</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;

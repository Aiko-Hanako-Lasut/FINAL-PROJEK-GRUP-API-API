import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    redirectToDashboard: false,
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    if (username === "Aikohanako588@gmail.com" && password === "12345") {
      this.props.handleLogin();
      this.setState({ redirectToDashboard: true });
    } else {
      alert("Invalid username or password.");
    }
  };

  render() {
    if (this.state.redirectToDashboard) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div className="login-container">
        <h2>Berbagi Resep Masakan Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
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
        </form>
      </div>
    );
  }
}

export default Login;

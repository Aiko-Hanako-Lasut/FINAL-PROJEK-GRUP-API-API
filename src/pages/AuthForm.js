import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false); // State untuk menentukan mode
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null); // Reset error ketika berpindah mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        // Logika Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Sign Up successful:", userCredential.user);
        alert("Account created successfully!");
      } else {
        // Logika Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Sign In successful:", userCredential.user);
        alert("Logged in successfully!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={toggleMode}>
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;

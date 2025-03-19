
import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { useUserContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      setUser(data.user);
      navigate("/");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  if (user) {
    return (
      <div className="login-container">
        <h1>Welcome {user.user_metadata?.first_name} {user.user_metadata?.last_name}</h1>
        <p className="login-message">
          Ready to share your culinary creations?
        </p>
        <div className="logged-in-actions">
          <Link to="/add-recipe" className="share-recipe-button">
            Share Recipe Now
          </Link>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
        <button className="login-button">Login</button>
      </form>

      <div className="register-section">
        <p className="register-text">
          Don't have an account? <Link to="/register">Register now!</Link>
        </p>
        <p className="test-credentials">
          You can also use these test credentials if you don't want to register:<br />
          Email: <strong>test@test.com</strong><br />
          Password: <strong>test123</strong>
        </p>
      </div>
    </div>
  );
}
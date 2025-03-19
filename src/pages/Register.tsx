import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useUserContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";

export default function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstname, last_name: lastname }
        }
      });
      
      if (error) throw error;
      
      setUser(data.user);
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h1>Create Account</h1>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="register-input"
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={e => setFirstname(e.target.value)}
          className="register-input"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={e => setLastname(e.target.value)}
          className="register-input"
        />
        <button type="submit" className="register-button">
          Create Account
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="login-link-section">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
}
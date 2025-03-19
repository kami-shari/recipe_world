import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ProfilePage() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.user_metadata?.first_name} {user.user_metadata?.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
}
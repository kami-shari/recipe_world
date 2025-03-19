import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <div className="logo-container">
        <NavLink to="/" className="logo-link">
          <img src="/recipe_logo.png" alt="Recipe World Logo" className="header-logo" />
        </NavLink>
        <nav className="menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/my-recipes">My Recipes</NavLink>
          <NavLink to="/add-recipe">Add Recipe</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </div>
      <div>
        <img 
          src="/header-image.jpeg" 
          alt="different meals" 
          className="header-banner"
        />
      </div>
    </div>
  );
}
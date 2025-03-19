import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-content">
        <Outlet />
      </div>
      <footer className="layout-footer">
        © 2024, Kami Shari. All rights reserved.
      </footer>
    </div>
  );
}
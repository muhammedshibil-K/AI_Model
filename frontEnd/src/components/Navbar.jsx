import "./Navbar.css";
import { Menu, Search } from "lucide-react";

function Navbar({ setSidebarOpen }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={20} />
        </button>

        <div className="logo-section">
          <div className="logo-icon"></div>
          <h2>Relatus.AI</h2>
        </div>
      </div>

      <div className="navbar-right">
      

        
      </div>
    </header>
  );
}

export default Navbar;
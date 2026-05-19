import "./Sidebar.css";
import { Plus } from "lucide-react";

function Sidebar({
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
 
}) {
  return (
    <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
      <div>
        <div className="logo-area">
          <div className="logo-icon"></div>
          <h2>Relatus.AI</h2>
        </div>

        <nav className="sidebar-nav">
          <a href="/" className=" items active">
          <Plus size={18}/>
            New Cat
          </a>
          <a href="/">AI Video</a>
          <a href="/">AI Image</a>
          <a href="/">Documents</a>
          <a href="/">Community</a>
          <a href="/">History</a>
        </nav>

        <div className="recent-section">
          <h4>Recent Chat</h4>

          <div className="recent-item">
            <p>New Design Ideas...</p>
            <span>Just now</span>
          </div>

          <div className="recent-item">
            <p>Smoothie Recipe...</p>
            <span>Today</span>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="theme-toggle">
          <button
            className={!darkMode ? "active" : ""}
            onClick={() => setDarkMode(false)}
          >
            Light
          </button>

          <button
            className={darkMode ? "active" : ""}
            onClick={() => setDarkMode(true)}
          >
            Dark
          </button>
        </div>

        <div className="user-profile">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            alt=""
          />

          <div>
            <h4>Muhammed Shibil</h4>
            <p>Shibil@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
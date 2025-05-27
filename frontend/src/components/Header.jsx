import React from "react";

const Header = ({ darkMode, toggleDarkMode, onLogout }) => {
  return (
    <div className="header-chatgpt">
      <div className="header-left">
        <h1 className="header-title">EQ AI</h1>
        {/* Removed the dropdown triangle */}
      </div>
      <div className="header-right">
        <div className="header-actions">
          <button onClick={toggleDarkMode} className="header-btn">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={onLogout} className="header-btn logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
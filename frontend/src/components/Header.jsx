import React from "react";

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="header">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold gradient-text">EQ AI</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleDarkMode} className="btn btn-secondary">
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button className="btn btn-primary">+ New Chat</button>
      </div>
    </div>
  );
};

export default Header;
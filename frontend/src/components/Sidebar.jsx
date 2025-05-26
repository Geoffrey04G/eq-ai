import React from "react";

const Sidebar = ({ darkMode }) => {
  const chatHistory = [
    { id: 1, title: "Getting Started", active: true },
    { id: 2, title: "Project Discussion", active: false },
    { id: 3, title: "Code Review", active: false },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="btn btn-primary w-full">+ New Chat</button>
      </div>
      <div className="sidebar-content">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          Recent Chats
        </div>
        {chatHistory.map((chat) => (
          <div key={chat.id} className={`sidebar-item ${chat.active ? 'active' : ''}`}>
            <div className="font-medium">{chat.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

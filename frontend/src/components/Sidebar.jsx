import React from "react";
import useStore from "../store/useStore";

const Sidebar = ({ darkMode, onNewChat }) => {
  const { chatHistory } = useStore();

  const handleNewChat = () => {
    if (onNewChat) {
      onNewChat();
    }
  };

  return (
    <div className="sidebar-chatgpt">
      {/* Sidebar Header */}
      <div className="sidebar-header-chatgpt">
        <button className="new-chat-btn" onClick={handleNewChat}>
          <span className="plus-icon">📝</span>
          New chat
        </button>
      </div>

      {/* Chat History */}
      <div className="chat-history">
        {chatHistory && chatHistory.length > 0 ? (
          <div className="history-section">
            <div className="history-label">Recent Chats</div>
            {chatHistory.map((chat, index) => (
              <div key={index} className="history-item">
                {chat.title || `Chat ${index + 1}`}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-history">
            <p className="empty-text">No conversations yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
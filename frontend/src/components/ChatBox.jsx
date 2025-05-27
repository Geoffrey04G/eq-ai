import React from "react";
import useStore from "../store/useStore";

const ChatBox = () => {
  const { messages, loading } = useStore();

  return (
    <div className="chat-main-area">
      {messages.length === 0 ? (
        <div className="chat-welcome">
          <h1 className="welcome-title">What can I help with?</h1>
        </div>
      ) : (
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              <div className="message-avatar">
                {message.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
        </div>
      )}
      {loading && (
        <div className="message assistant">
          <div className="message-avatar">🤖</div>
          <div className="message-content">
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
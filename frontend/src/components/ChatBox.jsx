import React from "react";
import useStore from "../store/useStore";

const ChatBox = () => {
  const { messages, loading } = useStore();

  return (
    <div className="space-y-6">
      {messages.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold gradient-text mb-2">Welcome to EQ AI</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start a conversation by typing a message below
          </p>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-avatar">
              {message.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">{message.content}</div>
          </div>
        ))
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
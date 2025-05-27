import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import VoiceInput from '../components/VoiceInput';
import useStore from '../store/useStore';

const Chat = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [input, setInput] = useState('');
  const { addMessage, setLoading, clearMessages } = useStore();
  const navigate = useNavigate();

  // Initialize dark mode on component mount
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    // Apply dark mode classes
    if (newDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  };

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('user');
    // Navigate to login page
    navigate('/login');
  };

  const handleNewChat = () => {
    // Clear all messages to start a new chat
    clearMessages();
    setInput('');
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    addMessage({ role: 'user', content: input });
    const currentInput = input;
    setInput('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      addMessage({ 
        role: 'assistant', 
        content: `I received your message: "${currentInput}". How can I help you with that?` 
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`chat-container ${darkMode ? 'dark' : 'light'}`}>
      <Sidebar darkMode={darkMode} onNewChat={handleNewChat} />
      <div className="chat-main">
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          onLogout={handleLogout}
        />
        <ChatBox />
        {/* Removed the nested input wrapper and used only VoiceInput */}
        <VoiceInput 
          message={input}
          setMessage={setInput}
          onSend={handleSend}
          onResult={(result) => setInput(result)}
        />
      </div>
    </div>
  );
};

export default Chat;
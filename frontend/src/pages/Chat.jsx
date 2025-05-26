import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import VoiceInput from "../components/VoiceInput";
import useStore from "../store/useStore";

const Chat = () => {
  const { setLoading, addMessage } = useStore();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`chat-container ${darkMode ? 'dark' : ''}`}>
      <Sidebar darkMode={darkMode} />
      <div className="main-content">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="chat-area">
          <ChatBox />
        </div>
        <div className="input-area">
          <div className="input-container">
            <VoiceInput onResult={(txt) => {
              addMessage({ role: "user", content: txt });
              setLoading(true);
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

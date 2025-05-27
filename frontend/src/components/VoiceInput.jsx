import React, { useState } from "react";
import { FiMic, FiSend, FiSliders } from "react-icons/fi";

const VoiceInput = ({ onResult, message, setMessage, onSend }) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message && message.trim()) {
      onSend();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsRecording(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsRecording(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    // The recognition will stop automatically
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-bar">
        <button className="icon-button" title="Settings">
          <FiSliders />
        </button>
        <input
          type="text"
          value={message || ""}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything"
          className="chat-input-field"
        />
        <button 
          className={`icon-button ${isRecording ? 'recording' : ''}`} 
          onClick={toggleRecording}
          title={isRecording ? "Stop recording" : "Start voice input"}
        >
          <FiMic />
        </button>
        <button 
          className="icon-button" 
          onClick={handleSend} 
          disabled={!message || !message.trim()}
          title="Send message"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default VoiceInput;
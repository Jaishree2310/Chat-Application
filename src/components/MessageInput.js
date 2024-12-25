import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileUpload } from './FileUpload';

export const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { state, dispatch } = useApp();

  const handleSend = () => {
    if (!message.trim() || !state.selectedContact) return;

    const newMessage = {
      type: 'text',
      text: message,
      timestamp: new Date().toLocaleTimeString(),
      isSent: true,
      contactId: state.selectedContact.id,
    };

    dispatch({
      type: 'ADD_MESSAGE',
      payload: { contactId: state.selectedContact.id, message: newMessage },
    });

    setMessage('');
  };

  return (
    <div className="message-input-container">
      {state.selectedContact && <FileUpload />} {/* Conditional render */}
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
          maxLength={500} 
        />
        <button 
          onClick={handleSend} 
          disabled={!message.trim() || !state.selectedContact} 
        >
          Send
        </button>
      </div>
    </div>
  );
};

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
      <FileUpload />
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileUpload } from './FileUpload';
import { tx, id } from "@instantdb/react";

export const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { state, dispatch, db } = useApp();

  const handleSend = async () => {
    if (!message.trim() || !state.selectedContact) return;

    const newMessage = {
      id: id(),
      content: message.trim(),
      timestamp: new Date().getTime(),
      senderId: state.currentUser.id,
      receiverId: state.selectedContact.id,
      conversationId: `${state.currentUser.id}-${state.selectedContact.id}`,
    };

    // Add message to InstantDB
    await db.transact(tx.messages[newMessage.id].update(newMessage));

    // Update last message in contact list
    dispatch({
      type: 'UPDATE_CONTACT_LAST_MESSAGE',
      payload: {
        contactId: state.selectedContact.id,
        message: message.trim()
      }
    });

    setMessage('');
  };

  return (
    <div className="message-input-container">
      {state.selectedContact && <FileUpload />}
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
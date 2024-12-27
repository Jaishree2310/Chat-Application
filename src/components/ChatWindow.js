import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Phone, Video, MoreVertical, Send } from 'lucide-react';
import { init, tx, id } from "@instantdb/react";

const db = init({
  appId: "86adf673-aee9-461d-b0f7-4d3476cff133"
});

const Message = ({ message, isOwn }) => (
  <div className={`message ${isOwn ? 'message-own' : 'message-other'}`}>
    <div className="message-content">
      <p>{message.content}</p>
      <span className="message-timestamp">
        {new Date(message.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </div>
  </div>
);

export const ChatWindow = () => {
  const { state } = useApp();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const currentUserId = 'self'; // Replace with actual user ID from your auth system

  // Simplified query structure
  const { isLoading, error, data } = db.useQuery({
    messages: {} // Fetch all messages first, we'll filter in code
  });

  console.log('ChatWindow Query Data:', {
    currentUserId,
    selectedContactId: state.selectedContact?.id,
    allMessages: data?.messages,
    error,
    isLoading
  });

  const addMessage = (message) => {
    db.transact(tx.messages[id()].update(message));
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !state.selectedContact) return;

    const message = {
      content: newMessage.trim(),
      timestamp: new Date().getTime(),
      senderId: currentUserId,
      receiverId: state.selectedContact.id
    };

    console.log('Sending message:', message);
    addMessage(message);
    setNewMessage('');
  };

  if (!state.selectedContact) {
    return (
      <div className="chat-window-empty">
        <div className="empty-state">
          <h3>Welcome to Chat</h3>
          <p>Select a contact to start chatting</p>
        </div>
      </div>
    );
  }

  // Filter messages for current conversation in code
  const conversationMessages = data?.messages?.filter(msg => 
    (msg.senderId === currentUserId && msg.receiverId === state.selectedContact.id) ||
    (msg.senderId === state.selectedContact.id && msg.receiverId === currentUserId)
  ) || [];

  console.log('Filtered messages:', conversationMessages);

  return (
    <div className="chat-window">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="contact-info">
          <div className="contact-avatar">
            {state.selectedContact.name.charAt(0)}
          </div>
          <div className="contact-details">
            <h2>{state.selectedContact.name}</h2>
            <span className="online-status">
              <span className="status-dot"></span>
              Online
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button className="action-button">
            <Phone className="action-icon" />
          </button>
          <button className="action-button">
            <Video className="action-icon" />
          </button>
          <button className="action-button">
            <Search className="action-icon" />
          </button>
          <button className="action-button">
            <MoreVertical className="action-icon" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="messages-container">
        {isLoading ? (
          <div className="loading">Loading messages...</div>
        ) : (
          conversationMessages.map((message) => (
            <Message
              key={message.id || message.timestamp}
              message={message}
              isOwn={message.senderId === currentUserId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="message-input-container">
        <form onSubmit={handleSendMessage} className="message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button
            type="submit"
            className={`send-button ${!newMessage.trim() ? 'disabled' : ''}`}
            disabled={!newMessage.trim()}
          >
            <Send className="send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
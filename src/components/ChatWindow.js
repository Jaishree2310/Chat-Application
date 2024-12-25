import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageInput } from './MessageInput';
import { Message } from './Message';

export const ChatWindow = () => {
  const { state, dispatch } = useApp();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messages = state.messages[state.selectedContact?.id] || [];

  const filteredMessages = messages.filter((message) => {
    if (!searchQuery) return true;
    if (message.type === 'text') {
      return message.text.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (message.type === 'file') {
      return message.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  if (!state.selectedContact) {
    return (
      <div className="chat-window empty">
        <p>Select a contact to start chatting</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="contact-avatar">
          {state.selectedContact.name.charAt(0)}
        </div>
        <h2>{state.selectedContact.name}</h2>

        {/* Search Icon and Input */}
        <div className={`search-bar ${isSearchActive ? 'active' : ''}`}>
          {!isSearchActive && (
            <span
              className="search-icon"
              onClick={() => setIsSearchActive(true)}
            >
              🔍
            </span>
          )}
          {isSearchActive && (
            <>
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={handleSearch}
                className="search-input"
              />
              <button
                className="clear-search"
                onClick={() => {
                  setSearchQuery('');
                  dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                  setIsSearchActive(false);
                }}
              >
                ×
              </button>
            </>
          )}
        </div>
      </div>

      <div className="messages-container">
        {filteredMessages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

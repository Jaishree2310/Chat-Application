
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageInput } from './MessageInput';
import { Message } from './Message';
import { useDebounce } from '../hooks/useDebounce';

export const ChatWindow = () => {
  const { state, dispatch } = useApp();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const messages = state.messages[state.selectedContact?.id] || [];

  const filterMessages = (message) => {
    if (!debouncedSearchQuery) return true;
    if (message.type === 'text' && message.text) {
      return message.text.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    }
    if (message.type === 'file' && message.fileName) {
      return message.fileName.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    }
    return false;
  };

  const filteredMessages = messages.filter(filterMessages);

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
          {state.selectedContact?.name.charAt(0)}
        </div>
        <h2>{state.selectedContact?.name}</h2>

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
        {filteredMessages.length === 0 && <p>No messages found, Start your chat</p>}
        {filteredMessages.map((message) => (
          <Message key={message.id || message.timestamp} message={message} />
        ))}
      </div>

      <MessageInput />
    </div>
  );
};









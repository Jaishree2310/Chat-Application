import React from 'react';
import { useApp } from '../context/AppContext';

export function ContactList() {
  const { state, dispatch } = useApp();

  return (
    <div className="contact-list">
      {state.contacts.map((contact) => (
        <div
          key={contact.id}
          className={`contact-item ${state.selectedContact?.id === contact.id ? 'selected' : ''}`}
          onClick={() => dispatch({ type: 'SET_SELECTED_CONTACT', payload: contact })}
        >
          <div className="contact-avatar">
            {contact.name.charAt(0)}
          </div>
          <div className="contact-info">
            <h3>{contact.name}</h3>
            <p>{contact.lastMessage}</p>
          </div>
          <span className="contact-time">{contact.timestamp}</span>
        </div>
      ))}
    </div>
  );
}




import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { tx } from "@instantdb/react";

export function ContactList() {
  const { state, dispatch, db } = useApp();

  // Query to get latest messages for each contact
  const { data } = db.useQuery({
    chatMessages: {
      orderBy: { timestamp: 'desc' }
    }
  });

  useEffect(() => {
    if (data?.messages) {
      // Update last messages for contacts
      state.contacts.forEach(contact => {
        const lastMessage = data.messages
          .filter(msg => 
            (msg.senderId === contact.id && msg.receiverId === state.currentUser.id) ||
            (msg.senderId === state.currentUser.id && msg.receiverId === contact.id)
          )
          .sort((a, b) => b.timestamp - a.timestamp)[0];

        if (lastMessage) {
          dispatch({
            type: 'UPDATE_CONTACT_LAST_MESSAGE',
            payload: {
              contactId: contact.id,
              message: lastMessage.content
            }
          });
        }
      });
    }
  }, [data?.messages]);

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
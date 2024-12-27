import React, { createContext, useReducer, useContext } from 'react';
import { init } from "@instantdb/react";

const db = init({
  appId: "86adf673-aee9-461d-b0f7-4d3476cff133"
});

const AppContext = createContext();

const initialState = {
  contacts: [
    { id: '1', name: 'Alice Smith', lastMessage: 'Hey there!', timestamp: '15:09 PM' },
    { id: '2', name: 'Bob Johnson', lastMessage: 'See you soon!', timestamp: '09:15 AM' },
    { id: '3', name: 'Jaishree Singh', lastMessage: 'call me later', timestamp: '5:30 PM' },
    { id: '4', name: 'Jaya Singh', lastMessage: 'How are you', timestamp: '13:15 PM' },
  ],
  selectedContact: null,
  currentUser: { id: 'self', name: 'Current User' }, // Added current user info
  searchQuery: '', 
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_SELECTED_CONTACT':
      return { ...state, selectedContact: action.payload };
    case 'UPDATE_CONTACT_LAST_MESSAGE':
      return {
        ...state,
        contacts: state.contacts.map(contact => 
          contact.id === action.payload.contactId
            ? { 
                ...contact, 
                lastMessage: action.payload.message,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              }
            : contact
        )
      };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch, db }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
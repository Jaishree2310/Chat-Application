import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  contacts: [
    { id: 1, name: 'Alice Smith', lastMessage: 'Hey there!', timestamp: '10:30 AM' },
    { id: 2, name: 'Bob Johnson', lastMessage: 'See you soon!', timestamp: '09:15 AM' },
  ],
  selectedContact: null,
  messages: {},
  searchQuery: '', 
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_SELECTED_CONTACT':
      return { ...state, selectedContact: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.contactId]: [
            ...(state.messages[action.payload.contactId] || []),
            action.payload.message,
          ],
        },
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
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
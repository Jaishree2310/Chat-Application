import React from 'react';
import { AppProvider } from './context/AppContext';
import { ContactList } from './components/ContactList';  // Changed to named import
import { ChatWindow } from './components/ChatWindow';   // Changed to named import
import './styles/App.css';

function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <ContactList />
        <ChatWindow />
      </div>
    </AppProvider>
  );
}

export default App;
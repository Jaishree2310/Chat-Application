import React from 'react';
import { AppProvider } from './context/AppContext';
import { ContactList } from './components/ContactList';  
import { ChatWindow } from './components/ChatWindow';   
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










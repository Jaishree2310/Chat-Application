// import React, { useState, useEffect, useRef } from 'react';
// import { useApp } from '../context/AppContext';
// import { Search, Phone, Video, MoreVertical, Send } from 'lucide-react';

// const Message = ({ message, isOwn }) => (
//   <div className={`message ${isOwn ? 'message-own' : 'message-other'}`}>
//     <div className="message-content">
//       <p>{message.content}</p>
//       <span className="message-timestamp">
//         {new Date(message.timestamp).toLocaleTimeString([], { 
//           hour: '2-digit', 
//           minute: '2-digit' 
//         })}
//       </span>
//     </div>
//   </div>
// );

// export const ChatWindow = () => {
//   const { state } = useApp();
//   const [chatHistories, setChatHistories] = useState({
//     1: [
//       { id: 1, content: "Hi, how are you?", timestamp: Date.now() - 7200000, sender: 'other' },
//       { id: 2, content: "I'm good, thanks! How about you?", timestamp: Date.now() - 7100000, sender: 'self' },
//       { id: 3, content: "Doing well. Excited about the weekend?", timestamp: Date.now() - 7000000, sender: 'other' },
//     ],
//     2: [
//       { id: 1, content: "Hey, did you complete the task?", timestamp: Date.now() - 3600000, sender: 'self' },
//       { id: 2, content: "Yes, I did. Sent it via email.", timestamp: Date.now() - 3500000, sender: 'other' },
//       { id: 3, content: "Great! Thanks for the update.", timestamp: Date.now() - 3400000, sender: 'self' },
//     ],
//     3: [
//       { id: 1, content: "Are we meeting tomorrow?", timestamp: Date.now() - 1800000, sender: 'other' },
//       { id: 2, content: "Yes, let's meet at 10 AM.", timestamp: Date.now() - 1700000, sender: 'self' },
//     ],
//   });

//   const [typingStates, setTypingStates] = useState({});
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [state.selectedContact, chatHistories]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     const selectedContactId = state.selectedContact?.id;

//     if (selectedContactId && typingStates[selectedContactId]?.trim()) {
//       const newMsg = {
//         id: Date.now(),
//         content: typingStates[selectedContactId],
//         timestamp: new Date().getTime(),
//         sender: 'self',
//       };

//       setChatHistories((prev) => ({
//         ...prev,
//         [selectedContactId]: [
//           ...(prev[selectedContactId] || []),
//           newMsg,
//         ],
//       }));

//       setTypingStates((prev) => ({
//         ...prev,
//         [selectedContactId]: '',
//       }));
//     }
//   };

//   const handleTyping = (e) => {
//     const selectedContactId = state.selectedContact?.id;

//     if (selectedContactId) {
//       setTypingStates((prev) => ({
//         ...prev,
//         [selectedContactId]: e.target.value,
//       }));
//     }
//   };

//   if (!state.selectedContact) {
//     return (
//       <div className="chat-window-empty">
//         <div className="empty-state">
//           <h3>Welcome to Chat</h3>
//           <p>Select a contact to start chatting</p>
//         </div>
//       </div>
//     );
//   }

//   const selectedContactId = state.selectedContact.id;
//   const messages = chatHistories[selectedContactId] || [];
//   const newMessage = typingStates[selectedContactId] || '';

//   return (
//     <div className="chat-window">
//       {/* Chat Header */}
//       <div className="chat-header">
//         <div className="contact-info">
//           <div className="contact-avatar">
//             {state.selectedContact.name.charAt(0)}
//           </div>
//           <div className="contact-details">
//             <h2>{state.selectedContact.name}</h2>
//             <span className="online-status">
//               <span className="status-dot"></span>
//               Online
//             </span>
//           </div>
//         </div>
//         <div className="header-actions">
//           <button className="action-button">
//             <Phone className="action-icon" />
//           </button>
//           <button className="action-button">
//             <Video className="action-icon" />
//           </button>
//           <button className="action-button">
//             <Search className="action-icon" />
//           </button>
//           <button className="action-button">
//             <MoreVertical className="action-icon" />
//           </button>
//         </div>
//       </div>

//       {/* Messages Area */}
//       <div className="messages-container">
//         {messages.map((message) => (
//           <Message 
//             key={message.id} 
//             message={message} 
//             isOwn={message.sender === 'self'}
//           />
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <div className="message-input-container">
//         <form onSubmit={handleSendMessage} className="message-form">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={handleTyping}
//             placeholder="Type a message..."
//             className="message-input"
//           />
//           <button 
//             type="submit"
//             className={`send-button ${!newMessage.trim() ? 'disabled' : ''}`}
//             disabled={!newMessage.trim()}
//           >
//             <Send className="send-icon" />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;

















import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useInstantDB } from '../hooks/useInstantDB';
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

  // Use the useInstantDB hook with the selected contact ID
  const { isLoading, error, data } = db.useQuery({
    messages: {},
  });
  console.log(data)

  const addMessage = (message) => {
    db.transact(tx.messages[id()].update(message));
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      content: newMessage.trim(),
      timestamp: new Date().getTime(),
      sender: 'self',
    };

    // await sendMessage(message);
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
      {console.log(data)}
      <div className="messages-container">
        {isLoading ? (
          <div className="loading">Loading messages...</div>
        ) : (
          data.map((message) => (
          
            <Message
              key={message.id}
              message={message}
              isOwn={message.sender === 'self'}
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
























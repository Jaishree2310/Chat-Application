// import { useState, useEffect } from 'react';

// export const useInstantDB = (contactId) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       setLoading(false);
//     };

//     fetchMessages();
//   }, [contactId]);

//   const sendMessage = async (message) => {
//     setMessages((prev) => [...prev, message]);
//   };

//   return { messages, loading, sendMessage };
// };



















// import { useState, useEffect } from 'react';
// import { useIndexedDB } from './useIndexedDB';  // Assuming the IndexedDB hook is imported

// export const useInstantDB = (contactId) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { fetchMessages, storeMessage } = useIndexedDB();

//   useEffect(() => {
//     const fetchMessagesFromDB = async () => {
//       setLoading(true);
//       // Try to fetch messages from IndexedDB (offline support)
//       const storedMessages = await fetchMessages();
//       setMessages(storedMessages);

//       // Here, you can integrate InstantDB fetching, for now, just mock it
//       // Let's assume you're getting messages from InstantDB in real-time
//       setLoading(false);
//     };

//     fetchMessagesFromDB();
//   }, [contactId]);

//   const sendMessage = async (message) => {
//     // Send the message to InstantDB here (mocked for now)
//     // storeMessageInInstantDB(contactId, message);

//     // Add message to local state
//     setMessages((prev) => [...prev, message]);

//     // Also store it in IndexedDB for offline use
//     storeMessage(message);
//   };

//   return { messages, loading, sendMessage };
// };














import { useState, useEffect } from 'react';
import { useIndexedDB } from './useIndexedDB';  // Assuming the IndexedDB hook is imported

export const useInstantDB = (contactId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchMessages, storeMessage } = useIndexedDB();

  useEffect(() => {
    const fetchMessagesFromDB = async () => {
      if (!contactId) return;

      setLoading(true);
      // Fetch messages for the selected contact from IndexedDB (offline support)
      const storedMessages = await fetchMessages();
      
      // Filter messages based on the contactId (assuming each message has a contactId field)
      const contactMessages = storedMessages.filter(msg => msg.contactId === contactId);
      
      setMessages(contactMessages);
      setLoading(false);
    };

    fetchMessagesFromDB();
  }, [contactId, fetchMessages]);

  const sendMessage = async (message) => {
    // Add contactId to message for proper identification
    const messageWithContact = { ...message, contactId };

    // Add message to local state
    setMessages((prev) => [...prev, messageWithContact]);

    // Store it in IndexedDB for offline use
    storeMessage(messageWithContact);
  };

  return { messages, loading, sendMessage };
};

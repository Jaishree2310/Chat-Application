import { useState, useEffect } from 'react';
import { useIndexedDB } from './useIndexedDB';  

export const useInstantDB = (contactId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchMessages, storeMessage } = useIndexedDB();

  useEffect(() => {
    const fetchMessagesFromDB = async () => {
      if (!contactId) return;

      setLoading(true);
     
      const storedMessages = await fetchMessages();
      
      const contactMessages = storedMessages.filter(msg => msg.contactId === contactId);
      
      setMessages(contactMessages);
      setLoading(false);
    };

    fetchMessagesFromDB();
  }, [contactId, fetchMessages]);

  const sendMessage = async (message) => {
    const messageWithContact = { ...message, contactId };

    setMessages((prev) => [...prev, messageWithContact]);

    storeMessage(messageWithContact);
  };

  return { messages, loading, sendMessage };
};




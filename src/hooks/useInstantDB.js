import { useState, useEffect } from 'react';
import { useIndexedDB } from './useIndexedDB';

export const useInstantDB = (contactId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { storeMessage, fetchMessages } = useIndexedDB();

  useEffect(() => {
    const fetchMessagesFromDB = async () => {
      if (!contactId) return;

      setLoading(true);

      const storedMessages = await fetchMessages();
      console.log('Fetched messages:', storedMessages);

      if (storedMessages) {
        const contactMessages = [];

        for (let i = 0; i < storedMessages.length; i++) {
          const msg = storedMessages[i];
          console.log('msg', msg); 
          // Ensure contactId is compared as numbers (parse both values)
          if (parseInt(msg.contactId) === parseInt(contactId)) {
            contactMessages.push(msg);
          }
        }

        console.log('Filtered messages for contactId:', contactId, contactMessages);
        setMessages(contactMessages);
      } else {
        console.log('No messages found or storedMessages is not an array.');
      }

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

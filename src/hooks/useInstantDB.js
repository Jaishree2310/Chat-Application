import { useState, useEffect } from 'react';

export const useInstantDB = (contactId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(false);
    };

    fetchMessages();
  }, [contactId]);

  const sendMessage = async (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return { messages, loading, sendMessage };
};

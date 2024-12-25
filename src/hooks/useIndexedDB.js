import { useEffect } from 'react';

export const useIndexedDB = () => {
  useEffect(() => {
    const initDB = async () => {
      const request = indexedDB.open('WhatsAppClone', 1);
      
      request.onerror = (event) => {
        console.error('IndexedDB error:', event.target.error);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('messages')) {
          db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
        }
      };
    };

    initDB();
  }, []);

  const storeMessage = async (message) => {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open('WhatsAppClone', 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    const transaction = db.transaction(['messages'], 'readwrite');
    const store = transaction.objectStore('messages');
    store.add(message);
  };

  return { storeMessage };
};
// import { useEffect } from 'react';

// export const useIndexedDB = () => {
//   useEffect(() => {
//     const initDB = async () => {
//       const request = indexedDB.open('WhatsAppClone', 1);

//       request.onerror = (event) => {
//         console.error('IndexedDB error:', event.target.error);
//       };

//       request.onupgradeneeded = (event) => {
//         const db = event.target.result;
//         if (!db.objectStoreNames.contains('messages')) {
//           db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
//         }
//       };
//     };

//     initDB();
//   }, []);

//   const storeMessage = async (message) => {
//     const db = await new Promise((resolve, reject) => {
//       const request = indexedDB.open('WhatsAppClone', 1);
//       request.onsuccess = () => resolve(request.result);
//       request.onerror = () => reject(request.error);
//     });

//     const transaction = db.transaction(['messages'], 'readwrite');
//     const store = transaction.objectStore('messages');
//     store.add(message);
//   };

//   const fetchMessages = async () => {
//     const db = await new Promise((resolve, reject) => {
//       const request = indexedDB.open('WhatsAppClone', 1);
//       request.onsuccess = () => resolve(request.result);
//       request.onerror = () => reject(request.error);
//     });

//     const transaction = db.transaction(['messages'], 'readonly');
//     const store = transaction.objectStore('messages');
//     const allMessages = [];
//     const request = store.openCursor();

//     request.onsuccess = (event) => {
//       const cursor = event.target.result;
//       if (cursor) {
//         allMessages.push(cursor.value);
//         cursor.continue();
//       } else {
//         // console.log('Fetched all messages:', allMessages);
//       }
//     };

//     return allMessages;
//   };

//   return { storeMessage, fetchMessages };
// };


















// import { init, tx, id } from "@instantdb/react";


import { useState } from 'react';

export const useIndexedDB = () => {
  const [db, setDb] = useState(null);

  // Open IndexedDB
  const openDB = async () => {
    if (db) return db;

    const request = indexedDB.open('ChatAppDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('messages')) {
        db.createObjectStore('messages', { keyPath: 'id' });
      }
    };

    request.onerror = (error) => {
      console.error('IndexedDB Error:', error);
    };

    request.onsuccess = (event) => {
      setDb(event.target.result);
    };

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      request.onerror = reject;
    });
  };

  // Store a message
  const storeMessage = async (message) => {
    const db = await openDB();
    const transaction = db.transaction(['messages'], 'readwrite');
    const store = transaction.objectStore('messages');
    store.add(message);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = resolve;
      transaction.onerror = reject;
    });
  };

  // Fetch all messages
  const fetchMessages = async () => {
    const db = await openDB();
    const transaction = db.transaction(['messages'], 'readonly');
    const store = transaction.objectStore('messages');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = reject;
    });
  };

  return { storeMessage, fetchMessages };
};

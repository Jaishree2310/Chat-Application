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

//   return { storeMessage };
// };













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

  const fetchMessages = async () => {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open('WhatsAppClone', 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    const transaction = db.transaction(['messages'], 'readonly');
    const store = transaction.objectStore('messages');
    const allMessages = [];
    const request = store.openCursor();

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        allMessages.push(cursor.value);
        cursor.continue();
      } else {
        console.log('Fetched all messages:', allMessages);
      }
    };

    return allMessages;
  };

  return { storeMessage, fetchMessages };
};

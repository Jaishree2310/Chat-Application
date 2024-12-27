// import { useState, useEffect } from 'react';
// import { useIndexedDB } from './useIndexedDB';  

// export const useInstantDB = (contactId) => {
//   console.log(typeof(contactId))
//   const [messages, setMessages] = useState([]);
  
//   const [loading, setLoading] = useState(true);
//   const { storeMessage, fetchMessages } = useIndexedDB();

//   useEffect(() => {
//     // console.log(contactId)
//     // const fetchMessagesFromDB = async () => {
//     //   if (!contactId) return;

//     //   setLoading(true);
     
//     //   const storedMessages = await fetchMessages();
//     //   console.log(storedMessages)
//     //   const contactMessages = storedMessages.filter(msg => msg.contactId === contactId);
//     //   console.log('Filtered messages for contactId:', contactId, contactMessages);

//     //   setMessages(contactMessages);
//     //   // console.log("contactMessages", contactMessages )
//     //   setLoading(false);
//     // };



//     // const fetchMessagesFromDB = async () => {
//     //   if (!contactId) return;
    
//     //   setLoading(true);
      
//     //   const storedMessages = await fetchMessages();
//     //   console.log('Fetched messages:', storedMessages);
    
//     //   // if (storedMessages ) {
//     //   //   const contactMessages = storedMessages.filter(msg => {console.log("msg", msg)});
//     //   //   console.log('Filtered messages for contactId:', contactId, contactMessages);
//     //   //   setMessages(contactMessages);
//     //   // } else {
//     //   //   console.log('No messages found or incorrect data format.');
//     //   // }


//     //   if (storedMessages) {
//     //     const contactMessages = [];
        
//     //     for (let i = 0; i < storedMessages.length; i++) {
//     //       const msg = storedMessages[i];
//     //       console.log("msg", msg); 
//     //       if (msg.contactId == contactId) {
//     //         contactMessages.push(msg);
//     //       }
//     //     }
      
//     //     console.log('Filtered messages for contactId:', contactId, contactMessages);
//     //     setMessages(contactMessages);
//     //   } else {
//     //     console.log('No messages found or incorrect data format.');
//     //   }
      
      
    
//     //   setLoading(false);
//     // };
    



//     const fetchMessagesFromDB = async () => {
//       if (!contactId) return;
    
//       setLoading(true);
    
//       const storedMessages = await fetchMessages();
//       console.log('Fetched messages:', storedMessages); // Log the fetched messages
    
//       if (Array.isArray(storedMessages)) {
//         const contactMessages = [];
    
//         for (let i = 0; i < storedMessages.length; i++) {
//           const msg = storedMessages[i];
//           console.log("msg", msg); // Log each message to check its structure
//           // Ensure contactId is compared as numbers (parse both values)
//           if (parseInt(msg.contactId) === parseInt(contactId)) {
//             contactMessages.push(msg);
//           }
//         }
    
//         console.log('Filtered messages for contactId:', contactId, contactMessages);
//         setMessages(contactMessages);
//       } else {
//         console.log('No messages found or storedMessages is not an array.');
//       }
    
//       setLoading(false);
//     };
    

//     fetchMessagesFromDB();
//   }, [contactId, fetchMessages]);

//   const sendMessage = async (message) => {
//     const messageWithContact = { ...message, contactId };

//     setMessages((prev) => [...prev, messageWithContact]);

//     storeMessage(messageWithContact);
//   };

//   return { messages, loading, sendMessage };
// };

















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

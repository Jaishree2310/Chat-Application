# Documentation for Chat Application

## **Introduction**
This Chat Application enables real-time messaging between users. It is built with React and InstantDB for data storage and retrieval. The app includes features such as contact management, chat windows, message input, and more.

---

## **File Structure**

```
/src
|-- components
|   |-- ChatWindow.js
|   |-- ContactList.js
|   |-- MessageInput.js
|-- context
|   |-- AppContext.js
|-- styles
|   |-- App.css
|-- App.js
```

---

## **Components**

### **ChatWindow**

**File Path:** `src/components/ChatWindow.js`

This component renders the chat interface for the selected contact, displaying messages and providing a message input field.

#### **Key Features:**
- Displays a list of messages in a conversation.
- Allows users to send messages.
- Automatically scrolls to the latest message.

#### **Props:**
- No external props.

#### **State Management:**
Uses `useApp` to manage state and fetch data.

#### **Methods:**
- `addMessage(message)` - Adds a new message to the database.
- `handleSendMessage(e)` - Handles sending messages.
- `scrollToBottom()` - Scrolls to the most recent message.

---

### **ContactList**

**File Path:** `src/components/ContactList.js`

This component displays a list of contacts and their last message.

#### **Key Features:**
- Fetches and displays the last message for each contact.
- Highlights the selected contact.
- Updates the last message in the contact list dynamically.

#### **State Management:**
Uses `useApp` to access and modify the app's global state.

#### **Methods:**
- Filters messages to identify the latest for each contact.

---

### **MessageInput**

**File Path:** `src/components/MessageInput.js`

This component provides an input field and file upload option for sending messages.

#### **Key Features:**
- Enables users to send text messages.
- Includes a `FileUpload` component for attachments.

#### **Props:**
- No external props.

#### **Methods:**
- `handleSend()` - Handles sending messages and updating the last message.

---

### **App.js**

**File Path:** `src/App.js`

The main entry point of the application. It sets up the layout, providing a container for the `ContactList` and `ChatWindow` components.

#### **Key Features:**
- Provides the app layout.
- Wraps components with `AppProvider` for global state management.

---

## **Context**

### **AppContext**

Manages the application's global state, including contacts, selected contact, and messages.

#### **Key Features:**
- Provides global state via `useApp`.
- Handles dispatch actions like setting the selected contact and updating the last message.

#### **State Variables:**
- `contacts` - List of user contacts.
- `selectedContact` - Currently selected contact.
- `currentUser` - Details of the logged-in user.
- `db` - InstantDB instance for database operations.

---

## **Hooks and Context Usage**

### **Hooks**
- **useState:** Used for managing component-level states, such as the message input value in `MessageInput`.
- **useEffect:** Handles side effects, such as fetching messages or updating the contact list.
- **useReducer:** Manages complex state transitions in `AppContext` to handle actions like updating the last message or setting the selected contact.

### **Context**
- The `AppContext` provides global state management, enabling seamless communication between components like `ContactList`, `ChatWindow`, and `MessageInput`.

---

## **Custom Hooks**

If applicable, custom hooks can encapsulate reusable logic, such as fetching data from InstantDB or managing authentication. Although not explicitly used in this project, the structure supports their addition.

---

## **Database Integration**

### **InstantDB**

The application uses InstantDB for real-time data storage and retrieval. Key functions include:
- `db.useQuery` - Fetches data based on specified queries.
- `db.transact` - Updates or inserts new data.

#### **Data Structure:**
- **Messages**:
  - `id` (string): Unique message ID.
  - `content` (string): Message content.
  - `timestamp` (number): Message timestamp.
  - `senderId` (string): ID of the sender.
  - `receiverId` (string): ID of the receiver.
  - `conversationId` (string): Unique identifier for conversations.

---

### **IndexedDB Usage**

Although InstantDB abstracts much of the database interaction, it uses IndexedDB under the hood for offline-first capabilities and fast local queries.

---

## **Styles**

**File Path:** `src/styles/App.css`

Defines the visual style for the application, including:
- Contact list layout.
- Chat window appearance.
- Input fields and buttons.

---

## **How It Works**

1. **Contact Selection:**
   - User selects a contact from the `ContactList`.
   - The selected contact's ID is stored in the global state.

2. **Message Fetching:**
   - `ChatWindow` fetches messages between the current user and the selected contact.

3. **Message Sending:**
   - User enters a message in the `MessageInput` field.
   - The message is saved in InstantDB and displayed in real time.

4. **Last Message Update:**
   - The last message for each contact is updated dynamically in the `ContactList`.

---

## **Dependencies**

- `React`
- `InstantDB`
- `lucide-react`

---

## **Acknowledgements**
This application was designed to demonstrate real-time messaging capabilities using modern web technologies.

# WhatsApp Web-like Application

A React.js-based application that mimics WhatsApp Web with real-time messaging and offline capabilities.

## Live: https://chat-application-orpin-eight.vercel.app/

## Complete Documentation is provided in the doc.md file 

## Features
- **Contact List**: Displays contacts on the left side.
- **Chat Window**: Displays chat history with a selected contact.
- **Message Field**: Send new messages.
- **Real-Time Messaging**: Uses InstantDB for real-time message storage and retrieval.
- **Offline Support**: Stores data in IndexedDB for offline capabilities.

## Technologies Used
- **Frontend**: React.js, Hooks (`useState`, `useEffect`, `useReducer`, `useContext`)
- **Database**: InstantDB (Real-time), IndexedDB (Offline)
- **Styling**: CSS, Flexbox, Grid, Animations

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Jaishree2310/whatsapp-web-clone.git
   cd whatsapp-web-clone
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure InstantDB**:
   - Create an account at [InstantDB](https://www.instantdb.com/).
   - Add your InstantDB API key to `.env`:
     ```bash
     REACT_APP_INSTANTDB_API_KEY=your-api-key
     ```

4. **Run the Application**:
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Build for Production**:
   ```bash
   npm run build
   # or
   yarn build
   ```

## Key Features

- **useState & useEffect**: Manage local state and handle data fetching.
- **useReducer & useContext**: Manage global state for contacts and messages.
- **Custom Hooks**: Handle InstantDB and IndexedDB interactions.

## Challenges
- **Real-Time Sync**: Implemented with InstantDB for live message updates.
- **Offline Storage**: IndexedDB ensures messages are available offline.

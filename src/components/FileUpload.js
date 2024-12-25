import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';

export const FileUpload = () => {
  const fileInputRef = useRef(null);
  const { state, dispatch } = useApp();

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    try {
      // Convert file to base64 for storage
      const base64 = await fileToBase64(file);
      
      const fileMessage = {
        type: 'file',
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileData: base64,
        timestamp: new Date().toLocaleTimeString(),
        isSent: true,
        contactId: state.selectedContact.id,
      };

      dispatch({
        type: 'ADD_MESSAGE',
        payload: { contactId: state.selectedContact.id, message: fileMessage },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        accept="image/*,.pdf,.doc,.docx"
      />
      <button 
        className="attach-file"
        onClick={() => fileInputRef.current.click()}
      >
        📎
      </button>
    </div>
  );
};












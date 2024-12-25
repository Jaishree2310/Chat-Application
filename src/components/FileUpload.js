import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

export const FileUpload = () => {
  const fileInputRef = useRef(null);
  const { state, dispatch } = useApp();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [filePreview, setFilePreview] = useState(null);  // For image previews

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      
      const base64 = await fileToBase64(file);

      if (file.type.startsWith('image/')) {
        setFilePreview(base64);
      }

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
      
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setError('Error uploading file. Please try again.');
      console.error('Error uploading file:', error);
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
        disabled={uploading}
      >
        📎
      </button>

      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
};


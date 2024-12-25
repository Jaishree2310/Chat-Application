import React from 'react';

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};

export const Message = ({ message }) => {
  const renderMessageContent = () => {
    if (message.type === 'file') {
      if (message.fileType.startsWith('image/')) {
        return (
          <div className="file-message">
            <img 
              src={message.fileData} 
              alt={`Preview of ${message.fileName}`} 
              className="image-preview"
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }} 
            />
            <div className="file-info">
              <span>{message.fileName}</span>
              <span>{formatFileSize(message.fileSize)}</span>
            </div>
          </div>
        );
      } else {
        return (
          <div className="file-message">
            <div className="file-icon">📄</div>
            <div className="file-info">
              <span>{message.fileName}</span>
              <span>{formatFileSize(message.fileSize)}</span>
            </div>
            <a 
              href={message.fileData} 
              download={message.fileName}
              className="download-button"
              style={{ textDecoration: 'none', color: 'inherit' }} 
            >
            </a>
          </div>
        );
      }
    }
    
    return <p>{message.text}</p>; 
  };

  return (
    <div className={`message ${message.isSent ? 'sent' : 'received'}`}>
      <div className="message-content">
        {renderMessageContent()}
        <span className="message-time">{message.timestamp}</span>
      </div>
    </div>
  );
};

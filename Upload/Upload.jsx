import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const Upload = ({
  title = "Glissez vos fichiers ici",
  description = "ou cliquez pour sélectionner",
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  disabled = false,
  onFileSelect,
  onFileRemove,
  onUploadComplete,
  onError,
  className = "",
  size = "medium",
  variant = "default",
  showProgress = true,
  showFileList = true,
  customIcon,
  children
}) => {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const uploadZoneRef = useRef(null);

  // Validation des fichiers
  const validateFile = useCallback((file) => {
    // Vérification du type
    if (accept && !accept.split(',').some(type => {
      const trimmedType = type.trim();
      if (trimmedType.startsWith('.')) {
        return file.name.toLowerCase().endsWith(trimmedType);
      }
      return file.type.match(new RegExp(trimmedType.replace('*', '.*')));
    })) {
      throw new Error(`Type de fichier non supporté. Types acceptés: ${accept}`);
    }

    // Vérification de la taille
    if (maxSize && file.size > maxSize) {
      throw new Error(`Fichier trop volumineux. Taille maximale: ${formatFileSize(maxSize)}`);
    }

    return true;
  }, [accept, maxSize]);

  // Formatage de la taille de fichier
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Gestion de la sélection de fichiers
  const handleFileSelect = useCallback((selectedFiles) => {
    setError(null);
    const fileArray = Array.from(selectedFiles);
    
    // Vérification du nombre de fichiers
    if (maxFiles && files.length + fileArray.length > maxFiles) {
      setError(`Nombre maximum de fichiers dépassé (${maxFiles})`);
      return;
    }

    const validFiles = [];
    const errors = [];

    fileArray.forEach(file => {
      try {
        validateFile(file);
        validFiles.push({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'pending',
          progress: 0
        });
      } catch (err) {
        errors.push(`${file.name}: ${err.message}`);
      }
    });

    if (errors.length > 0) {
      setError(errors.join(', '));
    }

    if (validFiles.length > 0) {
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      
      if (onFileSelect) {
        onFileSelect(validFiles.map(f => f.file), newFiles);
      }
    }
  }, [files, multiple, maxFiles, validateFile, onFileSelect]);

  // Gestion du drag & drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!disabled && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [disabled, handleFileSelect]);

  // Gestion du clic sur la zone
  const handleZoneClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  // Gestion du changement d'input file
  const handleInputChange = useCallback((e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  }, [handleFileSelect]);

  // Suppression d'un fichier
  const handleFileRemove = useCallback((fileId) => {
    const fileToRemove = files.find(f => f.id === fileId);
    setFiles(files.filter(f => f.id !== fileId));
    
    if (onFileRemove && fileToRemove) {
      onFileRemove(fileToRemove.file);
    }
  }, [files, onFileRemove]);

  // Simulation d'upload (à remplacer par votre logique d'upload)
  const simulateUpload = useCallback(async (fileItem) => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => resolve(), 500);
        }
        
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, progress, status: progress === 100 ? 'success' : 'uploading' }
            : f
        ));
      }, 200);
    });
  }, []);

  // Upload de tous les fichiers
  const uploadFiles = useCallback(async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setError(null);
    
    try {
      const uploadPromises = files
        .filter(f => f.status === 'pending')
        .map(simulateUpload);
      
      await Promise.all(uploadPromises);
      
      if (onUploadComplete) {
        onUploadComplete(files.map(f => f.file));
      }
    } catch (err) {
      setError('Erreur lors de l\'upload');
      if (onError) {
        onError(err);
      }
    } finally {
      setUploading(false);
    }
  }, [files, onUploadComplete, onError, simulateUpload]);

  // Icône par défaut
  const defaultIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7,10 12,15 17,10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );

  // Classes CSS
  const uploadClasses = [
    'ui-upload',
    size !== 'medium' && `ui-upload--${size}`,
    variant !== 'default' && `ui-upload--${variant}`,
    className
  ].filter(Boolean).join(' ');

  const zoneClasses = [
    'ui-upload-zone',
    isDragOver && 'dragover',
    disabled && 'disabled'
  ].filter(Boolean).join(' ');

  return (
    <div className={uploadClasses}>
      <div
        ref={uploadZoneRef}
        className={zoneClasses}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleZoneClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="ui-upload-input"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
        />
        
        <div className="ui-upload-icon">
          {customIcon || defaultIcon}
        </div>
        
        <div className="ui-upload-title">{title}</div>
        <div className="ui-upload-description">{description}</div>
        
        {children}
      </div>

      {error && (
        <div className="ui-upload-error">{error}</div>
      )}

      {showFileList && files.length > 0 && (
        <div className="ui-upload-files">
          {files.map((fileItem) => (
            <div key={fileItem.id} className={`ui-upload-file ${fileItem.status}`}>
              <div className="ui-upload-file-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </div>
              
              <div className="ui-upload-file-info">
                <div className="ui-upload-file-name">{fileItem.name}</div>
                <div className="ui-upload-file-size">{formatFileSize(fileItem.size)}</div>
                
                {showProgress && fileItem.status === 'uploading' && (
                  <div className="ui-upload-progress">
                    <div 
                      className="ui-upload-progress-bar"
                      style={{ width: `${fileItem.progress}%` }}
                    />
                  </div>
                )}
              </div>
              
              <div className="ui-upload-file-actions">
                {fileItem.status === 'success' && (
                  <button className="ui-upload-file-action">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </button>
                )}
                
                <button 
                  className="ui-upload-file-action delete"
                  onClick={() => handleFileRemove(fileItem.id)}
                  disabled={fileItem.status === 'uploading'}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6" />
                    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && !uploading && (
        <button 
          className="ui-upload-button"
          onClick={uploadFiles}
          disabled={disabled}
        >
          {uploading ? 'Upload en cours...' : 'Démarrer l\'upload'}
        </button>
      )}

      {uploading && (
        <div className="ui-upload-loading">
          <div className="ui-spinner" />
          <span>Upload en cours...</span>
        </div>
      )}
    </div>
  );
};

Upload.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  maxFiles: PropTypes.number,
  disabled: PropTypes.bool,
  onFileSelect: PropTypes.func,
  onFileRemove: PropTypes.func,
  onUploadComplete: PropTypes.func,
  onError: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'bordered', 'rounded', 'compact']),
  showProgress: PropTypes.bool,
  showFileList: PropTypes.bool,
  customIcon: PropTypes.node,
  children: PropTypes.node
};

export default Upload;



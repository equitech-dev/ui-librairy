import React, { useState, useRef } from 'react';

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: 'idle' | 'uploading' | 'success' | 'error' }>({});
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles(prev => [...prev, ...newFiles]);
      
      // Simuler le statut d'upload pour chaque fichier
      newFiles.forEach(file => {
        setUploadStatus(prev => ({ ...prev, [file.name]: 'idle' }));
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const simulateUpload = (fileName: string) => {
    setUploadStatus(prev => ({ ...prev, [fileName]: 'uploading' }));
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadStatus(prev => ({ ...prev, [fileName]: 'success' }));
      }
      setUploadProgress(prev => ({ ...prev, [fileName]: Math.round(progress) }));
    }, 200);
  };

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
    setUploadStatus(prev => {
      const newStatus = { ...prev };
      delete newStatus[fileName];
      return newStatus;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'mp4':
      case 'avi':
      case 'mov':
        return '🎥';
      case 'mp3':
      case 'wav':
        return '🎵';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📁';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'uploading':
        return '⏳';
      default:
        return '⏸️';
    }
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Upload</h1>
        <p className="section-description">
          Composant d'upload de fichiers avec support du glisser-déposer, barres de progression, et gestion des erreurs. Permet aux utilisateurs de télécharger des fichiers de manière intuitive et de suivre l'avancement des uploads.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Upload basique</h3>
          <div className="demo-content">
            <p>Zone d'upload simple avec sélection de fichiers :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-upload-demo">
                <div className="ui-upload">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => handleFileSelect(e.target.files)}
                    style={{ display: 'none' }}
                  />
                  
                  <div className="ui-upload__zone">
                    <div className="ui-upload__icon">📁</div>
                    <h3 className="ui-upload__title">Glissez vos fichiers ici</h3>
                    <p className="ui-upload__description">
                      ou cliquez pour sélectionner des fichiers
                    </p>
                    <button
                      className="ui-button ui-button--primary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choisir des fichiers
                    </button>
                  </div>
                </div>
                
                {files.length > 0 && (
                  <div className="ui-upload__files">
                    <h4>Fichiers sélectionnés ({files.length})</h4>
                    {files.map(file => (
                      <div key={file.name} className="ui-upload__file">
                        <div className="ui-upload__file-info">
                          <span className="ui-upload__file-icon">
                            {getFileIcon(file.name)}
                          </span>
                          <div className="ui-upload__file-details">
                            <span className="ui-upload__file-name">{file.name}</span>
                            <span className="ui-upload__file-size">
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                        </div>
                        <button
                          className="ui-upload__file-remove"
                          onClick={() => removeFile(file.name)}
                          title="Supprimer"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Upload } from '@equitech-dev/ui-library';

const [files, setFiles] = useState([]);

<Upload
  multiple={true}
  accept=".pdf,.doc,.docx,.jpg,.png"
  onFileSelect={setFiles}
  maxSize={10 * 1024 * 1024} // 10MB
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Upload avec glisser-déposer</h3>
          <div className="demo-content">
            <p>Zone d'upload avec support du drag & drop :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-upload-demo">
                <div 
                  className={`ui-upload ui-upload--drag-drop ${dragActive ? 'ui-upload--drag-active' : ''}`}
                  onDragEnter={handleDragIn}
                  onDragLeave={handleDragOut}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="ui-upload__zone">
                    <div className="ui-upload__icon">
                      {dragActive ? '📥' : '📁'}
                    </div>
                    <h3 className="ui-upload__title">
                      {dragActive ? 'Déposez vos fichiers ici' : 'Glissez vos fichiers ici'}
                    </h3>
                    <p className="ui-upload__description">
                      ou cliquez pour sélectionner des fichiers
                    </p>
                    <button
                      className="ui-button ui-button--outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Parcourir
                    </button>
                  </div>
                </div>
                
                <div className="ui-upload__info">
                  <p><strong>Formats acceptés :</strong> PDF, DOC, DOCX, JPG, PNG, MP4</p>
                  <p><strong>Taille maximale :</strong> 10 MB par fichier</p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<DragDropUpload
  accept=".pdf,.doc,.docx,.jpg,.png,.mp4"
  maxSize={10 * 1024 * 1024}
  onFileSelect={handleFiles}
  onDragEnter={handleDragEnter}
  onDragLeave={handleDragLeave}
  onDrop={handleDrop}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Upload avec barre de progression</h3>
          <div className="demo-content">
            <p>Upload avec suivi de l'avancement et statuts :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-upload-demo">
                <div className="ui-upload">
                  <div className="ui-upload__zone">
                    <div className="ui-upload__icon">📁</div>
                    <h3 className="ui-upload__title">Sélectionnez des fichiers</h3>
                    <button
                      className="ui-button ui-button--primary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choisir des fichiers
                    </button>
                  </div>
                </div>
                
                {files.length > 0 && (
                  <div className="ui-upload__files">
                    <h4>Fichiers à uploader</h4>
                    {files.map(file => (
                      <div key={file.name} className="ui-upload__file ui-upload__file--with-progress">
                        <div className="ui-upload__file-info">
                          <span className="ui-upload__file-icon">
                            {getFileIcon(file.name)}
                          </span>
                          <div className="ui-upload__file-details">
                            <span className="ui-upload__file-name">{file.name}</span>
                            <span className="ui-upload__file-size">
                              {formatFileSize(file.size)}
                            </span>
                          </div>
                          <span className="ui-upload__file-status">
                            {getStatusIcon(uploadStatus[file.name] || 'idle')}
                          </span>
                        </div>
                        
                        <div className="ui-upload__progress">
                          <div className="ui-upload__progress-bar">
                            <div 
                              className="ui-upload__progress-fill"
                              style={{ width: `${uploadProgress[file.name] || 0}%` }}
                            />
                          </div>
                          <span className="ui-upload__progress-text">
                            {uploadProgress[file.name] || 0}%
                          </span>
                        </div>
                        
                        <div className="ui-upload__file-actions">
                          {uploadStatus[file.name] === 'idle' && (
                            <button
                              className="ui-button ui-button--small ui-button--primary"
                              onClick={() => simulateUpload(file.name)}
                            >
                              Démarrer
                            </button>
                          )}
                          <button
                            className="ui-upload__file-remove"
                            onClick={() => removeFile(file.name)}
                            title="Supprimer"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ProgressUpload
  files={files}
  onUpload={handleUpload}
  onProgress={handleProgress}
  onComplete={handleComplete}
  onError={handleError}
  showProgress={true}
  autoUpload={false}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Upload avec prévisualisation</h3>
          <div className="demo-content">
            <p>Upload avec aperçu des images et informations détaillées :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-upload-demo">
                <div className="ui-upload">
                  <div className="ui-upload__zone">
                    <div className="ui-upload__icon">🖼️</div>
                    <h3 className="ui-upload__title">Images et documents</h3>
                    <p className="ui-upload__description">
                      Glissez vos fichiers ou cliquez pour sélectionner
                    </p>
                    <button
                      className="ui-button ui-button--primary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Sélectionner
                    </button>
                  </div>
                </div>
                
                {files.length > 0 && (
                  <div className="ui-upload__files ui-upload__files--preview">
                    <h4>Fichiers sélectionnés</h4>
                    <div className="ui-upload__files-grid">
                      {files.map(file => (
                        <div key={file.name} className="ui-upload__file-preview">
                          <div className="ui-upload__preview-content">
                            {file.type.startsWith('image/') ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="ui-upload__preview-image"
                              />
                            ) : (
                              <div className="ui-upload__preview-placeholder">
                                {getFileIcon(file.name)}
                              </div>
                            )}
                          </div>
                          <div className="ui-upload__preview-info">
                            <span className="ui-upload__preview-name">{file.name}</span>
                            <span className="ui-upload__preview-size">
                              {formatFileSize(file.size)}
                            </span>
                            <span className="ui-upload__preview-type">
                              {file.type || 'Type inconnu'}
                            </span>
                          </div>
                          <button
                            className="ui-upload__preview-remove"
                            onClick={() => removeFile(file.name)}
                            title="Supprimer"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<PreviewUpload
  files={files}
  showPreview={true}
  previewSize="medium"
  onFileSelect={handleFiles}
  onFileRemove={handleRemove}
  accept="image/*,.pdf,.doc,.docx"
  maxFiles={10}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Upload avec validation</h3>
          <div className="demo-content">
            <p>Upload avec validation des types et tailles de fichiers :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-upload-demo">
                <div className="ui-upload ui-upload--validation">
                  <div className="ui-upload__zone">
                    <div className="ui-upload__icon">✅</div>
                    <h3 className="ui-upload__title">Fichiers validés</h3>
                    <p className="ui-upload__description">
                      Seuls les fichiers conformes seront acceptés
                    </p>
                    <button
                      className="ui-button ui-button--primary"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Vérifier et uploader
                    </button>
                  </div>
                </div>
                
                <div className="ui-upload__validation-rules">
                  <h4>Règles de validation :</h4>
                  <ul>
                    <li>✅ Formats acceptés : PDF, DOC, DOCX, JPG, PNG</li>
                    <li>✅ Taille maximale : 5 MB par fichier</li>
                    <li>✅ Nombre maximum : 5 fichiers</li>
                    <li>❌ Fichiers exécutables interdits</li>
                  </ul>
                </div>
                
                {files.length > 0 && (
                  <div className="ui-upload__files">
                    <h4>Validation des fichiers</h4>
                    {files.map(file => {
                      const isValid = file.size <= 5 * 1024 * 1024 && 
                                    !file.name.endsWith('.exe');
                      return (
                        <div 
                          key={file.name} 
                          className={`ui-upload__file ${isValid ? 'ui-upload__file--valid' : 'ui-upload__file--invalid'}`}
                        >
                          <div className="ui-upload__file-info">
                            <span className="ui-upload__file-icon">
                              {isValid ? '✅' : '❌'}
                            </span>
                            <div className="ui-upload__file-details">
                              <span className="ui-upload__file-name">{file.name}</span>
                              <span className="ui-upload__file-size">
                                {formatFileSize(file.size)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="ui-upload__file-validation">
                            {isValid ? (
                              <span className="ui-upload__validation-success">
                                Fichier valide
                              </span>
                            ) : (
                              <span className="ui-upload__validation-error">
                                {file.size > 5 * 1024 * 1024 ? 'Trop volumineux' : 'Format non autorisé'}
                              </span>
                            )}
                          </div>
                          
                          <button
                            className="ui-upload__file-remove"
                            onClick={() => removeFile(file.name)}
                            title="Supprimer"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<ValidatedUpload
  accept=".pdf,.doc,.docx,.jpg,.png"
  maxSize={5 * 1024 * 1024}
  maxFiles={5}
  validateFile={customValidation}
  onValidationError={handleValidationError}
  showValidationRules={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Upload avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes d'upload selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-upload-demo ui-upload-demo--variants">
                <div className="ui-upload-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <div className="ui-upload ui-upload--compact">
                    <div className="ui-upload__zone">
                      <span className="ui-upload__icon">📁</span>
                      <span className="ui-upload__title">Upload</span>
                    </div>
                  </div>
                </div>
                
                <div className="ui-upload-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-upload ui-upload--large">
                    <div className="ui-upload__zone">
                      <div className="ui-upload__icon">📁</div>
                      <h3 className="ui-upload__title">Zone d'upload large</h3>
                      <p className="ui-upload__description">Description détaillée</p>
                    </div>
                  </div>
                </div>
                
                <div className="ui-upload-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bordered</h4>
                  <div className="ui-upload ui-upload--bordered">
                    <div className="ui-upload__zone">
                      <span className="ui-upload__icon">📁</span>
                      <span className="ui-upload__title">Upload bordé</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Upload variant="compact" />
<Upload variant="large" />
<Upload variant="bordered" />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Upload :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>multiple</strong> : boolean (sélection multiple de fichiers)</li>
                <li><strong>accept</strong> : string (types de fichiers acceptés)</li>
                <li><strong>maxSize</strong> : number (taille maximale en bytes)</li>
                <li><strong>maxFiles</strong> : number (nombre maximum de fichiers)</li>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "bordered"</li>
              </ul>
              
              <h4>Props d'interaction :</h4>
              <ul>
                <li><strong>onFileSelect</strong> : (files: File[]) =&gt; void</li>
                <li><strong>onFileRemove</strong> : (file: File) =&gt; void</li>
                <li><strong>onUpload</strong> : (files: File[]) =&gt; void</li>
                <li><strong>onProgress</strong> : (progress: number, file: File) =&gt; void</li>
                <li><strong>onError</strong> : (error: Error, file: File) =&gt; void</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>dragDrop</strong> : boolean (activation du glisser-déposer)</li>
                <li><strong>showProgress</strong> : boolean (affichage des barres de progression)</li>
                <li><strong>showPreview</strong> : boolean (aperçu des fichiers)</li>
                <li><strong>previewSize</strong> : "small" | "medium" | "large"</li>
                <li><strong>autoUpload</strong> : boolean (upload automatique)</li>
                <li><strong>className</strong> : string (classe CSS personnalisée)</li>
                <li><strong>style</strong> : object (styles inline personnalisés)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>DragDropUpload</strong> : Upload avec glisser-déposer</li>
                <li><strong>ProgressUpload</strong> : Upload avec barres de progression</li>
                <li><strong>PreviewUpload</strong> : Upload avec aperçu des fichiers</li>
                <li><strong>ValidatedUpload</strong> : Upload avec validation</li>
                <li><strong>MultiUpload</strong> : Upload multiple avancé</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onDragEnter</strong> : (e: DragEvent) =&gt; void</li>
                <li><strong>onDragLeave</strong> : (e: DragEvent) =&gt; void</li>
                <li><strong>onDragOver</strong> : (e: DragEvent) =&gt; void</li>
                <li><strong>onDrop</strong> : (e: DragEvent) =&gt; void</li>
                <li><strong>onFileTypeError</strong> : (file: File) =&gt; void</li>
                <li><strong>onFileSizeError</strong> : (file: File) =&gt; void</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Cas d'usage courants</h3>
          <div className="demo-content">
            <p>Exemples d'utilisation dans des contextes réels :</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Formulaires de contact</h4>
                <p>Upload de pièces jointes et documents.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Galerie d'images</h4>
                <p>Upload multiple d'images avec prévisualisation.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Documents professionnels</h4>
                <p>Upload de CV, portfolios et documents de travail.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;



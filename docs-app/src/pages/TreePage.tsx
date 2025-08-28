import React, { useState } from 'react';

const TreePage: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root', 'root-1', 'root-2']));
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set(['root-1-1']));
  const [checkedNodes, setCheckedNodes] = useState<Set<string>>(new Set(['root-1-1', 'root-2-1']));

  const toggleExpanded = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleSelected = (nodeId: string) => {
    const newSelected = new Set(selectedNodes);
    if (newSelected.has(nodeId)) {
      newSelected.delete(nodeId);
    } else {
      newSelected.add(nodeId);
    }
    setSelectedNodes(newSelected);
  };

  const toggleChecked = (nodeId: string) => {
    const newChecked = new Set(checkedNodes);
    if (newChecked.has(nodeId)) {
      newChecked.delete(nodeId);
    } else {
      newChecked.add(nodeId);
    }
    setCheckedNodes(newChecked);
  };

  const treeData = [
    {
      id: 'root-1',
      label: 'Documents',
      icon: '📁',
      children: [
        {
          id: 'root-1-1',
          label: 'Travail',
          icon: '💼',
          children: [
            { id: 'root-1-1-1', label: 'Rapport Q1.pdf', icon: '📄' },
            { id: 'root-1-1-2', label: 'Présentation.pptx', icon: '📊' },
            { id: 'root-1-1-3', label: 'Budget.xlsx', icon: '💰' }
          ]
        },
        {
          id: 'root-1-2',
          label: 'Personnel',
          icon: '👤',
          children: [
            { id: 'root-1-2-1', label: 'Photos', icon: '📷' },
            { id: 'root-1-2-2', label: 'CV.pdf', icon: '📋' }
          ]
        }
      ]
    },
    {
      id: 'root-2',
      label: 'Applications',
      icon: '💻',
      children: [
        {
          id: 'root-2-1',
          label: 'Développement',
          icon: '⚙️',
          children: [
            { id: 'root-2-1-1', label: 'VSCode', icon: '🔧' },
            { id: 'root-2-1-2', label: 'Git', icon: '📚' },
            { id: 'root-2-1-3', label: 'Docker', icon: '🐳' }
          ]
        },
        {
          id: 'root-2-2',
          label: 'Design',
          icon: '🎨',
          children: [
            { id: 'root-2-2-1', label: 'Figma', icon: '🎯' },
            { id: 'root-2-2-2', label: 'Photoshop', icon: '🖼️' }
          ]
        }
      ]
    },
    {
      id: 'root-3',
      label: 'Système',
      icon: '⚙️',
      children: [
        { id: 'root-3-1', label: 'Windows', icon: '🪟' },
        { id: 'root-3-2', label: 'Program Files', icon: '📦' },
        { id: 'root-3-3', label: 'Users', icon: '👥' }
      ]
    }
  ];

  const renderTreeNode = (node: any, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNodes.has(node.id);
    const isChecked = checkedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="ui-tree__node">
        <div 
          className={`ui-tree__node-content ${isSelected ? 'ui-tree__node-content--selected' : ''}`}
          style={{ paddingLeft: `${level * 1.5}rem` }}
        >
          {hasChildren && (
            <button
              className={`ui-tree__toggle ${isExpanded ? 'ui-tree__toggle--expanded' : ''}`}
              onClick={() => toggleExpanded(node.id)}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          
          {!hasChildren && <div className="ui-tree__toggle-placeholder" />}
          
          <div className="ui-tree__checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => toggleChecked(node.id)}
            />
          </div>
          
          <div className="ui-tree__icon">{node.icon}</div>
          
          <span 
            className="ui-tree__label"
            onClick={() => toggleSelected(node.id)}
          >
            {node.label}
          </span>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ui-tree__children">
            {node.children.map((child: any) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const fileTreeData = [
    {
      id: 'src',
      label: 'src',
      icon: '📁',
      type: 'folder',
      children: [
        {
          id: 'src-components',
          label: 'components',
          icon: '📁',
          type: 'folder',
          children: [
            { id: 'src-components-button', label: 'Button.tsx', icon: '📄', type: 'file' },
            { id: 'src-components-card', label: 'Card.tsx', icon: '📄', type: 'file' },
            { id: 'src-components-input', label: 'Input.tsx', icon: '📄', type: 'file' }
          ]
        },
        {
          id: 'src-pages',
          label: 'pages',
          icon: '📁',
          type: 'folder',
          children: [
            { id: 'src-pages-home', label: 'Home.tsx', icon: '📄', type: 'file' },
            { id: 'src-pages-about', label: 'About.tsx', icon: '📄', type: 'file' }
          ]
        },
        {
          id: 'src-styles',
          label: 'styles',
          icon: '📁',
          type: 'folder',
          children: [
            { id: 'src-styles-main', label: 'main.scss', icon: '🎨', type: 'file' },
            { id: 'src-styles-variables', label: 'variables.scss', icon: '🎨', type: 'file' }
          ]
        }
      ]
    }
  ];

  const renderFileTreeNode = (node: any, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isFile = node.type === 'file';

    return (
      <div key={node.id} className="ui-tree__node">
        <div 
          className={`ui-tree__node-content ui-tree__node-content--file`}
          style={{ paddingLeft: `${level * 1.5}rem` }}
        >
          {hasChildren && (
            <button
              className={`ui-tree__toggle ${isExpanded ? 'ui-tree__toggle--expanded' : ''}`}
              onClick={() => toggleExpanded(node.id)}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          
          {!hasChildren && <div className="ui-tree__toggle-placeholder" />}
          
          <div className={`ui-tree__icon ui-tree__icon--${node.type}`}>
            {node.icon}
          </div>
          
          <span className="ui-tree__label">
            {node.label}
          </span>
          
          {isFile && (
            <div className="ui-tree__file-info">
              <span className="ui-tree__file-size">2.3 KB</span>
              <span className="ui-tree__file-date">2024-01-15</span>
            </div>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ui-tree__children">
            {node.children.map((child: any) => renderFileTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const searchTreeData = [
    {
      id: 'search-1',
      label: 'Recherche globale',
      icon: '🔍',
      children: [
        {
          id: 'search-1-1',
          label: 'Filtres actifs',
          icon: '✅',
          children: [
            { id: 'search-1-1-1', label: 'Type: Document', icon: '📄' },
            { id: 'search-1-1-2', label: 'Date: Cette semaine', icon: '📅' }
          ]
        },
        {
          id: 'search-1-2',
          label: 'Résultats',
          icon: '📊',
          children: [
            { id: 'search-1-2-1', label: 'Rapport Q1.pdf', icon: '📄' },
            { id: 'search-1-2-2', label: 'Présentation.pptx', icon: '📊' }
          ]
        }
      ]
    }
  ];

  const renderSearchTreeNode = (node: any, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="ui-tree__node">
        <div 
          className="ui-tree__node-content ui-tree__node-content--search"
          style={{ paddingLeft: `${level * 1.5}rem` }}
        >
          {hasChildren && (
            <button
              className={`ui-tree__toggle ${isExpanded ? 'ui-tree__toggle--expanded' : ''}`}
              onClick={() => toggleExpanded(node.id)}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          
          {!hasChildren && <div className="ui-tree__toggle-placeholder" />}
          
          <div className="ui-tree__icon">{node.icon}</div>
          
          <span className="ui-tree__label">
            {node.label}
          </span>
          
          {!hasChildren && (
            <div className="ui-tree__search-actions">
              <button className="ui-tree__action-btn" title="Ouvrir">👁️</button>
              <button className="ui-tree__action-btn" title="Télécharger">⬇️</button>
            </div>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ui-tree__children">
            {node.children.map((child: any) => renderSearchTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">Tree</h1>
        <p className="section-description">
          Composant d'arborescence pour afficher des structures hiérarchiques de données. Permet de naviguer et d'interagir avec des données organisées en arbre, comme des systèmes de fichiers, des menus ou des structures organisationnelles.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">Tree basique</h3>
          <div className="demo-content">
            <p>Tree simple avec nœuds expansibles et sélectionnables :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tree-demo">
                <div className="ui-tree">
                  {treeData.map(node => renderTreeNode(node))}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <div className="ui-tree__info">
                    <p><strong>Nœuds développés :</strong> {Array.from(expandedNodes).join(', ')}</p>
                    <p><strong>Nœuds sélectionnés :</strong> {Array.from(selectedNodes).join(', ')}</p>
                    <p><strong>Nœuds cochés :</strong> {Array.from(checkedNodes).join(', ')}</p>
                  </div>
                  
                  <div style={{ marginTop: '1rem' }}>
                    <button
                      className="ui-button ui-button--outline"
                      onClick={() => setExpandedNodes(new Set())}
                    >
                      Réduire tout
                    </button>
                    <button
                      className="ui-button ui-button--outline"
                      style={{ marginLeft: '0.5rem' }}
                      onClick={() => setSelectedNodes(new Set())}
                    >
                      Désélectionner tout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { Tree } from '@equitech-dev/ui-library';

const [expandedNodes, setExpandedNodes] = useState(new Set());
const [selectedNodes, setSelectedNodes] = useState(new Set());

<Tree
  data={treeData}
  expandedNodes={expandedNodes}
  selectedNodes={selectedNodes}
  onToggleExpanded={setExpandedNodes}
  onToggleSelected={setSelectedNodes}
  selectable={true}
  expandable={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tree avec checkboxes</h3>
          <div className="demo-content">
            <p>Tree avec sélection multiple via checkboxes :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tree-demo">
                <div className="ui-tree ui-tree--checkboxes">
                  {treeData.map(node => renderTreeNode(node))}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <div className="ui-tree__info">
                    <p><strong>Nœuds cochés :</strong> {Array.from(checkedNodes).join(', ')}</p>
                  </div>
                  
                  <button
                    className="ui-button ui-button--outline"
                    onClick={() => setCheckedNodes(new Set())}
                  >
                    Décocher tout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Tree
  data={treeData}
  checkboxes={true}
  checkedNodes={checkedNodes}
  onToggleChecked={setCheckedNodes}
  onCheckParent={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tree de fichiers</h3>
          <div className="demo-content">
            <p>Tree spécialisé pour l'affichage de structures de fichiers :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tree-demo">
                <div className="ui-tree ui-tree--files">
                  {fileTreeData.map(node => renderFileTreeNode(node))}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <p className="ui-tree__description">
                    Tree avec icônes spécifiques aux fichiers et dossiers, tailles et dates.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<FileTree
  data={fileTreeData}
  showFileInfo={true}
  showFileSize={true}
  showFileDate={true}
  icons={{
    folder: '📁',
    file: '📄',
    image: '🖼️',
    document: '📋'
  }}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tree avec recherche</h3>
          <div className="demo-content">
            <p>Tree avec fonctionnalités de recherche et filtrage :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tree-demo">
                <div className="ui-tree ui-tree--search">
                  {searchTreeData.map(node => renderSearchTreeNode(node))}
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <div className="ui-tree__search-controls">
                    <input
                      type="text"
                      className="ui-input"
                      placeholder="Rechercher dans l'arbre..."
                      style={{ width: '300px' }}
                    />
                    <button className="ui-button ui-button--primary" style={{ marginLeft: '0.5rem' }}>
                      Rechercher
                    </button>
                  </div>
                  
                  <p className="ui-tree__description">
                    Tree avec barre de recherche et actions contextuelles sur les nœuds.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<SearchableTree
  data={searchTreeData}
  searchable={true}
  showActions={true}
  actions={[
    { label: 'Ouvrir', icon: '👁️' },
    { label: 'Télécharger', icon: '⬇️' }
  ]}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tree avec drag & drop</h3>
          <div className="demo-content">
            <p>Tree avec possibilité de réorganiser les nœuds :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tree-demo">
                <div className="ui-tree ui-tree--draggable">
                  <div className="ui-tree__node">
                    <div className="ui-tree__node-content ui-tree__node-content--draggable">
                      <div className="ui-tree__drag-handle">⋮⋮</div>
                      <div className="ui-tree__icon">📁</div>
                      <span className="ui-tree__label">Dossier déplaçable</span>
                    </div>
                  </div>
                  
                  <div className="ui-tree__node">
                    <div className="ui-tree__node-content ui-tree__node-content--draggable">
                      <div className="ui-tree__drag-handle">⋮⋮</div>
                      <div className="ui-tree__icon">📄</div>
                      <span className="ui-tree__label">Fichier déplaçable</span>
                    </div>
                  </div>
                  
                  <div className="ui-tree__drop-zone">
                    <div className="ui-tree__drop-indicator">
                      Zone de dépôt - Glissez ici pour réorganiser
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <p className="ui-tree__description">
                    Tree avec poignées de glissement et zones de dépôt pour réorganiser la hiérarchie.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<DraggableTree
  data={treeData}
  draggable={true}
  droppable={true}
  onNodeMove={handleNodeMove}
  onNodeDrop={handleNodeDrop}
  dragHandle={true}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Tree avec variantes</h3>
          <div className="demo-content">
            <p>Différentes variantes de tree selon le contexte :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-tree-demo ui-tree-demo--variants">
                <div className="ui-tree-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Compact</h4>
                  <div className="ui-tree ui-tree--compact">
                    {treeData.slice(0, 2).map(node => renderTreeNode(node))}
                  </div>
                </div>
                
                <div className="ui-tree-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Large</h4>
                  <div className="ui-tree ui-tree--large">
                    {treeData.slice(0, 2).map(node => renderTreeNode(node))}
                  </div>
                </div>
                
                <div className="ui-tree-demo__variant">
                  <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Bordered</h4>
                  <div className="ui-tree ui-tree--bordered">
                    {treeData.slice(0, 2).map(node => renderTreeNode(node))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<Tree variant="compact" data={treeData} />
<Tree variant="large" data={treeData} />
<Tree variant="bordered" data={treeData} />`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant Tree :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>data</strong> : array (données de l'arbre)</li>
                <li><strong>expandedNodes</strong> : Set&lt;string&gt; (nœuds développés)</li>
                <li><strong>selectedNodes</strong> : Set&lt;string&gt; (nœuds sélectionnés)</li>
                <li><strong>checkedNodes</strong> : Set&lt;string&gt; (nœuds cochés)</li>
                <li><strong>selectable</strong> : boolean (sélection possible)</li>
                <li><strong>expandable</strong> : boolean (développement possible)</li>
                <li><strong>checkboxes</strong> : boolean (affichage des checkboxes)</li>
              </ul>
              
              <h4>Props d'interaction :</h4>
              <ul>
                <li><strong>onToggleExpanded</strong> : (nodes: Set&lt;string&gt;) =&gt; void</li>
                <li><strong>onToggleSelected</strong> : (nodes: Set&lt;string&gt;) =&gt; void</li>
                <li><strong>onToggleChecked</strong> : (nodes: Set&lt;string&gt;) =&gt; void</li>
                <li><strong>onNodeClick</strong> : (node: any) =&gt; void</li>
                <li><strong>onNodeDoubleClick</strong> : (node: any) =&gt; void</li>
              </ul>
              
              <h4>Props de personnalisation :</h4>
              <ul>
                <li><strong>variant</strong> : "default" | "compact" | "large" | "bordered"</li>
                <li><strong>icons</strong> : object (icônes personnalisées)</li>
                <li><strong>showLines</strong> : boolean (lignes de connexion)</li>
                <li><strong>showIcons</strong> : boolean (affichage des icônes)</li>
                <li><strong>className</strong> : string (classe CSS personnalisée)</li>
                <li><strong>style</strong> : object (styles inline personnalisés)</li>
              </ul>
              
              <h4>Variants spécialisés :</h4>
              <ul>
                <li><strong>FileTree</strong> : Tree pour systèmes de fichiers</li>
                <li><strong>SearchableTree</strong> : Tree avec recherche</li>
                <li><strong>DraggableTree</strong> : Tree avec drag & drop</li>
                <li><strong>VirtualTree</strong> : Tree virtuel pour grandes données</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onNodeExpand</strong> : (node: any) =&gt; void</li>
                <li><strong>onNodeCollapse</strong> : (node: any) =&gt; void</li>
                <li><strong>onNodeSelect</strong> : (node: any) =&gt; void</li>
                <li><strong>onNodeCheck</strong> : (node: any) =&gt; void</li>
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
                <h4>Explorateur de fichiers</h4>
                <p>Navigation dans la structure des dossiers et fichiers d'un système.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Menus de navigation</h4>
                <p>Menus hiérarchiques avec sous-menus expansibles.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Organisation de données</h4>
                <p>Affichage de structures organisationnelles ou de taxonomies.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreePage;



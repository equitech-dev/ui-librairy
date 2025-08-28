import React, { useState, useMemo } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  actions: string;
}

const DataTablePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Données d'exemple
  const users = useMemo<User[]>(() => [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@equitech.fr', role: 'Admin', status: 'active', lastLogin: '2024-08-20', actions: 'Modifier' },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@equitech.fr', role: 'Utilisateur', status: 'active', lastLogin: '2024-08-19', actions: 'Modifier' },
    { id: 3, name: 'Pierre Durand', email: 'pierre.durand@equitech.fr', role: 'Modérateur', status: 'pending', lastLogin: '2024-08-18', actions: 'Modifier' },
    { id: 4, name: 'Sophie Bernard', email: 'sophie.bernard@equitech.fr', role: 'Utilisateur', status: 'inactive', lastLogin: '2024-08-15', actions: 'Modifier' },
    { id: 5, name: 'Lucas Petit', email: 'lucas.petit@equitech.fr', role: 'Utilisateur', status: 'active', lastLogin: '2024-08-17', actions: 'Modifier' },
    { id: 6, name: 'Emma Roux', email: 'emma.roux@equitech.fr', role: 'Modérateur', status: 'active', lastLogin: '2024-08-16', actions: 'Modifier' },
    { id: 7, name: 'Thomas Moreau', email: 'thomas.moreau@equitech.fr', role: 'Utilisateur', status: 'pending', lastLogin: '2024-08-14', actions: 'Modifier' },
    { id: 8, name: 'Julie Simon', email: 'julie.simon@equitech.fr', role: 'Admin', status: 'active', lastLogin: '2024-08-21', actions: 'Modifier' }
  ], []);

  // Filtrage et tri des données
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchTerm, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(currentUsers.map(user => user.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: 'ui-badge ui-badge--success',
      inactive: 'ui-badge ui-badge--error',
      pending: 'ui-badge ui-badge--warning'
    };
    
    const statusLabels = {
      active: 'Actif',
      inactive: 'Inactif',
      pending: 'En attente'
    };

    return (
      <span className={statusClasses[status as keyof typeof statusClasses]}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };

  return (
    <div className="docs-content">
      <div className="docs-section">
        <h1 className="section-title">DataTable</h1>
        <p className="section-description">
          Composant de tableau de données pour afficher et manipuler des informations structurées. Inclut des fonctionnalités de tri, filtrage, pagination et sélection de lignes pour une gestion efficace des données.
        </p>

        <div className="component-demo">
          <h3 className="demo-title">DataTable basique</h3>
          <div className="demo-content">
            <p>Tableau de données simple avec tri et pagination :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-datatable">
                <div className="ui-datatable__header">
                  <div className="ui-datatable__search">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="ui-input ui-input--with-icon-left"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="ui-input-icon">🔍</span>
                  </div>
                  <div className="ui-datatable__controls">
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="ui-select"
                    >
                      <option value={5}>5 par page</option>
                      <option value={10}>10 par page</option>
                      <option value={20}>20 par page</option>
                    </select>
                  </div>
                </div>

                <div className="ui-datatable__table-wrapper">
                  <table className="ui-datatable__table">
                    <thead className="ui-datatable__thead">
                      <tr>
                        <th className="ui-datatable__th ui-datatable__th--checkbox">
                          <input
                            type="checkbox"
                            checked={selectedRows.length === currentUsers.length && currentUsers.length > 0}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                          />
                        </th>
                        <th 
                          className="ui-datatable__th ui-datatable__th--sortable"
                          onClick={() => handleSort('name')}
                        >
                          Nom
                          {sortField === 'name' && (
                            <span className="ui-datatable__sort-icon">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </th>
                        <th 
                          className="ui-datatable__th ui-datatable__th--sortable"
                          onClick={() => handleSort('email')}
                        >
                          Email
                          {sortField === 'email' && (
                            <span className="ui-datatable__sort-icon">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </th>
                        <th 
                          className="ui-datatable__th ui-datatable__th--sortable"
                          onClick={() => handleSort('role')}
                        >
                          Rôle
                          {sortField === 'role' && (
                            <span className="ui-datatable__sort-icon">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </th>
                        <th 
                          className="ui-datatable__th ui-datatable__th--sortable"
                          onClick={() => handleSort('status')}
                        >
                          Statut
                          {sortField === 'status' && (
                            <span className="ui-datatable__sort-icon">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </th>
                        <th 
                          className="ui-datatable__th ui-datatable__th--sortable"
                          onClick={() => handleSort('lastLogin')}
                        >
                          Dernière connexion
                          {sortField === 'lastLogin' && (
                            <span className="ui-datatable__sort-icon">
                              {sortDirection === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </th>
                        <th className="ui-datatable__th">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="ui-datatable__tbody">
                      {currentUsers.map(user => (
                        <tr key={user.id} className="ui-datatable__tr">
                          <td className="ui-datatable__td ui-datatable__td--checkbox">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(user.id)}
                              onChange={(e) => handleSelectRow(user.id, e.target.checked)}
                            />
                          </td>
                          <td className="ui-datatable__td">
                            <div className="ui-datatable__cell-content">
                              <span className="ui-datatable__cell-text">{user.name}</span>
                            </div>
                          </td>
                          <td className="ui-datatable__td">
                            <div className="ui-datatable__cell-content">
                              <span className="ui-datatable__cell-text">{user.email}</span>
                            </div>
                          </td>
                          <td className="ui-datatable__td">
                            <div className="ui-datatable__cell-content">
                              <span className="ui-datatable__cell-text">{user.role}</span>
                            </div>
                          </td>
                          <td className="ui-datatable__td">
                            <div className="ui-datatable__cell-content">
                              {getStatusBadge(user.status)}
                            </div>
                          </td>
                          <td className="ui-datatable__td">
                            <div className="ui-datatable__cell-content">
                              <span className="ui-datatable__cell-text">
                                {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                              </span>
                            </div>
                          </td>
                          <td className="ui-datatable__td">
                            <div className="ui-datatable__cell-content">
                              <button className="ui-button ui-button--small ui-button--outline">
                                {user.actions}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="ui-datatable__footer">
                  <div className="ui-datatable__info">
                    Affichage de {startIndex + 1} à {Math.min(endIndex, filteredAndSortedUsers.length)} sur {filteredAndSortedUsers.length} résultats
                  </div>
                  <div className="ui-datatable__pagination">
                    <button
                      className="ui-button ui-button--small ui-button--outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Précédent
                    </button>
                    <span className="ui-datatable__page-info">
                      Page {currentPage} sur {totalPages}
                    </span>
                    <button
                      className="ui-button ui-button--small ui-button--outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`import { DataTable } from '@equitech-dev/ui-library';

const [currentPage, setCurrentPage] = useState(1);
const [sortField, setSortField] = useState('name');

<DataTable
  data={users}
  columns={[
    { key: 'name', label: 'Nom', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Rôle', sortable: true }
  ]}
  currentPage={currentPage}
  onPageChange={setCurrentPage}
  sortField={sortField}
  onSort={setSortField}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">DataTable avec sélection multiple</h3>
          <div className="demo-content">
            <p>Gestion des actions en lot sur les lignes sélectionnées :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-datatable__bulk-actions">
                <div className="ui-datatable__bulk-info">
                  {selectedRows.length > 0 ? (
                    <span><strong>{selectedRows.length}</strong> ligne(s) sélectionnée(s)</span>
                  ) : (
                    <span>Aucune ligne sélectionnée</span>
                  )}
                </div>
                {selectedRows.length > 0 && (
                  <div className="ui-datatable__bulk-buttons">
                    <button className="ui-button ui-button--small ui-button--warning">
                      Désactiver ({selectedRows.length})
                    </button>
                    <button className="ui-button ui-button--small ui-button--error">
                      Supprimer ({selectedRows.length})
                    </button>
                    <button className="ui-button ui-button--small ui-button--outline">
                      Exporter ({selectedRows.length})
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<DataTable
  data={users}
  selectable={true}
  onSelectionChange={setSelectedRows}
  bulkActions={[
    { label: 'Désactiver', action: 'disable', variant: 'warning' },
    { label: 'Supprimer', action: 'delete', variant: 'error' }
  ]}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">DataTable avec filtres avancés</h3>
          <div className="demo-content">
            <p>Filtrage par colonnes avec options multiples :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-datatable__filters">
                <div className="ui-datatable__filter-group">
                  <label className="ui-datatable__filter-label">Rôle :</label>
                  <select className="ui-select ui-select--small">
                    <option value="">Tous les rôles</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Modérateur</option>
                    <option value="user">Utilisateur</option>
                  </select>
                </div>
                
                <div className="ui-datatable__filter-group">
                  <label className="ui-datatable__filter-label">Statut :</label>
                  <select className="ui-select ui-select--small">
                    <option value="">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                    <option value="pending">En attente</option>
                  </select>
                </div>
                
                <div className="ui-datatable__filter-group">
                  <label className="ui-datatable__filter-label">Date :</label>
                  <input type="date" className="ui-input ui-input--small" />
                </div>
                
                <button className="ui-button ui-button--small ui-button--primary">
                  Appliquer les filtres
                </button>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<DataTable
  data={users}
  filters={[
    { key: 'role', type: 'select', options: ['Admin', 'Modérateur', 'Utilisateur'] },
    { key: 'status', type: 'select', options: ['Actif', 'Inactif', 'En attente'] },
    { key: 'lastLogin', type: 'date' }
  ]}
  onFiltersChange={handleFiltersChange}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">DataTable avec actions contextuelles</h3>
          <div className="demo-content">
            <p>Actions spécifiques selon le contexte de chaque ligne :</p>
            <div style={{ marginTop: '1rem' }}>
              <div className="ui-datatable__actions-demo">
                <table className="ui-datatable__table ui-datatable__table--compact">
                  <thead>
                    <tr>
                      <th>Utilisateur</th>
                      <th>Actions disponibles</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Jean Dupont (Admin)</td>
                      <td>
                        <div className="ui-datatable__action-buttons">
                          <button className="ui-button ui-button--small ui-button--outline">Voir</button>
                          <button className="ui-button ui-button--small ui-button--primary">Modifier</button>
                          <button className="ui-button ui-button--small ui-button--warning">Désactiver</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Marie Martin (Utilisateur)</td>
                      <td>
                        <div className="ui-datatable__action-buttons">
                          <button className="ui-button ui-button--small ui-button--outline">Voir</button>
                          <button className="ui-button ui-button--small ui-button--primary">Modifier</button>
                          <button className="ui-button ui-button--small ui-button--success">Activer</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <pre className="demo-code">
{`<DataTable
  data={users}
  actions={[
    { label: 'Voir', action: 'view', variant: 'outline' },
    { label: 'Modifier', action: 'edit', variant: 'primary' },
    { 
      label: 'Désactiver', 
      action: 'disable', 
      variant: 'warning',
      condition: (user) => user.status === 'active'
    }
  ]}
  onAction={handleAction}
/>`}
          </pre>
        </div>

        <div className="component-demo">
          <h3 className="demo-title">Props et API</h3>
          <div className="demo-content">
            <p>Propriétés disponibles pour le composant DataTable :</p>
            <div style={{ background: 'var(--ui-background-color)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <h4>Props principales :</h4>
              <ul>
                <li><strong>data</strong> : Array&lt;any&gt; (données à afficher)</li>
                <li><strong>columns</strong> : Array&lt;Column&gt; (configuration des colonnes)</li>
                <li><strong>currentPage</strong> : number (page actuelle)</li>
                <li><strong>itemsPerPage</strong> : number (éléments par page)</li>
                <li><strong>sortField</strong> : string (champ de tri actuel)</li>
                <li><strong>sortDirection</strong> : "asc" | "desc" (direction du tri)</li>
                <li><strong>selectable</strong> : boolean (activer la sélection)</li>
                <li><strong>searchable</strong> : boolean (activer la recherche)</li>
                <li><strong>filters</strong> : Array&lt;Filter&gt; (filtres disponibles)</li>
                <li><strong>actions</strong> : Array&lt;Action&gt; (actions sur les lignes)</li>
                <li><strong>bulkActions</strong> : Array&lt;BulkAction&gt; (actions en lot)</li>
              </ul>
              
              <h4>Types :</h4>
              <ul>
                <li><strong>Column</strong> : &#123; key: string, label: string, sortable?: boolean, width?: string, render?: function &#125;</li>
                <li><strong>Filter</strong> : &#123; key: string, type: string, options?: Array&lt;string&gt;, placeholder?: string &#125;</li>
                <li><strong>Action</strong> : &#123; label: string, action: string, variant: string, condition?: function &#125;</li>
              </ul>
              
              <h4>Événements :</h4>
              <ul>
                <li><strong>onPageChange</strong> : (page: number) =&gt; void</li>
                <li><strong>onSort</strong> : (field: string, direction: string) =&gt; void</li>
                <li><strong>onSearch</strong> : (term: string) =&gt; void</li>
                <li><strong>onFiltersChange</strong> : (filters: object) =&gt; void</li>
                <li><strong>onSelectionChange</strong> : (selected: Array&lt;number&gt;) =&gt; void</li>
                <li><strong>onAction</strong> : (action: string, row: any) =&gt; void</li>
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
                <h4>Gestion des utilisateurs</h4>
                <p>Tableau des utilisateurs avec gestion des rôles et permissions.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Rapports et analytics</h4>
                <p>Affichage de données métriques avec tri et filtrage avancé.</p>
              </div>
              <div style={{ border: '1px solid var(--ui-border-color)', borderRadius: '8px', padding: '1rem' }}>
                <h4>Gestion de contenu</h4>
                <p>Tableau des articles, produits ou ressources avec actions de modération.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTablePage;



import React, { useState, useMemo, useCallback, useRef } from 'react';
import './DataTable.scss';

// Composant de ligne virtualisée
const VirtualizedRow = React.memo(({ 
  index, 
  style, 
  data, 
  columns, 
  onRowClick, 
  onRowSelect, 
  selectedRows, 
  selectable 
}) => {
  const row = data[index];
  const isSelected = selectedRows.has(row.id || index);
  
  const handleRowClick = useCallback(() => {
    if (onRowClick) {
      onRowClick(row, index);
    }
  }, [onRowClick, row, index]);
  
  const handleSelect = useCallback((e) => {
    e.stopPropagation();
    if (onRowSelect) {
      onRowSelect(row.id || index, !isSelected);
    }
  }, [onRowSelect, row.id, index, isSelected]);
  
  const renderCell = (column) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }
    
    if (column.type === 'actions') {
      return (
        <div className="ui-datatable-actions-cell">
          {column.actions?.map((action, actionIndex) => (
            <button
              key={actionIndex}
              className={`ui-datatable-action ui-datatable-action--${action.type || 'default'}`}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(row, index);
              }}
              aria-label={action.label}
            >
              {action.icon}
            </button>
          ))}
        </div>
      );
    }
    
    return row[column.key] || '';
  };
  
  return (
    <div
      className={`ui-datatable-row ${isSelected ? 'ui-datatable-row--selected' : ''}`}
      style={style}
      onClick={handleRowClick}
      role="row"
      aria-selected={isSelected}
    >
      {selectable && (
        <div className="ui-datatable-cell ui-datatable-cell--checkbox">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
            onClick={(e) => e.stopPropagation()}
            aria-label={`Sélectionner la ligne ${index + 1}`}
          />
        </div>
      )}
      
      {columns.map((column, colIndex) => (
        <div
          key={column.key || colIndex}
          className={`ui-datatable-cell ${column.className || ''}`}
          style={{ width: column.width }}
          role="cell"
        >
          {renderCell(column)}
        </div>
      ))}
    </div>
  );
});

// Composant d'en-tête optimisé
const TableHeader = React.memo(({ 
  columns, 
  sortConfig, 
  onSort, 
  sortable, 
  selectable, 
  onSelectAll, 
  allSelected, 
  indeterminate 
}) => {
  const handleSort = useCallback((key) => {
    if (!sortable) return;
    onSort(key);
  }, [sortable, onSort]);
  
  const handleSelectAll = useCallback((e) => {
    if (onSelectAll) {
      onSelectAll(e.target.checked);
    }
  }, [onSelectAll]);
  
  return (
    <div className="ui-datatable-header" role="row">
      {selectable && (
        <div className="ui-datatable-cell ui-datatable-cell--checkbox">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(input) => {
              if (input) input.indeterminate = indeterminate;
            }}
            onChange={handleSelectAll}
            aria-label="Sélectionner toutes les lignes"
          />
        </div>
      )}
      
      {columns.map((column, index) => (
        <div
          key={column.key || index}
          className={`ui-datatable-cell ui-datatable-header-cell ${column.className || ''}`}
          style={{ width: column.width }}
          role="columnheader"
        >
          <div className="ui-datatable-header-content">
            <span className="ui-datatable-header-label">{column.label}</span>
            
            {sortable && column.sortable !== false && (
              <button
                className={`ui-datatable-sort-button ${
                  sortConfig.key === column.key ? `ui-datatable-sort-button--${sortConfig.direction}` : ''
                }`}
                onClick={() => handleSort(column.key)}
                aria-label={`Trier par ${column.label}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

// Hook personnalisé pour la gestion de sélection optimisée
const useSelection = (data, onSelectionChange) => {
  const selectionRef = useRef(new Set());
  
  const setSelection = useCallback((newSelection) => {
    selectionRef.current = newSelection;
    if (onSelectionChange) {
      onSelectionChange(Array.from(newSelection));
    }
  }, [onSelectionChange]);
  
  const toggleSelection = useCallback((id) => {
    const newSelection = new Set(selectionRef.current);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelection(newSelection);
  }, [setSelection]);
  
  const selectAll = useCallback((checked) => {
    if (checked) {
      const allIds = data.map((row, index) => row.id || index);
      setSelection(new Set(allIds));
    } else {
      setSelection(new Set());
    }
  }, [data, setSelection]);
  
  const isSelected = useCallback((id) => {
    return selectionRef.current.has(id);
  }, []);
  
  const getSelectedCount = useCallback(() => {
    return selectionRef.current.size;
  }, []);
  
  return {
    toggleSelection,
    selectAll,
    isSelected,
    getSelectedCount,
    selection: selectionRef.current
  };
};

/**
 * DataTable Optimized - Table component with virtualization and optimized performance
 * 
 * Props :
 * - data: Array of data objects
 * - columns: Array of column definitions
 * - title: Table title
 * - searchable: Enable search functionality (default: true)
 * - sortable: Enable sorting (default: true)
 * - selectable: Enable row selection (default: false)
 * - size: Table size - 'small' | 'medium' | 'large' (default: 'medium')
 * - variant: Table variant - 'default' | 'bordered' | 'striped' | 'compact' (default: 'default')
 * - loading: Loading state (default: false)
 * - emptyMessage: Message when no data (default: 'Aucune donnée disponible')
 * - className: Additional CSS classes
 * - onRowClick: Callback when row is clicked (row, index)
 * - onSelectionChange: Callback when selection changes (selectedIds)
 * - ...props: Native props
 */
const DataTableOptimized = ({
  data = [],
  columns = [],
  title,
  searchable = true,
  sortable = true,
  selectable = false,
  size = 'medium',
  variant = 'default',
  loading = false,
  emptyMessage = 'Aucune donnée disponible',
  className = '',
  onRowClick,
  onSelectionChange,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  // Gestion de sélection optimisée
  const {
    toggleSelection,
    selectAll,
    isSelected,
    getSelectedCount,
    selection
  } = useSelection(data, onSelectionChange);
  
  // Données filtrées et triées mémorisées
  const filteredAndSortedData = useMemo(() => {
    let filteredData = data;
    
    // Filtrage par recherche
    if (searchTerm && searchable) {
      const searchLower = searchTerm.toLowerCase();
      filteredData = data.filter(row =>
        columns.some(column => {
          const value = row[column.key];
          return value && value.toString().toLowerCase().includes(searchLower);
        })
      );
    }
    
    // Tri
    if (sortConfig.key && sortable) {
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  }, [data, searchTerm, sortConfig, searchable, sortable, columns]);
  
  // Gestion du tri
  const handleSort = useCallback((key) => {
    if (!sortable) return;
    
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, [sortable]);
  
  // Gestion de la recherche
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);
  
  // Calculs pour la sélection
  const allSelected = useMemo(() => {
    if (filteredAndSortedData.length === 0) return false;
    return filteredAndSortedData.every((row, index) => 
      isSelected(row.id || index)
    );
  }, [filteredAndSortedData, isSelected]);
  
  const indeterminate = useMemo(() => {
    const selectedCount = getSelectedCount();
    return selectedCount > 0 && selectedCount < filteredAndSortedData.length;
  }, [getSelectedCount, filteredAndSortedData.length]);
  
  // Classes CSS mémorisées
  const tableClasses = useMemo(() => [
    'ui-datatable',
    `ui-datatable--${size}`,
    `ui-datatable--${variant}`,
    selectable && 'ui-datatable--selectable',
    className
  ].filter(Boolean).join(' '), [size, variant, selectable, className]);
  
  // Hauteur des lignes selon la taille
  const rowHeight = useMemo(() => {
    switch (size) {
      case 'small': return 40;
      case 'large': return 60;
      default: return 50;
    }
  }, [size]);
  
  // Rendu du contenu vide
  if (loading) {
    return (
      <div className={tableClasses} {...props}>
        <div className="ui-datatable-loading">
          <div className="ui-loading-spinner"></div>
          <span>Chargement...</span>
        </div>
      </div>
    );
  }
  
  if (filteredAndSortedData.length === 0) {
    return (
      <div className={tableClasses} {...props}>
        <div className="ui-datatable-empty">
          <span>{emptyMessage}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={tableClasses} {...props}>
      {/* En-tête avec titre et recherche */}
      {(title || searchable) && (
        <div className="ui-datatable-toolbar">
          {title && (
            <h3 className="ui-datatable-title">{title}</h3>
          )}
          
          {searchable && (
            <div className="ui-datatable-search">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={handleSearch}
                className="ui-input ui-input--search"
              />
            </div>
          )}
          
          {selectable && getSelectedCount() > 0 && (
            <div className="ui-datatable-selection-info">
              {getSelectedCount()} élément(s) sélectionné(s)
            </div>
          )}
        </div>
      )}
      
      {/* Table */}
      <div className="ui-datatable-container">
        {/* En-tête de colonnes */}
        <TableHeader
          columns={columns}
          sortConfig={sortConfig}
          onSort={handleSort}
          sortable={sortable}
          selectable={selectable}
          onSelectAll={selectAll}
          allSelected={allSelected}
          indeterminate={indeterminate}
        />
        
        {/* Corps de la table avec virtualisation */}
        <div className="ui-datatable-body">
          {filteredAndSortedData.map((row, index) => (
            <VirtualizedRow
              key={row.id || index}
              index={index}
              style={{ height: rowHeight }}
              data={filteredAndSortedData}
              columns={columns}
              onRowClick={onRowClick}
              onRowSelect={toggleSelection}
              selectedRows={selection}
              selectable={selectable}
            />
          ))}
        </div>
      </div>
      
      {/* Pied de table avec informations */}
      <div className="ui-datatable-footer">
        <div className="ui-datatable-info">
          Affichage de {filteredAndSortedData.length} sur {data.length} éléments
        </div>
      </div>
    </div>
  );
};

export default DataTableOptimized;

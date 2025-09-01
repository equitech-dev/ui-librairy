import React, { useState, useMemo } from 'react';
import './DataTable.scss';

const DataTable = ({
  data = [],
  columns = [],
  title,
  searchable = true,
  sortable = true,
  selectable = false,
  size = 'medium', // small, medium, large
  variant = 'default', // default, bordered, striped, compact
  loading = false,
  emptyMessage = 'Aucune donnée disponible',
  className = '',
  onRowClick,
  onSelectionChange,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());

  const filteredAndSortedData = useMemo(() => {
    let filteredData = data;

    // Filtrage par recherche
    if (searchTerm && searchable) {
      filteredData = data.filter(row =>
        columns.some(column => {
          const value = row[column.key];
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleSort = (key) => {
    if (!sortable) return;

    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRowClick = (row, index) => {
    if (onRowClick) {
      onRowClick(row, index);
    }
  };

  const handleRowSelect = (rowId, checked) => {
    const newSelection = new Set(selectedRows);
    if (checked) {
      newSelection.add(rowId);
    } else {
      newSelection.delete(rowId);
    }
    setSelectedRows(newSelection);
    onSelectionChange?.(Array.from(newSelection));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const allIds = filteredAndSortedData.map((row, index) => row.id || index);
      setSelectedRows(new Set(allIds));
      onSelectionChange?.(allIds);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  const renderCell = (row, column) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }

    if (column.type === 'actions') {
      return (
        <div className="ui-datatable-actions-cell">
          {column.actions?.map((action, index) => (
            <button
              key={index}
              className={`ui-datatable-action-button ${action.type || ''}`}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick?.(row);
              }}
              title={action.title}
            >
              {action.icon || action.label}
            </button>
          ))}
        </div>
      );
    }

    return row[column.key];
  };

  return (
    <div 
      className={`ui-datatable ${size} ${variant} ${className}`}
      {...props}
    >
      {(title || searchable) && (
        <div className="ui-datatable-header">
          {title && (
            <h3 className="ui-datatable-title">{title}</h3>
          )}
          {searchable && (
            <div className="ui-datatable-search">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      )}

      <div className="ui-datatable-content">
        {loading ? (
          <div className="ui-datatable-loading">
            Chargement en cours...
          </div>
        ) : filteredAndSortedData.length === 0 ? (
          <div className="ui-datatable-empty">
            {emptyMessage}
          </div>
        ) : (
          <table className="ui-datatable-table">
            <thead className="ui-datatable-thead">
              <tr>
                {selectable && (
                  <th className="ui-datatable-th">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === filteredAndSortedData.length && filteredAndSortedData.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`ui-datatable-th ${sortable && column.sortable !== false ? 'sortable' : ''} ${
                      sortConfig.key === column.key ? sortConfig.direction : ''
                    }`}
                    onClick={() => handleSort(column.key)}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="ui-datatable-tbody">
              {filteredAndSortedData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`ui-datatable-tr ${
                    selectedRows.has(row.id || index) ? 'selected' : ''
                  }`}
                  onClick={() => handleRowClick(row, index)}
                >
                  {selectable && (
                    <td className="ui-datatable-td">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id || index)}
                        onChange={(e) => handleRowSelect(row.id || index, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="ui-datatable-td">
                      {renderCell(row, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="ui-datatable-footer">
        <div className="ui-datatable-info">
          {filteredAndSortedData.length} élément(s) affiché(s)
          {searchTerm && ` sur ${data.length} total`}
        </div>
      </div>
    </div>
  );
};

export default DataTable;


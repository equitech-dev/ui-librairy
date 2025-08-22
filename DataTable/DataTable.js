function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useMemo } from 'react';
import './DataTable.scss';
const DataTable = ({
  data = [],
  columns = [],
  title,
  searchable = true,
  sortable = true,
  selectable = false,
  size = 'medium',
  // small, medium, large
  variant = 'default',
  // default, bordered, striped, compact
  loading = false,
  emptyMessage = 'Aucune donnée disponible',
  className = '',
  onRowClick,
  onSelectionChange,
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const filteredAndSortedData = useMemo(() => {
    let filteredData = data;

    // Filtrage par recherche
    if (searchTerm && searchable) {
      filteredData = data.filter(row => columns.some(column => {
        const value = row[column.key];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      }));
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
  const handleSort = key => {
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
  const handleSelectAll = checked => {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "ui-datatable-actions-cell"
      }, column.actions?.map((action, index) => /*#__PURE__*/React.createElement("button", {
        key: index,
        className: `ui-datatable-action-button ${action.type || ''}`,
        onClick: e => {
          e.stopPropagation();
          action.onClick?.(row);
        },
        title: action.title
      }, action.icon || action.label)));
    }
    return row[column.key];
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `ui-datatable ${size} ${variant} ${className}`
  }, props), (title || searchable) && /*#__PURE__*/React.createElement("div", {
    className: "ui-datatable-header"
  }, title && /*#__PURE__*/React.createElement("h3", {
    className: "ui-datatable-title"
  }, title), searchable && /*#__PURE__*/React.createElement("div", {
    className: "ui-datatable-search"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Rechercher...",
    value: searchTerm,
    onChange: e => setSearchTerm(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ui-datatable-content"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "ui-datatable-loading"
  }, "Chargement en cours...") : filteredAndSortedData.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "ui-datatable-empty"
  }, emptyMessage) : /*#__PURE__*/React.createElement("table", {
    className: "ui-datatable-table"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "ui-datatable-thead"
  }, /*#__PURE__*/React.createElement("tr", null, selectable && /*#__PURE__*/React.createElement("th", {
    className: "ui-datatable-th"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: selectedRows.size === filteredAndSortedData.length && filteredAndSortedData.length > 0,
    onChange: e => handleSelectAll(e.target.checked)
  })), columns.map((column, index) => /*#__PURE__*/React.createElement("th", {
    key: index,
    className: `ui-datatable-th ${sortable && column.sortable !== false ? 'sortable' : ''} ${sortConfig.key === column.key ? sortConfig.direction : ''}`,
    onClick: () => handleSort(column.key)
  }, column.title)))), /*#__PURE__*/React.createElement("tbody", {
    className: "ui-datatable-tbody"
  }, filteredAndSortedData.map((row, index) => /*#__PURE__*/React.createElement("tr", {
    key: row.id || index,
    className: `ui-datatable-tr ${selectedRows.has(row.id || index) ? 'selected' : ''}`,
    onClick: () => handleRowClick(row, index)
  }, selectable && /*#__PURE__*/React.createElement("td", {
    className: "ui-datatable-td"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: selectedRows.has(row.id || index),
    onChange: e => handleRowSelect(row.id || index, e.target.checked),
    onClick: e => e.stopPropagation()
  })), columns.map((column, colIndex) => /*#__PURE__*/React.createElement("td", {
    key: colIndex,
    className: "ui-datatable-td"
  }, renderCell(row, column)))))))), /*#__PURE__*/React.createElement("div", {
    className: "ui-datatable-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-datatable-info"
  }, filteredAndSortedData.length, " \xE9l\xE9ment(s) affich\xE9(s)", searchTerm && ` sur ${data.length} total`)));
};
export default DataTable;
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
const AdvancedDropdown = ({
  options = [],
  value,
  defaultValue,
  multiple = false,
  searchable = false,
  placeholder = "Sélectionner une option",
  disabled = false,
  onChange,
  onValueChange,
  onSearch,
  className = "",
  size = "medium",
  variant = "default",
  showIcons = false,
  compact = false,
  clearable = true,
  selectAll = false,
  maxSelected = null,
  loading = false,
  error = null,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState(defaultValue || (multiple ? [] : null));
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const searchInputRef = useRef(null);
  const optionsRef = useRef([]);

  // Initialisation des valeurs
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValues(value);
    }
  }, [value]);

  // Focus sur l'input de recherche quand le menu s'ouvre
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen, searchable]);

  // Fermeture du menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Filtrage des options
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    const filtered = options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()) || option.description && option.description.toLowerCase().includes(searchTerm.toLowerCase()));
    if (onSearch) {
      onSearch(searchTerm, filtered);
    }
    return filtered;
  }, [options, searchTerm, onSearch]);

  // Gestion des touches clavier
  const handleKeyDown = useCallback(e => {
    if (!isOpen) return;
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => prev < filteredOptions.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : filteredOptions.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Tab':
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        break;
    }
  }, [isOpen, filteredOptions, highlightedIndex]);

  // Gestion de la sélection d'option
  const handleOptionSelect = useCallback(option => {
    if (option.disabled) return;
    let newValues;
    if (multiple) {
      const isSelected = selectedValues.includes(option.value);
      if (isSelected) {
        newValues = selectedValues.filter(v => v !== option.value);
      } else {
        if (maxSelected && selectedValues.length >= maxSelected) {
          return; // Limite atteinte
        }
        newValues = [...selectedValues, option.value];
      }
    } else {
      newValues = option.value;
      setIsOpen(false);
      setSearchTerm('');
    }
    setSelectedValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
    if (onValueChange) {
      onValueChange(newValues);
    }
  }, [multiple, selectedValues, maxSelected, onChange, onValueChange]);

  // Gestion de la suppression d'un élément sélectionné
  const handleRemoveSelected = useCallback(valueToRemove => {
    if (multiple) {
      const newValues = selectedValues.filter(v => v !== valueToRemove);
      setSelectedValues(newValues);
      if (onChange) {
        onChange(newValues);
      }
      if (onValueChange) {
        onValueChange(newValues);
      }
    }
  }, [multiple, selectedValues, onChange, onValueChange]);

  // Gestion de la sélection/désélection de tout
  const handleSelectAll = useCallback(() => {
    if (!multiple) return;
    const allValues = filteredOptions.map(option => option.value);
    const newValues = selectedValues.length === allValues.length ? [] : allValues;
    setSelectedValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
    if (onValueChange) {
      onValueChange(newValues);
    }
  }, [multiple, filteredOptions, selectedValues, onChange, onValueChange]);

  // Gestion de l'effacement de tout
  const handleClearAll = useCallback(() => {
    const newValues = multiple ? [] : null;
    setSelectedValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
    if (onValueChange) {
      onValueChange(newValues);
    }
  }, [multiple, onChange, onValueChange]);

  // Gestion de l'ouverture/fermeture
  const handleToggle = useCallback(() => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
      setHighlightedIndex(-1);
    }
  }, [disabled, isOpen]);

  // Gestion de la recherche
  const handleSearchChange = useCallback(e => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(-1);
  }, []);

  // Récupération des options sélectionnées
  const selectedOptions = useMemo(() => {
    if (!selectedValues) return [];
    if (multiple) {
      return options.filter(option => selectedValues.includes(option.value));
    }
    return options.filter(option => option.value === selectedValues);
  }, [options, selectedValues, multiple]);

  // Affichage du texte sélectionné
  const displayText = useMemo(() => {
    if (multiple) {
      if (selectedValues.length === 0) {
        return placeholder;
      }
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return option ? option.label : placeholder;
      }
      return `${selectedValues.length} éléments sélectionnés`;
    } else {
      if (!selectedValues) {
        return placeholder;
      }
      const option = options.find(opt => opt.value === selectedValues);
      return option ? option.label : placeholder;
    }
  }, [selectedValues, options, multiple, placeholder]);

  // Classes CSS
  const dropdownClasses = ['ui-advanced-dropdown', size !== 'medium' && `ui-advanced-dropdown--${size}`, variant !== 'default' && `ui-advanced-dropdown--${variant}`, showIcons && 'with-icons', compact && 'compact', isOpen && 'open', disabled && 'disabled', className].filter(Boolean).join(' ');
  const triggerClasses = ['ui-advanced-dropdown-trigger', isOpen && 'open', disabled && 'disabled'].filter(Boolean).join(' ');
  const menuClasses = ['ui-advanced-dropdown-menu', isOpen && 'open'].filter(Boolean).join(' ');

  // Icône de flèche
  const arrowIcon = /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6,9 12,15 18,9"
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: dropdownClasses,
    ref: containerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-container"
  }, /*#__PURE__*/React.createElement("div", {
    ref: triggerRef,
    className: triggerClasses,
    onClick: handleToggle,
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    },
    tabIndex: disabled ? -1 : 0,
    role: "combobox",
    "aria-expanded": isOpen,
    "aria-haspopup": "listbox",
    "aria-disabled": disabled
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-display"
  }, multiple && selectedValues.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-selected"
  }, selectedOptions.slice(0, 2).map(option => /*#__PURE__*/React.createElement("div", {
    key: option.value,
    className: "ui-advanced-dropdown-badge"
  }, option.label, /*#__PURE__*/React.createElement("span", {
    className: "ui-advanced-dropdown-badge-remove",
    onClick: e => {
      e.stopPropagation();
      handleRemoveSelected(option.value);
    }
  }, "\xD7"))), selectedValues.length > 2 && /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-badge"
  }, "+", selectedValues.length - 2)) : /*#__PURE__*/React.createElement("div", {
    className: selectedValues ? 'ui-advanced-dropdown-selected' : 'ui-advanced-dropdown-placeholder'
  }, displayText)), /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-arrow"
  }, arrowIcon)), /*#__PURE__*/React.createElement("div", {
    className: menuClasses
  }, searchable && /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-search"
  }, /*#__PURE__*/React.createElement("input", {
    ref: searchInputRef,
    type: "text",
    className: "ui-advanced-dropdown-search-input",
    placeholder: "Rechercher...",
    value: searchTerm,
    onChange: handleSearchChange,
    onKeyDown: handleKeyDown
  })), /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-options"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-message"
  }, "Chargement...") : error ? /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-message"
  }, error) : filteredOptions.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-message"
  }, "Aucune option trouv\xE9e") : filteredOptions.map((option, index) => {
    const isSelected = multiple ? selectedValues.includes(option.value) : selectedValues === option.value;
    return /*#__PURE__*/React.createElement("div", {
      key: option.value,
      ref: el => optionsRef.current[index] = el,
      className: `ui-advanced-dropdown-option ${isSelected ? 'selected' : ''} ${option.disabled ? 'disabled' : ''} ${index === highlightedIndex ? 'highlighted' : ''}`,
      onClick: () => handleOptionSelect(option),
      onMouseEnter: () => setHighlightedIndex(index)
    }, /*#__PURE__*/React.createElement("div", {
      className: "ui-advanced-dropdown-option-content"
    }, showIcons && option.icon && /*#__PURE__*/React.createElement("div", {
      className: "ui-advanced-dropdown-option-icon"
    }, option.icon), /*#__PURE__*/React.createElement("div", {
      className: "ui-advanced-dropdown-option-text"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ui-advanced-dropdown-option-label"
    }, option.label), option.description && /*#__PURE__*/React.createElement("div", {
      className: "ui-advanced-dropdown-option-description"
    }, option.description))), multiple && /*#__PURE__*/React.createElement("div", {
      className: "ui-advanced-dropdown-option-checkbox"
    }));
  })), (clearable || selectAll) && /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-advanced-dropdown-actions"
  }, clearable && /*#__PURE__*/React.createElement("button", {
    className: "ui-advanced-dropdown-action",
    onClick: handleClearAll,
    disabled: !selectedValues || multiple && selectedValues.length === 0
  }, "Effacer tout"), selectAll && multiple && /*#__PURE__*/React.createElement("button", {
    className: "ui-advanced-dropdown-action",
    onClick: handleSelectAll
  }, selectedValues.length === filteredOptions.length ? 'Tout désélectionner' : 'Tout sélectionner'))))), children);
};
AdvancedDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.node,
    disabled: PropTypes.bool
  })),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  multiple: PropTypes.bool,
  searchable: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onSearch: PropTypes.func,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'outlined', 'filled', 'rounded', 'success', 'warning', 'error']),
  showIcons: PropTypes.bool,
  compact: PropTypes.bool,
  clearable: PropTypes.bool,
  selectAll: PropTypes.bool,
  maxSelected: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.string,
  children: PropTypes.node
};
export default AdvancedDropdown;
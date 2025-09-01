function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Hook personnalisé pour la gestion du focus
const useFocusManager = isOpen => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const focusNext = useCallback(optionsLength => {
    setFocusedIndex(prev => prev < optionsLength - 1 ? prev + 1 : 0);
  }, []);
  const focusPrevious = useCallback(optionsLength => {
    setFocusedIndex(prev => prev > 0 ? prev - 1 : optionsLength - 1);
  }, []);
  const focusFirst = useCallback(() => {
    setFocusedIndex(0);
  }, []);
  const focusLast = useCallback(optionsLength => {
    setFocusedIndex(optionsLength - 1);
  }, []);
  const clearFocus = useCallback(() => {
    setFocusedIndex(-1);
  }, []);

  // Reset focus quand le dropdown se ferme
  useEffect(() => {
    if (!isOpen) {
      clearFocus();
    }
  }, [isOpen, clearFocus]);
  return {
    focusedIndex,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
    clearFocus,
    setFocusedIndex
  };
};

// Composant d'option optimisé
const DropdownOption = /*#__PURE__*/React.memo(({
  option,
  isSelected,
  isHighlighted,
  isDisabled,
  onSelect,
  onMouseEnter,
  index,
  ...props
}) => {
  const handleClick = useCallback(() => {
    if (!isDisabled && onSelect) {
      onSelect(option);
    }
  }, [isDisabled, onSelect, option]);
  const handleMouseEnter = useCallback(() => {
    if (onMouseEnter) {
      onMouseEnter(index);
    }
  }, [onMouseEnter, index]);
  const optionClasses = ['ui-dropdown-option', isSelected && 'ui-dropdown-option--selected', isHighlighted && 'ui-dropdown-option--highlighted', isDisabled && 'ui-dropdown-option--disabled'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: optionClasses,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    role: "option",
    "aria-selected": isSelected,
    "aria-disabled": isDisabled,
    tabIndex: isHighlighted ? 0 : -1
  }, props), option.icon && /*#__PURE__*/React.createElement("span", {
    className: "ui-dropdown-option-icon"
  }, option.icon), /*#__PURE__*/React.createElement("div", {
    className: "ui-dropdown-option-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ui-dropdown-option-label"
  }, option.label), option.description && /*#__PURE__*/React.createElement("span", {
    className: "ui-dropdown-option-description"
  }, option.description)), isSelected && /*#__PURE__*/React.createElement("span", {
    className: "ui-dropdown-option-check"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
  }))));
});

/**
 * AdvancedDropdown Optimized - Dropdown component with optimized event handling and focus management
 * 
 * Props :
 * - options: Array of options to display
 * - value: Selected value(s)
 * - onChange: Callback when selection changes
 * - multiple: Enable multiple selection (default: false)
 * - searchable: Enable search functionality (default: false)
 * - disabled: Disable dropdown (default: false)
 * - placeholder: Placeholder text
 * - className: Additional CSS classes
 * - ...props: Native props
 */
const AdvancedDropdownOptimized = ({
  options = [],
  value,
  onChange,
  multiple = false,
  searchable = false,
  disabled = false,
  placeholder = 'Sélectionner...',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const searchInputRef = useRef(null);
  const optionsRef = useRef([]);

  // Gestionnaire de focus optimisé
  const focusManager = useFocusManager(isOpen);

  // Options filtrées mémorisées
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    const searchLower = searchTerm.toLowerCase();
    return options.filter(option => option.label.toLowerCase().includes(searchLower) || option.description && option.description.toLowerCase().includes(searchLower));
  }, [options, searchTerm]);

  // Valeurs sélectionnées mémorisées
  const selectedValues = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return value ? [value] : [];
  }, [value, multiple]);

  // Vérifier si une option est sélectionnée
  const isOptionSelected = useCallback(option => {
    return selectedValues.includes(option.value);
  }, [selectedValues]);

  // Gestionnaires d'événements optimisés
  const handleTriggerClick = useCallback(() => {
    if (disabled) return;
    setIsOpen(prev => !prev);
    setSearchTerm('');
    setHighlightedIndex(-1);
  }, [disabled]);
  const handleOptionSelect = useCallback(option => {
    if (option.disabled) return;
    if (multiple) {
      const newValues = isOptionSelected(option) ? selectedValues.filter(v => v !== option.value) : [...selectedValues, option.value];
      onChange?.(newValues);
    } else {
      onChange?.(option.value);
      setIsOpen(false);
      setSearchTerm('');
      setHighlightedIndex(-1);
    }
  }, [multiple, isOptionSelected, selectedValues, onChange]);
  const handleSearchChange = useCallback(e => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(-1);
  }, []);
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
        if (highlightedIndex < filteredOptions.length - 1) {
          setHighlightedIndex(prev => prev + 1);
        } else {
          setHighlightedIndex(0);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (highlightedIndex > 0) {
          setHighlightedIndex(prev => prev - 1);
        } else {
          setHighlightedIndex(filteredOptions.length - 1);
        }
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
  }, [isOpen, highlightedIndex, filteredOptions, handleOptionSelect]);
  const handleOptionMouseEnter = useCallback(index => {
    setHighlightedIndex(index);
  }, []);

  // Focus sur l'input de recherche quand le dropdown s'ouvre
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, searchable]);

  // Gestionnaires d'événements globaux
  useEffect(() => {
    const handleClickOutside = event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };
    const handleKeyDownGlobal = event => {
      if (isOpen) {
        handleKeyDown(event);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDownGlobal);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDownGlobal);
    };
  }, [isOpen, handleKeyDown]);

  // Classes CSS mémorisées
  const dropdownClasses = useMemo(() => ['ui-dropdown', disabled && 'ui-dropdown--disabled', isOpen && 'ui-dropdown--open', multiple && 'ui-dropdown--multiple', className].filter(Boolean).join(' '), [disabled, isOpen, multiple, className]);

  // Texte d'affichage mémorisé
  const displayText = useMemo(() => {
    if (selectedValues.length === 0) {
      return placeholder;
    }
    if (multiple) {
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return option?.label || placeholder;
      }
      return `${selectedValues.length} élément(s) sélectionné(s)`;
    }
    const option = options.find(opt => opt.value === selectedValues[0]);
    return option?.label || placeholder;
  }, [selectedValues, options, placeholder, multiple]);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: dropdownClasses,
    ref: containerRef
  }, props), /*#__PURE__*/React.createElement("button", {
    ref: triggerRef,
    type: "button",
    className: "ui-dropdown-trigger",
    onClick: handleTriggerClick,
    disabled: disabled,
    "aria-haspopup": "listbox",
    "aria-expanded": isOpen,
    "aria-label": "Ouvrir le menu d\xE9roulant"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ui-dropdown-value"
  }, displayText), /*#__PURE__*/React.createElement("span", {
    className: "ui-dropdown-arrow"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 10l5 5 5-5z"
  })))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "ui-dropdown-menu",
    role: "listbox"
  }, searchable && /*#__PURE__*/React.createElement("div", {
    className: "ui-dropdown-search"
  }, /*#__PURE__*/React.createElement("input", {
    ref: searchInputRef,
    type: "text",
    value: searchTerm,
    onChange: handleSearchChange,
    placeholder: "Rechercher...",
    className: "ui-dropdown-search-input",
    "aria-label": "Rechercher dans les options"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ui-dropdown-options"
  }, filteredOptions.length > 0 ? filteredOptions.map((option, index) => /*#__PURE__*/React.createElement(DropdownOption, {
    key: option.value,
    option: option,
    isSelected: isOptionSelected(option),
    isHighlighted: index === highlightedIndex,
    isDisabled: option.disabled,
    onSelect: handleOptionSelect,
    onMouseEnter: handleOptionMouseEnter,
    index: index
  })) : /*#__PURE__*/React.createElement("div", {
    className: "ui-dropdown-empty"
  }, "Aucune option trouv\xE9e"))));
};
AdvancedDropdownOptimized.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.node,
    disabled: PropTypes.bool
  })),
  value: PropTypes.oneOfType([PropTypes.oneOfType([PropTypes.string, PropTypes.number]), PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  searchable: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string
};
export default AdvancedDropdownOptimized;
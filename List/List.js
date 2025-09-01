function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Composant ListItem pour les éléments individuels
const ListItem = ({
  item,
  selected = false,
  onSelect,
  onAction,
  showCheckbox = false,
  showActions = true,
  showDragHandle = false,
  size = 'md',
  variant = 'default',
  className,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const isDisabled = item.disabled || false;
  const handleClick = useCallback(e => {
    e.stopPropagation();
    if (!isDisabled && onSelect) {
      onSelect(item.key, !selected);
    }
  }, [isDisabled, onSelect, item.key, selected]);
  const handleAction = useCallback((action, e) => {
    e.stopPropagation();
    if (onAction) {
      onAction(action, item);
    }
  }, [onAction, item]);
  const handleDragStart = useCallback(e => {
    if (item.draggable !== false) {
      setIsDragging(true);
      e.dataTransfer.setData('text/plain', item.key);
      e.dataTransfer.effectAllowed = 'move';
    }
  }, [item.key, item.draggable]);
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  const listItemClasses = ['ui-list__item', selected && 'ui-list__item--selected', isDisabled && 'ui-list__item--disabled', isDragging && 'ui-list__item--dragging', className].filter(Boolean).join(' ');
  const checkboxClasses = ['ui-list__checkbox', selected && 'ui-list__checkbox--checked'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("li", _extends({
    className: listItemClasses,
    onClick: handleClick,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    draggable: item.draggable !== false,
    tabIndex: 0,
    role: "listitem",
    "aria-selected": selected
  }, props), showCheckbox && /*#__PURE__*/React.createElement("div", {
    className: checkboxClasses,
    onClick: e => {
      e.stopPropagation();
      if (!isDisabled && onSelect) {
        onSelect(item.key, !selected);
      }
    },
    role: "checkbox",
    "aria-checked": selected
  }), showDragHandle && /*#__PURE__*/React.createElement("div", {
    className: "ui-list__drag-handle"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
  }))), item.avatar && /*#__PURE__*/React.createElement("div", {
    className: "ui-list__avatar"
  }, typeof item.avatar === 'string' ? item.avatar.startsWith('http') ? /*#__PURE__*/React.createElement("img", {
    src: item.avatar,
    alt: item.title
  }) : item.avatar.charAt(0).toUpperCase() : item.avatar), item.icon && !item.avatar && /*#__PURE__*/React.createElement("div", {
    className: "ui-list__icon"
  }, typeof item.icon === 'string' ? /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "24",
    height: "24"
  }, /*#__PURE__*/React.createElement("path", {
    d: item.icon
  })) : item.icon), /*#__PURE__*/React.createElement("div", {
    className: "ui-list__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-list__title"
  }, item.title), item.description && /*#__PURE__*/React.createElement("div", {
    className: "ui-list__description"
  }, item.description)), item.meta && /*#__PURE__*/React.createElement("div", {
    className: "ui-list__meta"
  }, item.meta.map((metaItem, index) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: index
  }, metaItem.badge ? /*#__PURE__*/React.createElement("span", {
    className: `ui-list__badge ui-list__badge--${metaItem.badge.variant || 'default'}`
  }, metaItem.badge.text) : /*#__PURE__*/React.createElement("span", null, metaItem.text)))), showActions && item.actions && /*#__PURE__*/React.createElement("div", {
    className: "ui-list__actions"
  }, item.actions.map((action, index) => /*#__PURE__*/React.createElement("button", {
    key: index,
    type: "button",
    className: "ui-list__action",
    onClick: e => handleAction(action.key, e),
    "aria-label": action.label,
    title: action.label
  }, action.icon))));
};
ListItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    meta: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      badge: PropTypes.shape({
        text: PropTypes.string.isRequired,
        variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error'])
      })
    })),
    actions: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired
    })),
    disabled: PropTypes.bool,
    draggable: PropTypes.bool
  }).isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
  onAction: PropTypes.func,
  showCheckbox: PropTypes.bool,
  showActions: PropTypes.bool,
  showDragHandle: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'compact', 'spacious', 'bordered', 'elevated', 'striped']),
  className: PropTypes.string
};

// Composant principal List
const List = ({
  data = [],
  selectedKeys = [],
  onSelect,
  onAction,
  showCheckbox = false,
  showActions = true,
  showDragHandle = false,
  size = 'md',
  variant = 'default',
  emptyText = 'Aucun élément',
  emptyDescription = 'Aucun élément à afficher',
  className,
  id,
  name,
  disabled,
  loading,
  error,
  ...props
}) => {
  const handleSelect = useCallback((key, selected) => {
    if (onSelect) {
      onSelect(key, selected);
    }
  }, [onSelect]);
  const handleAction = useCallback((action, item) => {
    if (onAction) {
      onAction(action, item);
    }
  }, [onAction]);
  const listClasses = ['ui-list', `ui-list--${size}`, `ui-list--${variant}`, loading && 'ui-list--loading', error && 'ui-list--error', className].filter(Boolean).join(' ');
  if (data.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "ui-list__empty"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ui-list__empty-icon"
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "currentColor",
      width: "48",
      height: "48"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "ui-list__empty-title"
    }, emptyText), /*#__PURE__*/React.createElement("div", {
      className: "ui-list__empty-description"
    }, emptyDescription));
  }
  return /*#__PURE__*/React.createElement("ul", _extends({
    className: listClasses,
    role: "list",
    "aria-label": "Liste d'\xE9l\xE9ments",
    id: id
  }, props), data.map((item, index) => /*#__PURE__*/React.createElement(ListItem, {
    key: item.key,
    item: item,
    selected: selectedKeys.includes(item.key),
    onSelect: handleSelect,
    onAction: handleAction,
    showCheckbox: showCheckbox,
    showActions: showActions,
    showDragHandle: showDragHandle,
    size: size,
    variant: variant
  })));
};
List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    meta: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      badge: PropTypes.shape({
        text: PropTypes.string.isRequired,
        variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error'])
      })
    })),
    actions: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired
    })),
    disabled: PropTypes.bool,
    draggable: PropTypes.bool
  })),
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  onAction: PropTypes.func,
  showCheckbox: PropTypes.bool,
  showActions: PropTypes.bool,
  showDragHandle: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'compact', 'spacious', 'bordered', 'elevated', 'striped']),
  emptyText: PropTypes.string,
  emptyDescription: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool
};
export default List;
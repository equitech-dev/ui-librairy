function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Composant KanbanCard pour les cartes individuelles
const KanbanCard = ({
  card,
  onCardAction,
  onCardSelect,
  selected = false,
  size = 'md',
  className,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const handleDragStart = useCallback(e => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
  }, [card.id]);
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  const handleCardAction = useCallback((action, e) => {
    e.stopPropagation();
    if (onCardAction) {
      onCardAction(action, card);
    }
  }, [onCardAction, card]);
  const handleCardClick = useCallback(() => {
    if (onCardSelect) {
      onCardSelect(card);
    }
  }, [onCardSelect, card]);
  const cardClasses = ['ui-kanban__card', selected && 'ui-kanban__card--selected', isDragging && 'ui-kanban__card--dragging', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cardClasses,
    onClick: handleCardClick,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    draggable: true,
    tabIndex: 0,
    role: "button",
    "aria-label": card.title
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__card-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "ui-kanban__card-title"
  }, card.title), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__card-menu"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-kanban__card-action",
    onClick: e => handleCardAction('edit', e),
    "aria-label": "Modifier"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-kanban__card-action",
    onClick: e => handleCardAction('delete', e),
    "aria-label": "Supprimer"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
  }))))), card.content && /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__card-content"
  }, card.content), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__card-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__card-meta"
  }, card.assignee && /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__card-avatar"
  }, typeof card.assignee === 'string' ? card.assignee.startsWith('http') ? /*#__PURE__*/React.createElement("img", {
    src: card.assignee,
    alt: "Assign\xE9"
  }) : card.assignee.charAt(0).toUpperCase() : card.assignee), card.priority && /*#__PURE__*/React.createElement("span", {
    className: `ui-kanban__card-badge ui-kanban__card-badge--priority-${card.priority}`
  }, card.priority)), card.dueDate && /*#__PURE__*/React.createElement("span", {
    className: "ui-kanban__card-meta"
  }, new Date(card.dueDate).toLocaleDateString('fr-FR'))));
};
KanbanCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    assignee: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
    dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  }).isRequired,
  onCardAction: PropTypes.func,
  onCardSelect: PropTypes.func,
  selected: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

// Composant KanbanColumn pour les colonnes
const KanbanColumn = ({
  column,
  cards = [],
  onCardDrop,
  onCardAction,
  onCardSelect,
  onColumnAction,
  selectedCard,
  size = 'md',
  className,
  ...props
}) => {
  const [dragOver, setDragOver] = useState(false);
  const handleDragOver = useCallback(e => {
    e.preventDefault();
    setDragOver(true);
  }, []);
  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);
  const handleDrop = useCallback(e => {
    e.preventDefault();
    setDragOver(false);
    const cardId = e.dataTransfer.getData('text/plain');
    if (onCardDrop) {
      onCardDrop(cardId, column.id);
    }
  }, [onCardDrop, column.id]);
  const handleColumnAction = useCallback((action, e) => {
    e.stopPropagation();
    if (onColumnAction) {
      onColumnAction(action, column);
    }
  }, [onColumnAction, column]);
  const columnClasses = ['ui-kanban__column', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: columnClasses,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    role: "region",
    "aria-label": `Colonne ${column.title}`
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__column-header"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ui-kanban__column-title"
  }, column.title), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__column-actions"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ui-kanban__column-count"
  }, cards.length), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-kanban__column-action",
    onClick: e => handleColumnAction('add-card', e),
    "aria-label": "Ajouter une carte"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-kanban__column-action",
    onClick: e => handleColumnAction('edit', e),
    "aria-label": "Modifier la colonne"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    width: "16",
    height: "16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__column-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__cards"
  }, cards.map(card => /*#__PURE__*/React.createElement(KanbanCard, {
    key: card.id,
    card: card,
    selected: selectedCard?.id === card.id,
    onCardAction: onCardAction,
    onCardSelect: onCardSelect,
    size: size
  }))), dragOver && /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__drop-zone ui-kanban__drop-zone--active"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-kanban__add-card",
    onClick: e => handleColumnAction('add-card', e)
  }, "+ Ajouter une carte")));
};
KanbanColumn.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    assignee: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
    dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  })),
  onCardDrop: PropTypes.func,
  onCardAction: PropTypes.func,
  onCardSelect: PropTypes.func,
  onColumnAction: PropTypes.func,
  selectedCard: PropTypes.object,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

// Composant principal Kanban
const Kanban = ({
  title = 'Tableau Kanban',
  columns = [],
  cards = [],
  onCardDrop,
  onCardAction,
  onCardSelect,
  onColumnAction,
  onAddColumn,
  selectedCard,
  size = 'md',
  variant = 'default',
  className,
  id,
  name,
  disabled,
  loading,
  error,
  ...props
}) => {
  const handleCardDrop = useCallback((cardId, columnId) => {
    if (onCardDrop) {
      onCardDrop(cardId, columnId);
    }
  }, [onCardDrop]);
  const handleCardAction = useCallback((action, card) => {
    if (onCardAction) {
      onCardAction(action, card);
    }
  }, [onCardAction]);
  const handleColumnAction = useCallback((action, column) => {
    if (onColumnAction) {
      onColumnAction(action, column);
    }
  }, [onColumnAction]);
  const kanbanClasses = ['ui-kanban', `ui-kanban--${size}`, `ui-kanban--${variant}`, loading && 'ui-kanban--loading', error && 'ui-kanban--error', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: kanbanClasses,
    role: "application",
    "aria-label": "Tableau Kanban",
    id: id
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "ui-kanban__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-kanban__action",
    onClick: () => onAddColumn && onAddColumn(),
    disabled: disabled
  }, "Ajouter une colonne"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-kanban__action ui-kanban__action--primary",
    onClick: () => console.log('Exporter'),
    disabled: disabled
  }, "Exporter"))), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban__board"
  }, columns.map(column => {
    const columnCards = cards.filter(card => card.columnId === column.id);
    return /*#__PURE__*/React.createElement(KanbanColumn, {
      key: column.id,
      column: column,
      cards: columnCards,
      onCardDrop: handleCardDrop,
      onCardAction: handleCardAction,
      onCardSelect: onCardSelect,
      onColumnAction: handleColumnAction,
      selectedCard: selectedCard,
      size: size
    });
  }), onAddColumn && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-kanban__add-column",
    onClick: onAddColumn,
    disabled: disabled
  }, "+ Ajouter une colonne")));
};
Kanban.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })),
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    columnId: PropTypes.string.isRequired,
    assignee: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
    dueDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  })),
  onCardDrop: PropTypes.func,
  onCardAction: PropTypes.func,
  onCardSelect: PropTypes.func,
  onColumnAction: PropTypes.func,
  onAddColumn: PropTypes.func,
  selectedCard: PropTypes.object,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'compact', 'spacious']),
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool
};
export default Kanban;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Hook pour la gestion du focus et de la navigation clavier
const useKeyboardNavigation = (columns, onCardMove) => {
  const [focusedCard, setFocusedCard] = useState({
    columnIndex: 0,
    cardIndex: 0
  });
  const [focusedColumn, setFocusedColumn] = useState(0);
  const moveFocus = useCallback(direction => {
    setFocusedCard(prev => {
      const {
        columnIndex,
        cardIndex
      } = prev;
      const currentColumn = columns[columnIndex];
      switch (direction) {
        case 'up':
          if (cardIndex > 0) {
            return {
              columnIndex,
              cardIndex: cardIndex - 1
            };
          }
          break;
        case 'down':
          if (cardIndex < currentColumn.cards.length - 1) {
            return {
              columnIndex,
              cardIndex: cardIndex + 1
            };
          }
          break;
        case 'left':
          if (columnIndex > 0) {
            const prevColumn = columns[columnIndex - 1];
            const newCardIndex = Math.min(cardIndex, prevColumn.cards.length - 1);
            return {
              columnIndex: columnIndex - 1,
              cardIndex: newCardIndex
            };
          }
          break;
        case 'right':
          if (columnIndex < columns.length - 1) {
            const nextColumn = columns[columnIndex + 1];
            const newCardIndex = Math.min(cardIndex, nextColumn.cards.length - 1);
            return {
              columnIndex: columnIndex + 1,
              cardIndex: newCardIndex
            };
          }
          break;
      }
      return prev;
    });
  }, [columns]);
  const moveCard = useCallback(direction => {
    const {
      columnIndex,
      cardIndex
    } = focusedCard;
    const currentColumn = columns[columnIndex];
    const card = currentColumn.cards[cardIndex];
    if (!card) return;
    let targetColumnIndex = columnIndex;
    let targetCardIndex = cardIndex;
    switch (direction) {
      case 'left':
        if (columnIndex > 0) {
          targetColumnIndex = columnIndex - 1;
          targetCardIndex = Math.min(cardIndex, columns[targetColumnIndex].cards.length);
        }
        break;
      case 'right':
        if (columnIndex < columns.length - 1) {
          targetColumnIndex = columnIndex + 1;
          targetCardIndex = Math.min(cardIndex, columns[targetColumnIndex].cards.length);
        }
        break;
      case 'up':
        if (cardIndex > 0) {
          targetCardIndex = cardIndex - 1;
        }
        break;
      case 'down':
        if (cardIndex < currentColumn.cards.length - 1) {
          targetCardIndex = cardIndex + 1;
        }
        break;
    }
    if (targetColumnIndex !== columnIndex || targetCardIndex !== cardIndex) {
      onCardMove(card.id, columnIndex, targetColumnIndex, cardIndex, targetCardIndex);
      setFocusedCard({
        columnIndex: targetColumnIndex,
        cardIndex: targetCardIndex
      });
    }
  }, [focusedCard, columns, onCardMove]);
  const handleKeyDown = useCallback(event => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        moveFocus('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveFocus('down');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (event.ctrlKey || event.metaKey) {
          moveCard('left');
        } else {
          moveFocus('left');
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (event.ctrlKey || event.metaKey) {
          moveCard('right');
        } else {
          moveFocus('right');
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        // Activer le mode édition ou ouvrir la carte
        break;
      case 'Escape':
        event.preventDefault();
        setFocusedCard({
          columnIndex: 0,
          cardIndex: 0
        });
        break;
    }
  }, [moveFocus, moveCard]);
  return {
    focusedCard,
    focusedColumn,
    setFocusedCard,
    setFocusedColumn,
    handleKeyDown,
    moveFocus,
    moveCard
  };
};

// Composant de carte optimisé
const KanbanCard = /*#__PURE__*/React.memo(({
  card,
  isFocused,
  isDragging,
  onDragStart,
  onDragEnd,
  onClick,
  className = '',
  ...props
}) => {
  const cardRef = useRef(null);
  const handleDragStart = useCallback(e => {
    if (onDragStart) {
      onDragStart(e, card);
    }
  }, [onDragStart, card]);
  const handleDragEnd = useCallback(e => {
    if (onDragEnd) {
      onDragEnd(e, card);
    }
  }, [onDragEnd, card]);
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(card);
    }
  }, [onClick, card]);
  const cardClasses = ['ui-kanban-card', isFocused && 'ui-kanban-card--focused', isDragging && 'ui-kanban-card--dragging', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: cardRef,
    className: cardClasses,
    draggable: true,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onClick: handleClick,
    role: "button",
    tabIndex: isFocused ? 0 : -1,
    "aria-label": `Carte: ${card.title}`
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-card-header"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "ui-kanban-card-title"
  }, card.title), card.priority && /*#__PURE__*/React.createElement("span", {
    className: `ui-kanban-card-priority ui-kanban-card-priority--${card.priority}`
  }, card.priority)), card.description && /*#__PURE__*/React.createElement("p", {
    className: "ui-kanban-card-description"
  }, card.description), card.assignee && /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-card-assignee"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ui-kanban-card-assignee-avatar"
  }, card.assignee.charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("span", {
    className: "ui-kanban-card-assignee-name"
  }, card.assignee)), card.dueDate && /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-card-due-date"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ui-kanban-card-due-label"
  }, "\xC9ch\xE9ance:"), /*#__PURE__*/React.createElement("span", {
    className: "ui-kanban-card-due-value"
  }, card.dueDate)), card.tags && card.tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-card-tags"
  }, card.tags.map((tag, index) => /*#__PURE__*/React.createElement("span", {
    key: index,
    className: "ui-kanban-card-tag"
  }, tag))));
});

// Composant de colonne optimisé
const KanbanColumn = /*#__PURE__*/React.memo(({
  column,
  columnIndex,
  isFocused,
  focusedCardIndex,
  onCardMove,
  onCardClick,
  onDragStart,
  onDragEnd,
  className = '',
  ...props
}) => {
  const columnRef = useRef(null);
  const handleDrop = useCallback(e => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const sourceColumnIndex = parseInt(e.dataTransfer.getData('columnIndex'));
    const sourceCardIndex = parseInt(e.dataTransfer.getData('cardIndex'));
    if (onCardMove && sourceColumnIndex !== columnIndex) {
      onCardMove(cardId, sourceColumnIndex, columnIndex, sourceCardIndex, column.cards.length);
    }
  }, [columnIndex, column.cards.length, onCardMove]);
  const handleDragOver = useCallback(e => {
    e.preventDefault();
  }, []);
  const columnClasses = ['ui-kanban-column', isFocused && 'ui-kanban-column--focused', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: columnRef,
    className: columnClasses,
    onDrop: handleDrop,
    onDragOver: handleDragOver,
    role: "region",
    "aria-label": `Colonne: ${column.title}`
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-column-header"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "ui-kanban-column-title"
  }, column.title), /*#__PURE__*/React.createElement("span", {
    className: "ui-kanban-column-count"
  }, column.cards.length)), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-column-content"
  }, column.cards.map((card, cardIndex) => /*#__PURE__*/React.createElement(KanbanCard, {
    key: card.id,
    card: card,
    isFocused: isFocused && focusedCardIndex === cardIndex,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onClick: onCardClick,
    className: "ui-kanban-column-card"
  }))));
});

/**
 * Kanban Optimized - Kanban board component with full keyboard support and optimized accessibility
 * 
 * Props :
 * - columns: Array of column objects with cards
 * - onCardMove: Callback when card is moved (cardId, fromColumn, toColumn, fromIndex, toIndex)
 * - onCardClick: Callback when card is clicked (card)
 * - onColumnAdd: Callback to add new column
 * - onCardAdd: Callback to add new card (columnIndex)
 * - className: Additional CSS classes
 * - ...props: Native props
 */
const KanbanOptimized = ({
  columns = [],
  onCardMove,
  onCardClick,
  onColumnAdd,
  onCardAdd,
  className = '',
  ...props
}) => {
  const kanbanRef = useRef(null);

  // Navigation clavier optimisée
  const {
    focusedCard,
    focusedColumn,
    setFocusedCard,
    setFocusedColumn,
    handleKeyDown,
    moveFocus,
    moveCard
  } = useKeyboardNavigation(columns, onCardMove);

  // Gestion du drag & drop optimisé
  const [draggedCard, setDraggedCard] = useState(null);
  const handleCardDragStart = useCallback((e, card) => {
    setDraggedCard(card);
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.setData('columnIndex', focusedCard.columnIndex.toString());
    e.dataTransfer.setData('cardIndex', focusedCard.cardIndex.toString());
    e.dataTransfer.effectAllowed = 'move';
  }, [focusedCard]);
  const handleCardDragEnd = useCallback((e, card) => {
    setDraggedCard(null);
  }, []);
  const handleCardMove = useCallback((cardId, fromColumn, toColumn, fromIndex, toIndex) => {
    if (onCardMove) {
      onCardMove(cardId, fromColumn, toColumn, fromIndex, toIndex);
    }
  }, [onCardMove]);
  const handleCardClick = useCallback(card => {
    if (onCardClick) {
      onCardClick(card);
    }
  }, [onCardClick]);

  // Gestionnaires d'événements globaux
  useEffect(() => {
    const handleGlobalKeyDown = event => {
      if (kanbanRef.current && kanbanRef.current.contains(event.target)) {
        handleKeyDown(event);
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [handleKeyDown]);

  // Classes CSS mémorisées
  const kanbanClasses = useMemo(() => ['ui-kanban', className].filter(Boolean).join(' '), [className]);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: kanbanRef,
    className: kanbanClasses,
    role: "application",
    "aria-label": "Tableau Kanban",
    tabIndex: 0,
    onKeyDown: handleKeyDown
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-header"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "ui-kanban-title"
  }, "Tableau Kanban"), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-actions"
  }, onColumnAdd && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ui-button ui-button--primary",
    onClick: onColumnAdd,
    "aria-label": "Ajouter une colonne"
  }, "+ Colonne"))), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-instructions",
    role: "note",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("p", null, "Utilisez les fl\xE8ches pour naviguer. Ctrl/Cmd + fl\xE8ches pour d\xE9placer les cartes.")), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-columns",
    role: "main"
  }, columns.map((column, columnIndex) => /*#__PURE__*/React.createElement(KanbanColumn, {
    key: column.id || columnIndex,
    column: column,
    columnIndex: columnIndex,
    isFocused: focusedColumn === columnIndex,
    focusedCardIndex: focusedCard.columnIndex === columnIndex ? focusedCard.cardIndex : -1,
    onCardMove: handleCardMove,
    onCardClick: handleCardClick,
    onDragStart: handleCardDragStart,
    onDragEnd: handleCardDragEnd,
    className: "ui-kanban-column"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ui-kanban-stats"
  }, /*#__PURE__*/React.createElement("span", null, "Total: ", columns.reduce((sum, col) => sum + col.cards.length, 0), " cartes"), /*#__PURE__*/React.createElement("span", null, columns.length, " colonnes"))));
};
KanbanOptimized.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      assignee: PropTypes.string,
      dueDate: PropTypes.string,
      priority: PropTypes.oneOf(['low', 'medium', 'high']),
      tags: PropTypes.arrayOf(PropTypes.string)
    }))
  })),
  onCardMove: PropTypes.func,
  onCardClick: PropTypes.func,
  onColumnAdd: PropTypes.func,
  onCardAdd: PropTypes.func,
  className: PropTypes.string
};
export default KanbanOptimized;
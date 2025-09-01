import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Hook pour la gestion du focus et de la navigation clavier
const useKeyboardNavigation = (columns, onCardMove) => {
  const [focusedCard, setFocusedCard] = useState({ columnIndex: 0, cardIndex: 0 });
  const [focusedColumn, setFocusedColumn] = useState(0);
  
  const moveFocus = useCallback((direction) => {
    setFocusedCard(prev => {
      const { columnIndex, cardIndex } = prev;
      const currentColumn = columns[columnIndex];
      
      switch (direction) {
        case 'up':
          if (cardIndex > 0) {
            return { columnIndex, cardIndex: cardIndex - 1 };
          }
          break;
          
        case 'down':
          if (cardIndex < currentColumn.cards.length - 1) {
            return { columnIndex, cardIndex: cardIndex + 1 };
          }
          break;
          
        case 'left':
          if (columnIndex > 0) {
            const prevColumn = columns[columnIndex - 1];
            const newCardIndex = Math.min(cardIndex, prevColumn.cards.length - 1);
            return { columnIndex: columnIndex - 1, cardIndex: newCardIndex };
          }
          break;
          
        case 'right':
          if (columnIndex < columns.length - 1) {
            const nextColumn = columns[columnIndex + 1];
            const newCardIndex = Math.min(cardIndex, nextColumn.cards.length - 1);
            return { columnIndex: columnIndex + 1, cardIndex: newCardIndex };
          }
          break;
      }
      
      return prev;
    });
  }, [columns]);
  
  const moveCard = useCallback((direction) => {
    const { columnIndex, cardIndex } = focusedCard;
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
      setFocusedCard({ columnIndex: targetColumnIndex, cardIndex: targetCardIndex });
    }
  }, [focusedCard, columns, onCardMove]);
  
  const handleKeyDown = useCallback((event) => {
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
        setFocusedCard({ columnIndex: 0, cardIndex: 0 });
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
const KanbanCard = React.memo(({
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
  
  const handleDragStart = useCallback((e) => {
    if (onDragStart) {
      onDragStart(e, card);
    }
  }, [onDragStart, card]);
  
  const handleDragEnd = useCallback((e) => {
    if (onDragEnd) {
      onDragEnd(e, card);
    }
  }, [onDragEnd, card]);
  
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(card);
    }
  }, [onClick, card]);
  
  const cardClasses = [
    'ui-kanban-card',
    isFocused && 'ui-kanban-card--focused',
    isDragging && 'ui-kanban-card--dragging',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div
      ref={cardRef}
      className={cardClasses}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      role="button"
      tabIndex={isFocused ? 0 : -1}
      aria-label={`Carte: ${card.title}`}
      {...props}
    >
      <div className="ui-kanban-card-header">
        <h4 className="ui-kanban-card-title">{card.title}</h4>
        {card.priority && (
          <span className={`ui-kanban-card-priority ui-kanban-card-priority--${card.priority}`}>
            {card.priority}
          </span>
        )}
      </div>
      
      {card.description && (
        <p className="ui-kanban-card-description">{card.description}</p>
      )}
      
      {card.assignee && (
        <div className="ui-kanban-card-assignee">
          <span className="ui-kanban-card-assignee-avatar">
            {card.assignee.charAt(0).toUpperCase()}
          </span>
          <span className="ui-kanban-card-assignee-name">{card.assignee}</span>
        </div>
      )}
      
      {card.dueDate && (
        <div className="ui-kanban-card-due-date">
          <span className="ui-kanban-card-due-label">Échéance:</span>
          <span className="ui-kanban-card-due-value">{card.dueDate}</span>
        </div>
      )}
      
      {card.tags && card.tags.length > 0 && (
        <div className="ui-kanban-card-tags">
          {card.tags.map((tag, index) => (
            <span key={index} className="ui-kanban-card-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
});

// Composant de colonne optimisé
const KanbanColumn = React.memo(({
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
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const sourceColumnIndex = parseInt(e.dataTransfer.getData('columnIndex'));
    const sourceCardIndex = parseInt(e.dataTransfer.getData('cardIndex'));
    
    if (onCardMove && sourceColumnIndex !== columnIndex) {
      onCardMove(cardId, sourceColumnIndex, columnIndex, sourceCardIndex, column.cards.length);
    }
  }, [columnIndex, column.cards.length, onCardMove]);
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);
  
  const columnClasses = [
    'ui-kanban-column',
    isFocused && 'ui-kanban-column--focused',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div
      ref={columnRef}
      className={columnClasses}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      role="region"
      aria-label={`Colonne: ${column.title}`}
      {...props}
    >
      <div className="ui-kanban-column-header">
        <h3 className="ui-kanban-column-title">{column.title}</h3>
        <span className="ui-kanban-column-count">{column.cards.length}</span>
      </div>
      
      <div className="ui-kanban-column-content">
        {column.cards.map((card, cardIndex) => (
          <KanbanCard
            key={card.id}
            card={card}
            isFocused={isFocused && focusedCardIndex === cardIndex}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onCardClick}
            className="ui-kanban-column-card"
          />
        ))}
      </div>
    </div>
  );
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
  
  const handleCardClick = useCallback((card) => {
    if (onCardClick) {
      onCardClick(card);
    }
  }, [onCardClick]);
  
  // Gestionnaires d'événements globaux
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
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
  const kanbanClasses = useMemo(() => [
    'ui-kanban',
    className
  ].filter(Boolean).join(' '), [className]);
  
  return (
    <div
      ref={kanbanRef}
      className={kanbanClasses}
      role="application"
      aria-label="Tableau Kanban"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {/* En-tête avec actions */}
      <div className="ui-kanban-header">
        <h2 className="ui-kanban-title">Tableau Kanban</h2>
        
        <div className="ui-kanban-actions">
          {onColumnAdd && (
            <button
              type="button"
              className="ui-button ui-button--primary"
              onClick={onColumnAdd}
              aria-label="Ajouter une colonne"
            >
              + Colonne
            </button>
          )}
        </div>
      </div>
      
      {/* Instructions de navigation */}
      <div className="ui-kanban-instructions" role="note" aria-live="polite">
        <p>Utilisez les flèches pour naviguer. Ctrl/Cmd + flèches pour déplacer les cartes.</p>
      </div>
      
      {/* Colonnes */}
      <div className="ui-kanban-columns" role="main">
        {columns.map((column, columnIndex) => (
          <KanbanColumn
            key={column.id || columnIndex}
            column={column}
            columnIndex={columnIndex}
            isFocused={focusedColumn === columnIndex}
            focusedCardIndex={focusedCard.columnIndex === columnIndex ? focusedCard.cardIndex : -1}
            onCardMove={handleCardMove}
            onCardClick={handleCardClick}
            onDragStart={handleCardDragStart}
            onDragEnd={handleCardDragEnd}
            className="ui-kanban-column"
          />
        ))}
      </div>
      
      {/* Pied de page avec statistiques */}
      <div className="ui-kanban-footer">
        <div className="ui-kanban-stats">
          <span>Total: {columns.reduce((sum, col) => sum + col.cards.length, 0)} cartes</span>
          <span>{columns.length} colonnes</span>
        </div>
      </div>
    </div>
  );
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

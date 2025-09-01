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
  
  const handleDragStart = useCallback((e) => {
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
  
  const cardClasses = [
    'ui-kanban__card',
    selected && 'ui-kanban__card--selected',
    isDragging && 'ui-kanban__card--dragging',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={cardClasses}
      onClick={handleCardClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={true}
      tabIndex={0}
      role="button"
      aria-label={card.title}
      {...props}
    >
      <div className="ui-kanban__card-header">
        <h3 className="ui-kanban__card-title">{card.title}</h3>
        <div className="ui-kanban__card-menu">
          <button
            type="button"
            className="ui-kanban__card-action"
            onClick={(e) => handleCardAction('edit', e)}
            aria-label="Modifier"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <button
            type="button"
            className="ui-kanban__card-action"
            onClick={(e) => handleCardAction('delete', e)}
            aria-label="Supprimer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
          </button>
        </div>
      </div>
      
      {card.content && (
        <div className="ui-kanban__card-content">{card.content}</div>
      )}
      
      <div className="ui-kanban__card-footer">
        <div className="ui-kanban__card-meta">
          {card.assignee && (
            <div className="ui-kanban__card-avatar">
              {typeof card.assignee === 'string' ? (
                card.assignee.startsWith('http') ? (
                  <img src={card.assignee} alt="Assigné" />
                ) : (
                  card.assignee.charAt(0).toUpperCase()
                )
              ) : (
                card.assignee
              )}
            </div>
          )}
          
          {card.priority && (
            <span className={`ui-kanban__card-badge ui-kanban__card-badge--priority-${card.priority}`}>
              {card.priority}
            </span>
          )}
        </div>
        
        {card.dueDate && (
          <span className="ui-kanban__card-meta">
            {new Date(card.dueDate).toLocaleDateString('fr-FR')}
          </span>
        )}
      </div>
    </div>
  );
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
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);
  
  const handleDrop = useCallback((e) => {
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
  
  const columnClasses = [
    'ui-kanban__column',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={columnClasses}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="region"
      aria-label={`Colonne ${column.title}`}
      {...props}
    >
      <div className="ui-kanban__column-header">
        <h2 className="ui-kanban__column-title">{column.title}</h2>
        <div className="ui-kanban__column-actions">
          <span className="ui-kanban__column-count">{cards.length}</span>
          <button
            type="button"
            className="ui-kanban__column-action"
            onClick={(e) => handleColumnAction('add-card', e)}
            aria-label="Ajouter une carte"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </button>
          <button
            type="button"
            className="ui-kanban__column-action"
            onClick={(e) => handleColumnAction('edit', e)}
            aria-label="Modifier la colonne"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="ui-kanban__column-content">
        <div className="ui-kanban__cards">
          {cards.map((card) => (
            <KanbanCard
              key={card.id}
              card={card}
              selected={selectedCard?.id === card.id}
              onCardAction={onCardAction}
              onCardSelect={onCardSelect}
              size={size}
            />
          ))}
        </div>
        
        {dragOver && (
          <div className="ui-kanban__drop-zone ui-kanban__drop-zone--active" />
        )}
        
        <button
          type="button"
          className="ui-kanban__add-card"
          onClick={(e) => handleColumnAction('add-card', e)}
        >
          + Ajouter une carte
        </button>
      </div>
    </div>
  );
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
  
  const kanbanClasses = [
    'ui-kanban',
    `ui-kanban--${size}`,
    `ui-kanban--${variant}`,
    loading && 'ui-kanban--loading',
    error && 'ui-kanban--error',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={kanbanClasses}
      role="application"
      aria-label="Tableau Kanban"
      id={id}
      {...props}
    >
      <div className="ui-kanban__header">
        <h1 className="ui-kanban__title">{title}</h1>
        <div className="ui-kanban__actions">
          <button
            type="button"
            className="ui-kanban__action"
            onClick={() => onAddColumn && onAddColumn()}
            disabled={disabled}
          >
            Ajouter une colonne
          </button>
          <button
            type="button"
            className="ui-kanban__action ui-kanban__action--primary"
            onClick={() => console.log('Exporter')}
            disabled={disabled}
          >
            Exporter
          </button>
        </div>
      </div>
      
      <div className="ui-kanban__board">
        {columns.map((column) => {
          const columnCards = cards.filter(card => card.columnId === column.id);
          return (
            <KanbanColumn
              key={column.id}
              column={column}
              cards={columnCards}
              onCardDrop={handleCardDrop}
              onCardAction={handleCardAction}
              onCardSelect={onCardSelect}
              onColumnAction={handleColumnAction}
              selectedCard={selectedCard}
              size={size}
            />
          );
        })}
        
        {onAddColumn && (
          <button
            type="button"
            className="ui-kanban__add-column"
            onClick={onAddColumn}
            disabled={disabled}
          >
            + Ajouter une colonne
          </button>
        )}
      </div>
    </div>
  );
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



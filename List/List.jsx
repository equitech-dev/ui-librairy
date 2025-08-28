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
  
  const handleClick = useCallback((e) => {
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
  
  const handleDragStart = useCallback((e) => {
    if (item.draggable !== false) {
      setIsDragging(true);
      e.dataTransfer.setData('text/plain', item.key);
      e.dataTransfer.effectAllowed = 'move';
    }
  }, [item.key, item.draggable]);
  
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const listItemClasses = [
    'ui-list__item',
    selected && 'ui-list__item--selected',
    isDisabled && 'ui-list__item--disabled',
    isDragging && 'ui-list__item--dragging',
    className
  ].filter(Boolean).join(' ');
  
  const checkboxClasses = [
    'ui-list__checkbox',
    selected && 'ui-list__checkbox--checked'
  ].filter(Boolean).join(' ');
  
  return (
    <li
      className={listItemClasses}
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={item.draggable !== false}
      tabIndex={0}
      role="listitem"
      aria-selected={selected}
      {...props}
    >
      {showCheckbox && (
        <div
          className={checkboxClasses}
          onClick={(e) => {
            e.stopPropagation();
            if (!isDisabled && onSelect) {
              onSelect(item.key, !selected);
            }
          }}
          role="checkbox"
          aria-checked={selected}
        />
      )}
      
      {showDragHandle && (
        <div className="ui-list__drag-handle">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </div>
      )}
      
      {item.avatar && (
        <div className="ui-list__avatar">
          {typeof item.avatar === 'string' ? (
            item.avatar.startsWith('http') ? (
              <img src={item.avatar} alt={item.title} />
            ) : (
              item.avatar.charAt(0).toUpperCase()
            )
          ) : (
            item.avatar
          )}
        </div>
      )}
      
      {item.icon && !item.avatar && (
        <div className="ui-list__icon">
          {typeof item.icon === 'string' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d={item.icon} />
            </svg>
          ) : (
            item.icon
          )}
        </div>
      )}
      
      <div className="ui-list__content">
        <div className="ui-list__title">{item.title}</div>
        {item.description && (
          <div className="ui-list__description">{item.description}</div>
        )}
      </div>
      
      {item.meta && (
        <div className="ui-list__meta">
          {item.meta.map((metaItem, index) => (
            <React.Fragment key={index}>
              {metaItem.badge ? (
                <span className={`ui-list__badge ui-list__badge--${metaItem.badge.variant || 'default'}`}>
                  {metaItem.badge.text}
                </span>
              ) : (
                <span>{metaItem.text}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
      
      {showActions && item.actions && (
        <div className="ui-list__actions">
          {item.actions.map((action, index) => (
            <button
              key={index}
              type="button"
              className="ui-list__action"
              onClick={(e) => handleAction(action.key, e)}
              aria-label={action.label}
              title={action.label}
            >
              {action.icon}
            </button>
          ))}
        </div>
      )}
    </li>
  );
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
  
  const listClasses = [
    'ui-list',
    `ui-list--${size}`,
    `ui-list--${variant}`,
    loading && 'ui-list--loading',
    error && 'ui-list--error',
    className
  ].filter(Boolean).join(' ');
  
  if (data.length === 0) {
    return (
      <div className="ui-list__empty">
        <div className="ui-list__empty-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <div className="ui-list__empty-title">{emptyText}</div>
        <div className="ui-list__empty-description">{emptyDescription}</div>
      </div>
    );
  }
  
  return (
    <ul
      className={listClasses}
      role="list"
      aria-label="Liste d'éléments"
      id={id}
      {...props}
    >
      {data.map((item, index) => (
        <ListItem
          key={item.key}
          item={item}
          selected={selectedKeys.includes(item.key)}
          onSelect={handleSelect}
          onAction={handleAction}
          showCheckbox={showCheckbox}
          showActions={showActions}
          showDragHandle={showDragHandle}
          size={size}
          variant={variant}
        />
      ))}
    </ul>
  );
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



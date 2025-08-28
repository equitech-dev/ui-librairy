import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

// Composant TreeNode pour les éléments individuels
const TreeNode = ({
  node,
  level = 0,
  selectedKeys = [],
  expandedKeys = [],
  onSelect,
  onExpand,
  onAction,
  showActions = true,
  size = 'md',
  variant = 'default',
  className,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  
  const isSelected = selectedKeys.includes(node.key);
  const isExpanded = expandedKeys.includes(node.key);
  const hasChildren = node.children && node.children.length > 0;
  const isDisabled = node.disabled || false;
  
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    if (hasChildren && !isDisabled) {
      onExpand(node.key, !isExpanded);
    }
  }, [hasChildren, isDisabled, node.key, isExpanded, onExpand]);
  
  const handleSelect = useCallback((e) => {
    e.stopPropagation();
    if (!isDisabled) {
      onSelect(node.key, !isSelected);
    }
  }, [isDisabled, node.key, isSelected, onSelect]);
  
  const handleAction = useCallback((action, e) => {
    e.stopPropagation();
    onAction(action, node);
  }, [onAction, node]);
  
  const handleDragStart = useCallback((e) => {
    if (node.draggable !== false) {
      setIsDragging(true);
      e.dataTransfer.setData('text/plain', node.key);
      e.dataTransfer.effectAllowed = 'move';
    }
  }, [node.key, node.draggable]);
  
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
    const draggedKey = e.dataTransfer.getData('text/plain');
    if (draggedKey !== node.key) {
      // Ici on pourrait implémenter la logique de déplacement
      console.log(`Déplacer ${draggedKey} vers ${node.key}`);
    }
  }, [node.key]);
  
  const treeClasses = [
    'ui-tree__item',
    isSelected && 'ui-tree__item--selected',
    isDisabled && 'ui-tree__item--disabled',
    isDragging && 'ui-tree__item--dragging',
    className
  ].filter(Boolean).join(' ');
  
  const toggleClasses = [
    'ui-tree__toggle',
    isExpanded && 'ui-tree__toggle--expanded',
    !hasChildren && 'ui-tree__toggle--hidden'
  ].filter(Boolean).join(' ');
  
  return (
    <div className="ui-tree__node">
      <div
        className={treeClasses}
        onClick={handleSelect}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        draggable={node.draggable !== false}
        tabIndex={0}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-level={level + 1}
        {...props}
      >
        <button
          type="button"
          className={toggleClasses}
          onClick={handleToggle}
          aria-label={isExpanded ? 'Réduire' : 'Développer'}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
        
        {node.icon && (
          <div className="ui-tree__icon">
            {typeof node.icon === 'string' ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d={node.icon} />
              </svg>
            ) : (
              node.icon
            )}
          </div>
        )}
        
        <span className="ui-tree__label">{node.label}</span>
        
        {showActions && node.actions && (
          <div className="ui-tree__actions">
            {node.actions.map((action, index) => (
              <button
                key={index}
                type="button"
                className="ui-tree__action"
                onClick={(e) => handleAction(action.key, e)}
                aria-label={action.label}
                title={action.label}
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {hasChildren && (
        <div
          className={`ui-tree__children ${!isExpanded ? 'ui-tree__children--collapsed' : ''}`}
          role="group"
        >
          {node.children.map((child) => (
            <TreeNode
              key={child.key}
              node={child}
              level={level + 1}
              selectedKeys={selectedKeys}
              expandedKeys={expandedKeys}
              onSelect={onSelect}
              onExpand={onExpand}
              onAction={onAction}
              showActions={showActions}
              size={size}
              variant={variant}
            />
          ))}
        </div>
      )}
      
      {dragOver && (
        <div className="ui-tree__drop-zone ui-tree__drop-zone--active" />
      )}
    </div>
  );
};

TreeNode.propTypes = {
  node: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.array,
    disabled: PropTypes.bool,
    draggable: PropTypes.bool,
    actions: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired
    }))
  }).isRequired,
  level: PropTypes.number,
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  expandedKeys: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'compact', 'spacious', 'bordered', 'elevated']),
  className: PropTypes.string
};

// Composant principal Tree
const Tree = ({
  data = [],
  selectedKeys = [],
  expandedKeys = [],
  onSelect,
  onExpand,
  onAction,
  showActions = true,
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
  const handleSelect = useCallback((key, selected) => {
    if (onSelect) {
      onSelect(key, selected);
    }
  }, [onSelect]);
  
  const handleExpand = useCallback((key, expanded) => {
    if (onExpand) {
      onExpand(key, expanded);
    }
  }, [onExpand]);
  
  const handleAction = useCallback((action, node) => {
    if (onAction) {
      onAction(action, node);
    }
  }, [onAction]);
  
  const treeClasses = [
    'ui-tree',
    `ui-tree--${size}`,
    `ui-tree--${variant}`,
    loading && 'ui-tree--loading',
    error && 'ui-tree--error',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={treeClasses}
      role="tree"
      aria-label="Arborescence"
      id={id}
      {...props}
    >
      {data.map((node) => (
        <TreeNode
          key={node.key}
          node={node}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          onSelect={handleSelect}
          onExpand={handleExpand}
          onAction={handleAction}
          showActions={showActions}
          size={size}
          variant={variant}
        />
      ))}
    </div>
  );
};

Tree.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    children: PropTypes.array,
    disabled: PropTypes.bool,
    draggable: PropTypes.bool,
    actions: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired
    }))
  })),
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  expandedKeys: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  onExpand: PropTypes.func,
  onAction: PropTypes.func,
  showActions: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['default', 'compact', 'spacious', 'bordered', 'elevated']),
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

export default Tree;



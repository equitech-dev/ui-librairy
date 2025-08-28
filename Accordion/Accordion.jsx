import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Accordion.scss';

/**
 * AccordionItem - Élément individuel de l'accordéon
 */
const AccordionItem = ({ 
  title, 
  children, 
  isExpanded = false, 
  disabled = false,
  variant = 'default',
  onToggle,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(isExpanded);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, children]);

  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  const handleToggle = () => {
    if (disabled) return;
    
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const itemClasses = [
    'ui-accordion-item',
    isOpen ? 'expanded' : '',
    variant !== 'default' ? variant : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={itemClasses}>
      <button
        className={`ui-accordion-header ${disabled ? 'disabled' : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-disabled={disabled}
      >
        <h3 className="ui-accordion-title">{title}</h3>
        <span className="ui-accordion-icon" aria-hidden="true" />
      </button>
      
      <div 
        className="ui-accordion-content"
        style={{ maxHeight: `${contentHeight}px` }}
        aria-hidden={!isOpen}
      >
        <div className="ui-accordion-body" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

AccordionItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isExpanded: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['default', 'error', 'success', 'warning']),
  onToggle: PropTypes.func,
  className: PropTypes.string
};

/**
 * Accordion - Composant accordéon pour organiser le contenu
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.items - Liste des éléments de l'accordéon
 * @param {string} props.variant - Variante d'affichage (default, bordered, separated)
 * @param {string} props.size - Taille du composant (default, compact, large)
 * @param {boolean} props.allowMultiple - Permet d'ouvrir plusieurs éléments simultanément
 * @param {Function} props.onItemToggle - Callback lors du toggle d'un élément
 * @param {string} props.className - Classes CSS additionnelles
 * @param {Object} props.style - Styles inline additionnels
 */
const Accordion = ({ 
  items = [], 
  variant = 'default',
  size = 'default',
  allowMultiple = false,
  onItemToggle,
  className = '',
  style = {}
}) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const handleItemToggle = (index, isExpanded) => {
    let newExpandedItems;
    
    if (allowMultiple) {
      newExpandedItems = new Set(expandedItems);
      if (isExpanded) {
        newExpandedItems.add(index);
      } else {
        newExpandedItems.delete(index);
      }
    } else {
      newExpandedItems = isExpanded ? new Set([index]) : new Set();
    }
    
    setExpandedItems(newExpandedItems);
    
    if (onItemToggle) {
      onItemToggle(index, isExpanded, Array.from(newExpandedItems));
    }
  };

  const accordionClasses = [
    'ui-accordion',
    variant !== 'default' ? variant : '',
    size !== 'default' ? size : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={accordionClasses} style={style}>
      {items.map((item, index) => (
        <AccordionItem
          key={`accordion-item-${index}`}
          title={item.title}
          isExpanded={expandedItems.has(index)}
          disabled={item.disabled}
          variant={item.variant}
          onToggle={(isExpanded) => handleItemToggle(index, isExpanded)}
          className={item.className}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      disabled: PropTypes.bool,
      variant: PropTypes.oneOf(['default', 'error', 'success', 'warning']),
      className: PropTypes.string
    })
  ).isRequired,
  variant: PropTypes.oneOf(['default', 'bordered', 'separated']),
  size: PropTypes.oneOf(['default', 'compact', 'large']),
  allowMultiple: PropTypes.bool,
  onItemToggle: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Accordion;

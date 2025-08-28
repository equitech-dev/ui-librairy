import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumb.scss';

/**
 * BreadcrumbItem - Élément individuel du fil d'Ariane
 */
const BreadcrumbItem = ({ 
  label, 
  href, 
  isActive = false, 
  onClick 
}) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(href);
    }
  };

  return (
    <li className="ui-breadcrumb-item">
      {isActive ? (
        <span className="ui-breadcrumb-link active" aria-current="page">
          {label}
        </span>
      ) : (
        <a 
          href={href} 
          className="ui-breadcrumb-link"
          onClick={handleClick}
        >
          {label}
        </a>
      )}
    </li>
  );
};

BreadcrumbItem.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func
};

/**
 * Breadcrumb - Composant fil d'Ariane pour la navigation
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.items - Liste des éléments du fil d'Ariane
 * @param {string} props.variant - Variante d'affichage (default, compact, large)
 * @param {Function} props.onItemClick - Callback lors du clic sur un élément
 * @param {string} props.className - Classes CSS additionnelles
 * @param {Object} props.style - Styles inline additionnels
 */
const Breadcrumb = ({ 
  items = [], 
  variant = 'default',
  onItemClick,
  className = '',
  style = {}
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const breadcrumbClasses = [
    'ui-breadcrumb',
    variant !== 'default' ? variant : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <nav 
      className={breadcrumbClasses}
      style={style}
      aria-label="Fil d'Ariane"
    >
      <ol className="ui-breadcrumb-list">
        {items.map((item, index) => (
          <React.Fragment key={`breadcrumb-${index}`}>
            <BreadcrumbItem
              label={item.label}
              href={item.href}
              isActive={item.isActive || index === items.length - 1}
              onClick={onItemClick}
            />
            {index < items.length - 1 && (
              <li className="ui-breadcrumb-separator" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      isActive: PropTypes.bool
    })
  ).isRequired,
  variant: PropTypes.oneOf(['default', 'compact', 'large']),
  onItemClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Breadcrumb;

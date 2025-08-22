import React from 'react';
import './Pagination.scss';

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showInfo = true,
  showPrevNext = true,
  size = 'medium', // small, medium, large
  variant = 'default', // default, compact
  className = '',
  ...props
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      // Afficher toutes les pages si moins de 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Logique pour afficher les pages avec ellipsis
      if (currentPage <= 4) {
        // Début : 1, 2, 3, 4, 5, ..., totalPages
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Fin : 1, ..., totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Milieu : 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const getInfoText = () => {
    return `Page ${currentPage} sur ${totalPages}`;
  };

  return (
    <nav 
      className={`ui-pagination ${size} ${variant} ${className}`}
      role="navigation"
      aria-label="Pagination"
      {...props}
    >
      {showInfo && (
        <div className="ui-pagination-info">
          {getInfoText()}
        </div>
      )}
      
      {showPrevNext && (
        <button
          className={`ui-pagination-prev ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Page précédente"
        />
      )}
      
      <ul className="ui-pagination-list">
        {renderPageNumbers().map((page, index) => (
          <li key={index}>
            {page === 'ellipsis' ? (
              <span className="ui-pagination-ellipsis">...</span>
            ) : (
              <button
                className={`ui-pagination-item ${page === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>
      
      {showPrevNext && (
        <button
          className={`ui-pagination-next ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Page suivante"
        />
      )}
    </nav>
  );
};

export default Pagination;


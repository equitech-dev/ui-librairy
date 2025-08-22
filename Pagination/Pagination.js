function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import './Pagination.scss';
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showInfo = true,
  showPrevNext = true,
  size = 'medium',
  // small, medium, large
  variant = 'default',
  // default, compact
  className = '',
  ...props
}) => {
  const handlePageChange = page => {
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
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: `ui-pagination ${size} ${variant} ${className}`,
    role: "navigation",
    "aria-label": "Pagination"
  }, props), showInfo && /*#__PURE__*/React.createElement("div", {
    className: "ui-pagination-info"
  }, getInfoText()), showPrevNext && /*#__PURE__*/React.createElement("button", {
    className: `ui-pagination-prev ${currentPage === 1 ? 'disabled' : ''}`,
    onClick: () => handlePageChange(currentPage - 1),
    disabled: currentPage === 1,
    "aria-label": "Page pr\xE9c\xE9dente"
  }), /*#__PURE__*/React.createElement("ul", {
    className: "ui-pagination-list"
  }, renderPageNumbers().map((page, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, page === 'ellipsis' ? /*#__PURE__*/React.createElement("span", {
    className: "ui-pagination-ellipsis"
  }, "...") : /*#__PURE__*/React.createElement("button", {
    className: `ui-pagination-item ${page === currentPage ? 'active' : ''}`,
    onClick: () => handlePageChange(page),
    "aria-label": `Page ${page}`,
    "aria-current": page === currentPage ? 'page' : undefined
  }, page)))), showPrevNext && /*#__PURE__*/React.createElement("button", {
    className: `ui-pagination-next ${currentPage === totalPages ? 'disabled' : ''}`,
    onClick: () => handlePageChange(currentPage + 1),
    disabled: currentPage === totalPages,
    "aria-label": "Page suivante"
  }));
};
export default Pagination;
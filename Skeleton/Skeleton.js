import React from 'react';
import PropTypes from 'prop-types';
import './Skeleton.scss';
const Skeleton = ({
  variant = 'text',
  size = 'default',
  color = 'default',
  animation = 'loading',
  width,
  height,
  className = '',
  style = {}
}) => {
  const skeletonClasses = ['ui-skeleton', variant, size !== 'default' ? size : '', color !== 'default' ? color : '', animation !== 'loading' ? animation : '', className].filter(Boolean).join(' ');
  const skeletonStyles = {
    width: width,
    height: height,
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    className: skeletonClasses,
    style: skeletonStyles,
    "aria-hidden": "true"
  });
};

// Composant SkeletonGroup pour grouper plusieurs skeletons
const SkeletonGroup = ({
  children,
  layout = 'vertical',
  className = '',
  style = {}
}) => {
  const groupClasses = ['ui-skeleton-group', layout !== 'vertical' ? layout : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: groupClasses,
    style: style
  }, children);
};

// Composant SkeletonContent pour créer un contenu skeleton complet
const SkeletonContent = ({
  showAvatar = false,
  avatarSize = 'default',
  lines = 3,
  title = true,
  className = '',
  style = {}
}) => {
  const contentClasses = ['ui-skeleton-content', className].filter(Boolean).join(' ');
  const avatarClasses = ['ui-skeleton', 'avatar', avatarSize !== 'default' ? `avatar-${avatarSize}` : '', 'ui-skeleton-avatar'].filter(Boolean).join(' ');
  const titleClasses = ['ui-skeleton', 'title', 'ui-skeleton-title'].filter(Boolean).join(' ');
  const paragraphClasses = ['ui-skeleton', 'paragraph', 'ui-skeleton-paragraph'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: contentClasses,
    style: style
  }, showAvatar && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: 'var(--spacing-s)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: avatarClasses
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    className: titleClasses
  }), Array.from({
    length: lines
  }, (_, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: paragraphClasses
  })))), !showAvatar && /*#__PURE__*/React.createElement(React.Fragment, null, title && /*#__PURE__*/React.createElement("div", {
    className: titleClasses
  }), Array.from({
    length: lines
  }, (_, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: paragraphClasses
  }))));
};

// Composant SkeletonCard pour créer une carte skeleton
const SkeletonCard = ({
  showImage = false,
  showAvatar = false,
  lines = 2,
  className = '',
  style = {}
}) => {
  const cardClasses = ['ui-skeleton', 'card', className].filter(Boolean).join(' ');
  const imageClasses = ['ui-skeleton', 'image', 'ui-skeleton-image'].filter(Boolean).join(' ');
  const avatarClasses = ['ui-skeleton', 'avatar', 'ui-skeleton-avatar'].filter(Boolean).join(' ');
  const titleClasses = ['ui-skeleton', 'heading', 'ui-skeleton-title'].filter(Boolean).join(' ');
  const paragraphClasses = ['ui-skeleton', 'paragraph', 'ui-skeleton-paragraph'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cardClasses,
    style: style
  }, showImage && /*#__PURE__*/React.createElement("div", {
    className: imageClasses,
    style: {
      marginBottom: 'var(--spacing-m)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--spacing-m)'
    }
  }, showAvatar && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 'var(--spacing-s)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: avatarClasses,
    style: {
      marginRight: 'var(--spacing-s)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: titleClasses,
    style: {
      flex: 1
    }
  })), !showAvatar && /*#__PURE__*/React.createElement("div", {
    className: titleClasses,
    style: {
      marginBottom: 'var(--spacing-s)'
    }
  }), Array.from({
    length: lines
  }, (_, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: paragraphClasses
  }))));
};

// Composant SkeletonTable pour créer un tableau skeleton
const SkeletonTable = ({
  rows = 5,
  columns = 4,
  showHeader = true,
  className = '',
  style = {}
}) => {
  const tableClasses = ['ui-skeleton-table', className].filter(Boolean).join(' ');
  const headerClasses = ['ui-skeleton', 'heading', 'ui-skeleton-title'].filter(Boolean).join(' ');
  const rowClasses = ['ui-skeleton', 'table-row', 'ui-skeleton-table-row'].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: tableClasses,
    style: style
  }, showHeader && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--spacing-m)',
      marginBottom: 'var(--spacing-s)'
    }
  }, Array.from({
    length: columns
  }, (_, index) => /*#__PURE__*/React.createElement("div", {
    key: index,
    className: headerClasses,
    style: {
      flex: 1
    }
  }))), Array.from({
    length: rows
  }, (_, rowIndex) => /*#__PURE__*/React.createElement("div", {
    key: rowIndex,
    style: {
      display: 'flex',
      gap: 'var(--spacing-m)',
      marginBottom: 'var(--spacing-xs)'
    }
  }, Array.from({
    length: columns
  }, (_, colIndex) => /*#__PURE__*/React.createElement("div", {
    key: colIndex,
    className: rowClasses,
    style: {
      flex: 1
    }
  })))));
};
Skeleton.propTypes = {
  variant: PropTypes.oneOf(['text', 'title', 'heading', 'paragraph', 'avatar', 'avatar-large', 'avatar-small', 'button', 'button-small', 'button-large', 'input', 'card', 'image', 'image-square', 'image-circle', 'table-row', 'list-item', 'badge', 'chip']),
  size: PropTypes.oneOf(['default', 'small', 'large']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'dark']),
  animation: PropTypes.oneOf(['loading', 'pulse', 'wave', 'static']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object
};
SkeletonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  layout: PropTypes.oneOf(['vertical', 'horizontal', 'grid', 'inline']),
  className: PropTypes.string,
  style: PropTypes.object
};
SkeletonContent.propTypes = {
  showAvatar: PropTypes.bool,
  avatarSize: PropTypes.oneOf(['default', 'small', 'large']),
  lines: PropTypes.number,
  title: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};
SkeletonCard.propTypes = {
  showImage: PropTypes.bool,
  showAvatar: PropTypes.bool,
  lines: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
};
SkeletonTable.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
  showHeader: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

// Attacher les sous-composants à Skeleton
Skeleton.Group = SkeletonGroup;
Skeleton.Content = SkeletonContent;
Skeleton.Card = SkeletonCard;
Skeleton.Table = SkeletonTable;
export default Skeleton;
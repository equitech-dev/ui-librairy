import React from 'react';
import PropTypes from 'prop-types';
import './Timeline.scss';

const TimelineItem = ({
  title,
  date,
  description,
  badge,
  variant = 'default',
  dotStyle = 'default',
  contentStyle = 'default',
  actions,
  children,
  className = '',
  style = {}
}) => {
  const dotClasses = [
    'ui-timeline-dot',
    variant !== 'default' ? variant : '',
    dotStyle !== 'default' ? dotStyle : ''
  ].filter(Boolean).join(' ');

  const contentClasses = [
    'ui-timeline-content',
    contentStyle !== 'default' ? contentStyle : '',
    variant !== 'default' ? variant : ''
  ].filter(Boolean).join(' ');

  const itemClasses = [
    'ui-timeline-item',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={itemClasses} style={style}>
      <div className={dotClasses} />
      <div className={contentClasses}>
        {(title || badge) && (
          <div className="ui-timeline-header">
            {title && <h3 className="ui-timeline-title">{title}</h3>}
            {badge && (
              <span className={`ui-timeline-badge ${variant !== 'default' ? variant : ''}`}>
                {badge}
              </span>
            )}
          </div>
        )}
        
        {date && (
          <div className="ui-timeline-date">{date}</div>
        )}
        
        {description && (
          <p className="ui-timeline-description">{description}</p>
        )}
        
        {children}
        
        {actions && (
          <div className="ui-timeline-actions">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

const Timeline = ({
  children,
  layout = 'vertical',
  position = 'left',
  lineStyle = 'default',
  size = 'default',
  variant = 'default',
  className = '',
  style = {}
}) => {
  const timelineClasses = [
    'ui-timeline',
    layout !== 'vertical' ? layout : '',
    position !== 'left' ? position : '',
    lineStyle !== 'default' ? lineStyle : '',
    size !== 'default' ? size : '',
    variant !== 'default' ? variant : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={timelineClasses} style={style}>
      {children}
    </div>
  );
};

Timeline.Item = TimelineItem;

Timeline.propTypes = {
  children: PropTypes.node,
  layout: PropTypes.oneOf(['vertical', 'horizontal', 'alternate']),
  position: PropTypes.oneOf(['left', 'center', 'right', 'top']),
  lineStyle: PropTypes.oneOf(['default', 'dashed', 'dotted', 'gradient']),
  size: PropTypes.oneOf(['default', 'small', 'large']),
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info']),
  className: PropTypes.string,
  style: PropTypes.object
};

TimelineItem.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  badge: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info']),
  dotStyle: PropTypes.oneOf(['default', 'outlined', 'square', 'large', 'xlarge']),
  contentStyle: PropTypes.oneOf(['default', 'bordered', 'elevated', 'flat']),
  actions: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Timeline;



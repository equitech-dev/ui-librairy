import React, { useState, useEffect } from 'react';
import './Tabs.scss';

const Tabs = ({
  children,
  defaultActiveTab = 0,
  activeTab,
  onTabChange,
  variant = 'default', // default, pills, cards
  size = 'medium', // small, medium, large
  orientation = 'horizontal', // horizontal, vertical
  className = '',
  ...props
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultActiveTab);
  
  const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab;
  
  useEffect(() => {
    if (activeTab !== undefined) {
      setInternalActiveTab(activeTab);
    }
  }, [activeTab]);
  
  const handleTabClick = (index) => {
    if (activeTab === undefined) {
      setInternalActiveTab(index);
    }
    onTabChange?.(index);
  };
  
  const tabs = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && child.type === Tab
  );
  
  const activeTabContent = tabs[currentActiveTab];
  
  return (
    <div 
      className={`ui-tabs ${variant} ${size} ${orientation} ${className}`}
      {...props}
    >
      <ul className="ui-tab-list" role="tablist">
        {tabs.map((tab, index) => {
          const { label, disabled, icon } = tab.props;
          const isActive = index === currentActiveTab;
          
          return (
            <li 
              key={index} 
              className="ui-tab-item" 
              role="presentation"
            >
              <button
                className={`ui-tab-button ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                onClick={() => !disabled && handleTabClick(index)}
                disabled={disabled}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${index}`}
                id={`tab-${index}`}
              >
                {icon && <span className="ui-tab-icon">{icon}</span>}
                {label}
              </button>
            </li>
          );
        })}
      </ul>
      
      {activeTabContent && (
        <div
          className={`ui-tab-content ${currentActiveTab === tabs.indexOf(activeTabContent) ? 'active' : ''}`}
          role="tabpanel"
          id={`tabpanel-${currentActiveTab}`}
          aria-labelledby={`tab-${currentActiveTab}`}
        >
          {activeTabContent.props.children}
        </div>
      )}
    </div>
  );
};

const Tab = ({ children, label, disabled = false, icon }) => {
  return children;
};

Tabs.Tab = Tab;

export default Tabs;


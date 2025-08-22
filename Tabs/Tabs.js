function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState, useEffect } from 'react';
import './Tabs.scss';
const Tabs = ({
  children,
  defaultActiveTab = 0,
  activeTab,
  onTabChange,
  variant = 'default',
  // default, pills, cards
  size = 'medium',
  // small, medium, large
  orientation = 'horizontal',
  // horizontal, vertical
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
  const handleTabClick = index => {
    if (activeTab === undefined) {
      setInternalActiveTab(index);
    }
    onTabChange?.(index);
  };
  const tabs = React.Children.toArray(children).filter(child => /*#__PURE__*/React.isValidElement(child) && child.type === Tab);
  const activeTabContent = tabs[currentActiveTab];
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `ui-tabs ${variant} ${size} ${orientation} ${className}`
  }, props), /*#__PURE__*/React.createElement("ul", {
    className: "ui-tab-list",
    role: "tablist"
  }, tabs.map((tab, index) => {
    const {
      label,
      disabled,
      icon
    } = tab.props;
    const isActive = index === currentActiveTab;
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      className: "ui-tab-item",
      role: "presentation"
    }, /*#__PURE__*/React.createElement("button", {
      className: `ui-tab-button ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`,
      onClick: () => !disabled && handleTabClick(index),
      disabled: disabled,
      role: "tab",
      "aria-selected": isActive,
      "aria-controls": `tabpanel-${index}`,
      id: `tab-${index}`
    }, icon && /*#__PURE__*/React.createElement("span", {
      className: "ui-tab-icon"
    }, icon), label));
  })), activeTabContent && /*#__PURE__*/React.createElement("div", {
    className: `ui-tab-content ${currentActiveTab === tabs.indexOf(activeTabContent) ? 'active' : ''}`,
    role: "tabpanel",
    id: `tabpanel-${currentActiveTab}`,
    "aria-labelledby": `tab-${currentActiveTab}`
  }, activeTabContent.props.children));
};
const Tab = ({
  children,
  label,
  disabled = false,
  icon
}) => {
  return children;
};
Tabs.Tab = Tab;
export default Tabs;
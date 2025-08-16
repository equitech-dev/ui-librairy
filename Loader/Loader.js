"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
const Loader = ({
  className = '',
  'aria-label': ariaLabel = 'Chargement en cours...',
  ...props
}) => /*#__PURE__*/React.createElement("div", _extends({
  className: `ui-loader ${className}`,
  role: "status",
  "aria-label": ariaLabel
}, props), /*#__PURE__*/React.createElement("div", {
  className: "ui-spinner"
}));
export default Loader;
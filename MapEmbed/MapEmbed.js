function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
export default function MapEmbed({
  src,
  width = '100%',
  height = 350,
  className = '',
  size = 'medium',
  'aria-label': ariaLabel = 'Carte intégrée',
  ...props
}) {
  const sizeClass = size === 'small' ? 'ui-map-embed-small' : size === 'large' ? 'ui-map-embed-large' : '';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `ui-map-embed ${sizeClass} ${className}`
  }, props, {
    "aria-label": ariaLabel
  }), /*#__PURE__*/React.createElement("iframe", {
    src: src,
    width: width,
    height: height,
    allowFullScreen: "",
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade",
    title: ariaLabel
  }));
}
"use client";

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from "react";

/**
 * GridItem - Individual grid item component
 * 
 * Props :
 * - children: Content to display in the grid item
 * - id: Unique identifier for the item
 * - col: Grid column position (1-based)
 * - row: Grid row position (1-based)
 * - w: Width in grid columns (default: 1)
 * - h: Height in grid rows (default: 1)
 * - draggable: Enable drag for this item (default: true if parent supports it)
 * - resizable: Enable resize for this item (default: true if parent supports it)
 * - lockable: Enable lock for this item (default: true if parent supports it)
 * - locked: Initial lock state (default: false)
 * - className: Additional CSS classes
 * - style: Additional inline styles
 * - ...props: Native props (aria-*, tabIndex, ref, etc.)
 */
const GridItem = ({
  children,
  id,
  col = 1,
  row = 1,
  w = 1,
  h = 1,
  draggable = true,
  resizable = true,
  lockable = true,
  locked = false,
  className = '',
  style = {},
  ...props
}) => {
  // Generate CSS variables for positioning
  const itemStyle = {
    ...style,
    '--ui-grid-item-col': col,
    '--ui-grid-item-row': row,
    '--ui-grid-item-w': w,
    '--ui-grid-item-h': h
  };

  // Build dataset attributes
  const dataset = {
    id,
    col: col.toString(),
    row: row.toString(),
    w: w.toString(),
    h: h.toString()
  };

  // Add lock state if applicable
  if (lockable) {
    dataset.locked = locked.toString();
  }

  // Build class names
  const classNames = ['ui-grid-item'];
  if (draggable) {
    classNames.push('ui-draggable');
  }
  if (resizable) {
    classNames.push('ui-resizable');
  }
  if (lockable && locked) {
    classNames.push('ui-locked');
  }
  if (className) {
    classNames.push(className);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames.join(' '),
    style: itemStyle
  }, dataset, props), children, resizable && /*#__PURE__*/React.createElement("div", {
    className: "ui-resize-handle",
    "aria-label": "Redimensionner",
    style: {
      pointerEvents: resizable ? 'auto' : 'none'
    }
  }));
};
export { GridItem };
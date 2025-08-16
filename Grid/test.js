import React from 'react';
import { AdvancedGrid, GridItem } from './index';

/**
 * Test simple du composant AdvancedGrid
 * Vérifie que le composant se rend correctement
 */
const GridTest = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "grid-test"
  }, /*#__PURE__*/React.createElement("h2", null, "Test AdvancedGrid"), /*#__PURE__*/React.createElement("div", {
    className: "test-section"
  }, /*#__PURE__*/React.createElement("h3", null, "Test 1: Grille basique"), /*#__PURE__*/React.createElement(AdvancedGrid, {
    columns: 6,
    gap: "8px",
    rowHeight: "60px"
  }, /*#__PURE__*/React.createElement(GridItem, {
    id: "test1",
    col: 1,
    row: 1,
    w: 2,
    h: 1
  }, "Test 1"), /*#__PURE__*/React.createElement(GridItem, {
    id: "test2",
    col: 3,
    row: 1,
    w: 1,
    h: 1
  }, "Test 2"), /*#__PURE__*/React.createElement(GridItem, {
    id: "test3",
    col: 4,
    row: 1,
    w: 2,
    h: 1
  }, "Test 3"))), /*#__PURE__*/React.createElement("div", {
    className: "test-section"
  }, /*#__PURE__*/React.createElement("h3", null, "Test 2: Grille avec drag & drop"), /*#__PURE__*/React.createElement(AdvancedGrid, {
    columns: 6,
    gap: "8px",
    rowHeight: "60px",
    draggable: true
  }, /*#__PURE__*/React.createElement(GridItem, {
    id: "drag1",
    col: 1,
    row: 1,
    w: 1,
    h: 1
  }, "Drag 1"), /*#__PURE__*/React.createElement(GridItem, {
    id: "drag2",
    col: 2,
    row: 1,
    w: 1,
    h: 1
  }, "Drag 2"), /*#__PURE__*/React.createElement(GridItem, {
    id: "drag3",
    col: 3,
    row: 1,
    w: 1,
    h: 1
  }, "Drag 3"))), /*#__PURE__*/React.createElement("div", {
    className: "test-section"
  }, /*#__PURE__*/React.createElement("h3", null, "Test 3: Grille compl\xE8te"), /*#__PURE__*/React.createElement(AdvancedGrid, {
    columns: 6,
    gap: "8px",
    rowHeight: "60px",
    draggable: true,
    resizable: true,
    autoReposition: true,
    lockSystem: true,
    collisionDetection: "advanced"
  }, /*#__PURE__*/React.createElement(GridItem, {
    id: "full1",
    col: 1,
    row: 1,
    w: 2,
    h: 1
  }, "Full 1"), /*#__PURE__*/React.createElement(GridItem, {
    id: "full2",
    col: 3,
    row: 1,
    w: 1,
    h: 1
  }, "Full 2"), /*#__PURE__*/React.createElement(GridItem, {
    id: "full3",
    col: 4,
    row: 1,
    w: 2,
    h: 1
  }, "Full 3"))), /*#__PURE__*/React.createElement("style", {
    jsx: true
  }, `
        .grid-test {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .test-section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #f9f9f9;
        }
        
        .test-section h3 {
          margin: 0 0 15px 0;
          color: #333;
          font-size: 1.1rem;
        }
        
        h2 {
          text-align: center;
          color: #007acc;
          margin-bottom: 30px;
        }
      `));
};
export default GridTest;
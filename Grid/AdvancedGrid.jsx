"use client";
import React, { useEffect, useRef, useReducer, useCallback, useMemo } from "react";

// Types d'actions pour useReducer
const GRID_ACTIONS = {
  SET_GRID_METRICS: 'SET_GRID_METRICS',
  START_DRAG: 'START_DRAG',
  START_RESIZE: 'START_RESIZE',
  UPDATE_DRAG: 'UPDATE_DRAG',
  UPDATE_RESIZE: 'UPDATE_RESIZE',
  END_DRAG: 'END_DRAG',
  END_RESIZE: 'END_RESIZE',
  TOGGLE_LOCK: 'TOGGLE_LOCK',
  RESET: 'RESET'
};

// État initial optimisé
const initialState = {
  gridMetrics: null,
  isDragging: false,
  isResizing: false,
  active: null,
  startMouse: { x: 0, y: 0 },
  startState: { col: 1, row: 1, w: 1, h: 1 },
  grabOffset: { dc: 0, dr: 0 },
  lockedItems: new Set()
};

// Reducer optimisé
const gridReducer = (state, action) => {
  switch (action.type) {
    case GRID_ACTIONS.SET_GRID_METRICS:
      return {
        ...state,
        gridMetrics: action.payload
      };
    
    case GRID_ACTIONS.START_DRAG:
      return {
        ...state,
        isDragging: true,
        active: action.payload.element,
        startMouse: action.payload.mouse,
        startState: action.payload.state,
        grabOffset: action.payload.offset
      };
    
    case GRID_ACTIONS.START_RESIZE:
      return {
        ...state,
        isResizing: true,
        active: action.payload.element,
        startMouse: action.payload.mouse,
        startState: action.payload.state
      };
    
    case GRID_ACTIONS.UPDATE_DRAG:
      return {
        ...state,
        startMouse: action.payload.mouse
      };
    
    case GRID_ACTIONS.UPDATE_RESIZE:
      return {
        ...state,
        startMouse: action.payload.mouse
      };
    
    case GRID_ACTIONS.END_DRAG:
    case GRID_ACTIONS.END_RESIZE:
      return {
        ...state,
        isDragging: false,
        isResizing: false,
        active: null,
        startMouse: { x: 0, y: 0 },
        startState: { col: 1, row: 1, w: 1, h: 1 },
        grabOffset: { dc: 0, dr: 0 }
      };
    
    case GRID_ACTIONS.TOGGLE_LOCK:
      const newLockedItems = new Set(state.lockedItems);
      if (newLockedItems.has(action.payload)) {
        newLockedItems.delete(action.payload);
      } else {
        newLockedItems.add(action.payload);
      }
      return {
        ...state,
        lockedItems: newLockedItems
      };
    
    case GRID_ACTIONS.RESET:
      return initialState;
    
    default:
      return state;
  }
};

// Utilitaires mémorisés
const createGridUtils = (gridMetrics) => {
  if (!gridMetrics) return null;
  
  return {
    applyStyles: (element, newState) => {
      element.style.gridColumn = `${newState.col} / span ${newState.w}`;
      element.style.gridRow = `${newState.row} / span ${newState.h}`;
    },

    mouseToCell: (clientX, clientY) => {
      const { colWidth, rowHeight, gapX, gapY, rect } = gridMetrics;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const strideX = colWidth + gapX;
      const strideY = rowHeight + gapY;
      
      const col = Math.max(1, Math.min(gridMetrics.cols, Math.floor(x / strideX) + 1));
      const row = Math.max(1, Math.floor(y / strideY) + 1);
      
      return { col, row };
    },

    getElementState: (element) => ({
      col: +element.dataset.col,
      row: +element.dataset.row,
      w: +element.dataset.w || 1,
      h: +element.dataset.h || 1
    }),

    setElementState: (element, newState) => {
      element.dataset.col = newState.col;
      element.dataset.row = newState.row;
      element.dataset.w = newState.w;
      element.dataset.h = newState.h;
      return newState;
    }
  };
};

// Détection de collision optimisée
const createCollisionDetector = (gridRef, gridUtils) => {
  if (!gridRef.current || !gridUtils) return null;
  
  return {
    hasOverlap: (element, state) => {
      const otherItems = gridRef.current.querySelectorAll(".ui-grid-item");
      
      for (const other of otherItems) {
        if (other === element) continue;
        
        const otherState = gridUtils.getElementState(other);
        if (isOverlapping(state, otherState)) {
          return true;
        }
      }
      
      return false;
    },

    isOverlapping: (state1, state2) => {
      return !(state1.col + state1.w <= state2.col ||
              state2.col + state2.w <= state1.col ||
              state1.row + state1.h <= state2.row ||
              state2.row + state2.h <= state1.row);
    }
  };
};

// Fonction utilitaire pour vérifier les chevauchements
const isOverlapping = (state1, state2) => {
  return !(state1.col + state1.w <= state2.col ||
          state2.col + state2.w <= state1.col ||
          state1.row + state1.h <= state2.row ||
          state2.row + state2.h <= state1.row);
};

/**
 * AdvancedGrid Optimized - Grid component with optimized drag & drop, resize, and intelligent repositioning
 * 
 * Props :
 * - children: Grid items to display
 * - columns: Number of grid columns (default: 12)
 * - gap: Grid gap (default: "10px")
 * - rowHeight: Height of grid rows (default: "100px")
 * - draggable: Enable drag & drop (default: false)
 * - resizable: Enable resize (default: false)
 * - autoReposition: Enable automatic repositioning of other items (default: false)
 * - lockSystem: Enable lock system (default: false)
 * - collisionDetection: Collision detection mode - "basic" | "advanced" (default: "basic")
 * - onItemMove: Callback when item is moved (itemId, newPosition)
 * - onItemResize: Callback when item is resized (itemId, newSize)
 * - onItemLock: Callback when item is locked/unlocked (itemId, isLocked)
 * - className: Additional CSS classes
 * - style: Additional inline styles
 * - ...props: Native props (aria-*, tabIndex, ref, etc.)
 */
const AdvancedGridOptimized = ({
  children,
  columns = 12,
  gap = "10px",
  rowHeight = "100px",
  draggable = false,
  resizable = false,
  autoReposition = false,
  lockSystem = false,
  collisionDetection = "basic",
  onItemMove,
  onItemResize,
  onItemLock,
  className = '',
  style = {},
  'aria-label': ariaLabel,
  ...props
}) => {
  const gridRef = useRef(null);
  const [state, dispatch] = useReducer(gridReducer, initialState);
  
  // Constantes mémorisées
  const CONSTANTS = useMemo(() => ({
    MAX_ROW: 50,
    MAX_ITERATIONS: 3,
    MAX_ATTEMPTS: 5,
    SEARCH_RANGE: 8,
    SIDE_SEARCH_RANGE: 3
  }), []);

  // Utilitaires de grille mémorisés
  const gridUtils = useMemo(() => 
    createGridUtils(state.gridMetrics), [state.gridMetrics]
  );

  // Détecteur de collision mémorisé
  const collisionDetector = useMemo(() => 
    createCollisionDetector(gridRef, gridUtils), [gridRef, gridUtils]
  );

  // Calcul des métriques de grille optimisé
  const calculateGridMetrics = useCallback(() => {
    if (!gridRef.current) return null;
    
    const grid = gridRef.current;
    const styles = getComputedStyle(grid);
    const cols = styles.gridTemplateColumns.split(" ").length;
    const gapX = parseFloat((styles.columnGap || styles.gap || "0").toString());
    const gapY = parseFloat((styles.rowGap || styles.gap || "0").toString());
    const totalGapWidth = (cols - 1) * gapX;
    const colWidth = (grid.clientWidth - totalGapWidth) / cols;
    const computedRowHeight = parseFloat(styles.gridAutoRows);
    const rect = grid.getBoundingClientRect();
    
    return { cols, colWidth, rowHeight: computedRowHeight, gapX, gapY, rect };
  }, []);

  // Gestionnaires d'événements optimisés
  const handleMouseDown = useCallback((event) => {
    if (!draggable && !resizable) return;
    
    const item = event.target.closest(".ui-grid-item");
    if (!item || state.lockedItems.has(item.dataset.id)) return;
    
    const isResizeHandle = event.target.classList.contains("ui-resize-handle");
    if (isResizeHandle && !resizable) return;
    if (!isResizeHandle && !draggable) return;
    
    const mouse = { x: event.clientX, y: event.clientY };
    const elementState = gridUtils.getElementState(item);
    
    if (isResizeHandle) {
      dispatch({
        type: GRID_ACTIONS.START_RESIZE,
        payload: { element: item, mouse, state: elementState }
      });
    } else {
      const rect = item.getBoundingClientRect();
      const gridRect = gridRef.current.getBoundingClientRect();
      const offset = {
        dc: event.clientX - rect.left,
        dr: event.clientY - rect.top
      };
      
      dispatch({
        type: GRID_ACTIONS.START_DRAG,
        payload: { element: item, mouse, state: elementState, offset }
      });
    }
    
    event.preventDefault();
  }, [draggable, resizable, state.lockedItems, gridUtils]);

  const handleMouseMove = useCallback((event) => {
    if (!state.active) return;
    
    const mouse = { x: event.clientX, y: event.clientY };
    
    if (state.isDragging) {
      dispatch({ type: GRID_ACTIONS.UPDATE_DRAG, payload: { mouse } });
      handleDrag(event);
    }
    
    if (state.isResizing) {
      dispatch({ type: GRID_ACTIONS.UPDATE_RESIZE, payload: { mouse } });
      handleResize(event);
    }
  }, [state.active, state.isDragging, state.isResizing]);

  const handleMouseUp = useCallback(() => {
    if (!state.active) return;
    
    if (state.isDragging) {
      dispatch({ type: GRID_ACTIONS.END_DRAG });
      handleDrop();
    }
    
    if (state.isResizing) {
      dispatch({ type: GRID_ACTIONS.END_RESIZE });
      handleResizeEnd();
    }
    
    state.active.classList.remove("ui-dragging", "ui-resizing");
  }, [state.active, state.isDragging, state.isResizing]);

  // Logique de drag optimisée
  const handleDrag = useCallback((event) => {
    if (!state.active || !gridUtils || !collisionDetector) return;
    
    const { col, row } = gridUtils.mouseToCell(event.clientX, event.clientY);
    const newState = {
      col: Math.max(1, col - state.grabOffset.dc),
      row: Math.max(1, row - state.grabOffset.dr),
      w: state.startState.w,
      h: state.startState.h
    };
    
    // Vérification des limites
    newState.col = Math.min(columns - newState.w + 1, newState.col);
    
    // Vérification des collisions si activée
    if (collisionDetection === "basic" && collisionDetector.hasOverlap(state.active, newState)) {
      return;
    }
    
    gridUtils.setElementState(state.active, newState);
  }, [state.active, state.grabOffset, state.startState, columns, gridUtils, collisionDetector, collisionDetection]);

  // Logique de resize optimisée
  const handleResize = useCallback((event) => {
    if (!state.active || !gridUtils) return;
    
    const { col, row } = gridUtils.mouseToCell(event.clientX, event.clientY);
    const newState = {
      col: state.startState.col,
      row: state.startState.row,
      w: Math.max(1, col - state.startState.col + 1),
      h: Math.max(1, row - state.startState.row + 1)
    };
    
    // Vérification des limites
    newState.w = Math.min(columns - newState.col + 1, newState.w);
    newState.h = Math.min(CONSTANTS.MAX_ROW - newState.row + 1, newState.h);
    
    gridUtils.setElementState(state.active, newState);
  }, [state.active, state.startState, columns, CONSTANTS.MAX_ROW, gridUtils]);

  // Gestion de fin de drag
  const handleDrop = useCallback(() => {
    if (!state.active || !onItemMove) return;
    
    const newState = gridUtils.getElementState(state.active);
    onItemMove(state.active.dataset.id, newState);
  }, [state.active, onItemMove, gridUtils]);

  // Gestion de fin de resize
  const handleResizeEnd = useCallback(() => {
    if (!state.active || !onItemResize) return;
    
    const newState = gridUtils.getElementState(state.active);
    onItemResize(state.active.dataset.id, { w: newState.w, h: newState.h });
  }, [state.active, onItemResize, gridUtils]);

  // Gestion du double-clic pour le lock
  const handleDoubleClick = useCallback((event) => {
    if (!lockSystem) return;
    
    const item = event.target.closest(".ui-grid-item");
    if (!item || event.target.classList.contains("ui-resize-handle")) return;
    
    const itemId = item.dataset.id;
    dispatch({ type: GRID_ACTIONS.TOGGLE_LOCK, payload: itemId });
    
    if (onItemLock) {
      const isLocked = !state.lockedItems.has(itemId);
      onItemLock(itemId, isLocked);
    }
    
    event.preventDefault();
  }, [lockSystem, onItemLock, state.lockedItems]);

  // Initialisation des métriques de grille
  useEffect(() => {
    const updateMetrics = () => {
      const metrics = calculateGridMetrics();
      if (metrics) {
        dispatch({ type: GRID_ACTIONS.SET_GRID_METRICS, payload: metrics });
      }
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    
    return () => {
      window.removeEventListener("resize", updateMetrics);
    };
  }, [calculateGridMetrics]);

  // Gestionnaires d'événements globaux
  useEffect(() => {
    if (state.isDragging || state.isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [state.isDragging, state.isResizing, handleMouseMove, handleMouseUp]);

  // Initialisation des éléments de grille
  useEffect(() => {
    if (!gridRef.current || !state.gridMetrics) return;
    
    const items = Array.from(gridRef.current.querySelectorAll(".ui-grid-item"));
    
    items.forEach((element, index) => {
      if (!element.dataset.col) {
        const col = (index % state.gridMetrics.cols) + 1;
        const row = Math.floor(index / state.gridMetrics.cols) + 1;
        
        gridUtils.setElementState(element, {
          col,
          row,
          w: element.dataset.w || 1,
          h: element.dataset.h || 1
        });
      }
    });
  }, [state.gridMetrics, gridUtils]);

  // Styles de grille optimisés
  const gridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
    gridAutoRows: rowHeight,
    ...style
  }), [columns, gap, rowHeight, style]);

  return (
    <div
      ref={gridRef}
      className={`ui-advanced-grid ${className}`}
      style={gridStyle}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      aria-label={ariaLabel}
      role="grid"
      {...props}
    >
      {children}
    </div>
  );
};

export default AdvancedGridOptimized;

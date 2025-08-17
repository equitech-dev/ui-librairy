"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

/**
 * AdvancedGrid - Grid component with drag & drop, resize, and intelligent repositioning
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
const AdvancedGrid = ({
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
  const [gridMetrics, setGridMetrics] = useState(null);
  
  // State management
  const [state, setState] = useState({
    isDragging: false,
    isResizing: false,
    active: null,
    startMouse: { x: 0, y: 0 },
    startState: { col: 1, row: 1, w: 1, h: 1 },
    grabOffset: { dc: 0, dr: 0 }
  });

  // Constants
  const CONSTANTS = {
    MAX_ROW: 50,
    MAX_ITERATIONS: 3,
    MAX_ATTEMPTS: 5,
    SEARCH_RANGE: 8,
    SIDE_SEARCH_RANGE: 3
  };

  // Grid utilities - using useRef to prevent recreation on every render
  const GridUtils = useRef({
    getMetrics: () => {
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
    },

    applyStyles: (element, newState) => {
      element.style.gridColumn = `${newState.col} / span ${newState.w}`;
      element.style.gridRow = `${newState.row} / span ${newState.h}`;
    },

    mouseToCell: (clientX, clientY) => {
      if (!gridMetrics) return { col: 1, row: 1 };
      
      const { colWidth, rowHeight, gapX, gapY, rect } = gridMetrics;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const strideX = colWidth + gapX;
      const strideY = rowHeight + gapY;
      
      const col = Math.max(1, Math.min(gridMetrics.cols, Math.floor(x / strideX) + 1));
      const row = Math.max(1, Math.floor(y / strideY) + 1);
      
      return { col, row };
    }
  }).current;

  // Element state management - using useRef to prevent recreation on every render
  const ElementState = useRef({
    get: (element) => {
      return {
        col: +element.dataset.col,
        row: +element.dataset.row,
        w: +element.dataset.w || 1,
        h: +element.dataset.h || 1
      };
    },

    set: (element, newState) => {
      element.dataset.col = newState.col;
      element.dataset.row = newState.row;
      element.dataset.w = newState.w;
      element.dataset.h = newState.h;
      GridUtils.applyStyles(element, newState);
    }
  }).current;

  // Collision detection - using useRef to prevent recreation on every render
  const CollisionDetector = useRef({
    hasOverlap: (element, state) => {
      if (!gridRef.current) return false;
      
      const otherItems = gridRef.current.querySelectorAll(".ui-grid-item");
      
      for (const other of otherItems) {
        if (other === element) continue;
        
        const otherState = ElementState.get(other);
        if (CollisionDetector._isOverlapping(state, otherState)) {
          return true;
        }
      }
      
      return false;
    },

    _isOverlapping: (state1, state2) => {
      return !(state1.col + state1.w <= state2.col ||
              state2.col + state2.w <= state1.col ||
              state1.row + state1.h <= state2.row ||
              state2.row + state2.h <= state1.row);
    }
  }).current;

  // Position finding algorithms (only if advanced collision detection is enabled)
  const PositionFinder = useMemo(() => {
    if (collisionDetection !== "advanced") return null;
    
    return {
      findNearestFree: (element, desiredState) => {
        if (!gridMetrics) return desiredState;
        
        const { cols } = gridMetrics;
        
        // Try exact position first
        if (!CollisionDetector.hasOverlap(element, desiredState)) {
          return desiredState;
        }
        
        // Search for nearest available position
        for (let row = Math.max(1, desiredState.row); row <= CONSTANTS.MAX_ROW; row++) {
          for (let col = 1; col <= cols - desiredState.w + 1; col++) {
            const trialState = { ...desiredState, col, row };
            if (!CollisionDetector.hasOverlap(element, trialState)) {
              return trialState;
            }
          }
        }
        
        // Fallback: push to bottom
        return { ...desiredState, row: CONSTANTS.MAX_ROW + 1 };
      },

      findBestPosition: (item, desiredState) => {
        if (!CollisionDetector.hasOverlap(item, desiredState)) {
          return desiredState;
        }
        
        const { cols } = gridMetrics;
        const strategies = [
          // Priority 1: Try going up
          { 
            start: Math.max(1, desiredState.row - CONSTANTS.SEARCH_RANGE), 
            end: desiredState.row - 1, 
            direction: 'up' 
          },
          // Priority 2: Try sideways
          { 
            start: desiredState.row, 
            end: desiredState.row, 
            direction: 'side' 
          },
          // Priority 3: Try going down
          { 
            start: desiredState.row + 1, 
            end: Math.min(CONSTANTS.MAX_ROW, desiredState.row + CONSTANTS.SEARCH_RANGE), 
            direction: 'down' 
          }
        ];
        
        for (const strategy of strategies) {
          for (let row = strategy.start; row <= strategy.end; row++) {
            if (row < 1 || row > CONSTANTS.MAX_ROW) continue;
            
            if (strategy.direction === 'side') {
              // Try left first
              for (let col = Math.max(1, desiredState.col - CONSTANTS.SIDE_SEARCH_RANGE); col <= desiredState.col; col++) {
                if (col + desiredState.w - 1 > cols) continue;
                const trial = { ...desiredState, col, row };
                if (!CollisionDetector.hasOverlap(item, trial)) {
                  return trial;
                }
              }
              // Try right
              for (let col = desiredState.col + 1; col <= Math.min(cols - desiredState.w + 1, desiredState.col + CONSTANTS.SIDE_SEARCH_RANGE); col++) {
                const trial = { ...desiredState, col, row };
                if (!CollisionDetector.hasOverlap(item, trial)) {
                  return trial;
                }
              }
            } else {
              // Try all columns for up/down
              for (let col = 1; col <= cols - desiredState.w + 1; col++) {
                const trial = { ...desiredState, col, row };
                if (!CollisionDetector.hasOverlap(item, trial)) {
                  return trial;
                }
              }
            }
          }
        }
        
        // Last resort: push down
        return { ...desiredState, row: CONSTANTS.MAX_ROW + 1 };
      }
    };
  }, [collisionDetection, gridMetrics, CollisionDetector]);

  // Repositioning strategies (only if autoReposition is enabled)
  const RepositioningStrategy = useMemo(() => {
    if (!autoReposition) return null;
    
    return {
    forResize: (element, targetState) => {
      if (!gridRef.current || collisionDetection !== "advanced") return;
      
      const items = Array.from(gridRef.current.querySelectorAll(".ui-grid-item"));
      const repositionedItems = new Set();
      
      // First pass: reposition directly blocking items
      RepositioningStrategy._repositionBlockingItems(element, targetState, items, repositionedItems);
      
      // Second pass: resolve overlaps between repositioned items
      RepositioningStrategy._resolveOverlaps(element, items, repositionedItems);
    },

    forDrop: (element, targetState) => {
      if (!gridRef.current || collisionDetection !== "advanced") return;
      
      const items = Array.from(gridRef.current.querySelectorAll(".ui-grid-item"));
      const repositionedItems = new Set();
      
      // Reposition blocking items
      RepositioningStrategy._repositionBlockingItems(element, targetState, items, repositionedItems);
      
      // Resolve overlaps
      RepositioningStrategy._resolveOverlaps(element, items, repositionedItems);
    },

    _repositionBlockingItems: (element, targetState, items, repositionedItems) => {
      if (!PositionFinder) return;
      
      for (const item of items) {
        if (item === element || repositionedItems.has(item) || item.dataset.locked === "true") {
          continue;
        }
        
        const currentState = ElementState.get(item);
        if (CollisionDetector._isOverlapping(targetState, currentState)) {
          const newState = PositionFinder.findBestPosition(item, { ...currentState });
          ElementState.set(item, newState);
          repositionedItems.add(item);
        }
      }
    },

    _resolveOverlaps: (element, items, repositionedItems) => {
      if (!PositionFinder) return;
      
      let hasOverlaps = true;
      let iterations = 0;
      
      while (hasOverlaps && iterations < CONSTANTS.MAX_ITERATIONS) {
        hasOverlaps = false;
        iterations++;
        
        for (const item1 of items) {
          if (item1 === element || item1.dataset.locked === "true") continue;
          
          for (const item2 of items) {
            if (item2 === element || item1 === item2 || item2.dataset.locked === "true") continue;
            
            const state1 = ElementState.get(item1);
            const state2 = ElementState.get(item2);
            
            if (CollisionDetector._isOverlapping(state1, state2)) {
              const newState = PositionFinder.findBestPosition(item2, { ...state2 });
              ElementState.set(item2, newState);
              hasOverlaps = true;
            }
          }
        }
      }
    }
  };
}, [autoReposition, collisionDetection, PositionFinder, CollisionDetector, ElementState]);

  // Lock system - using useRef to prevent recreation on every render
  const LockSystem = useMemo(() => {
    if (!lockSystem) return null;
    
    return {
      toggle: (element) => {
        const isLocked = element.dataset.locked === "true";
        element.dataset.locked = !isLocked;
        
        if (!isLocked) {
          element.classList.add("ui-locked");
          element.style.opacity = "0.7";
          element.style.filter = "grayscale(20%)";
        } else {
          element.classList.remove("ui-locked");
          element.style.opacity = "1";
          element.style.filter = "none";
        }
        
        // Call callback
        if (onItemLock) {
          onItemLock(element.dataset.id, !isLocked);
        }
      }
    };
  }, [lockSystem, onItemLock]);

  // Event handlers - using useMemo to prevent recreation on every render
  const EventHandlers = useMemo(() => ({
    onMouseDown: (event) => {
      if (!draggable && !resizable) return;
      
      const item = event.target.closest(".ui-grid-item");
      if (!item) return;
      
      const metrics = GridUtils.getMetrics();
      if (!metrics) return;
      
      setGridMetrics(metrics);
      
      const onHandle = event.target.classList.contains("ui-resize-handle");
      
      setState(prev => ({
        ...prev,
        active: item,
        startMouse: { x: event.clientX, y: event.clientY },
        startState: ElementState.get(item)
      }));
      
      const startPointerCell = GridUtils.mouseToCell(event.clientX, event.clientY);
      const startState = ElementState.get(item);
      
      setState(prev => ({
        ...prev,
        grabOffset: {
          dc: startPointerCell.col - startState.col,
          dr: startPointerCell.row - startState.row
        }
      }));
      
      if (onHandle && resizable) {
        setState(prev => ({ ...prev, isResizing: true, isDragging: false }));
      } else if (draggable) {
        setState(prev => ({ ...prev, isDragging: true, isResizing: false }));
        item.classList.add("ui-dragging");
      }
      
      window.addEventListener("mousemove", EventHandlers.onMouseMove);
      window.addEventListener("mouseup", EventHandlers.onMouseUp);
      event.preventDefault();
    },

    onMouseMove: (event) => {
      if (!state.active) return;
      
      if (state.isDragging) {
        EventHandlers._handleDrag(event);
      }
      
      if (state.isResizing) {
        EventHandlers._handleResize(event);
      }
    },

    onMouseUp: (event) => {
      if (!state.active) return;
      
      if (state.isDragging) {
        EventHandlers._handleDrop();
      }
      
      state.active.classList.remove("ui-dragging");
      setState(prev => ({
        ...prev,
        isDragging: false,
        isResizing: false,
        active: null
      }));
      
      window.removeEventListener("mousemove", EventHandlers.onMouseMove);
      window.removeEventListener("mouseup", EventHandlers.onMouseUp);
    },

    onDoubleClick: (event) => {
      if (!lockSystem) return;
      
      const item = event.target.closest(".ui-grid-item");
      if (!item || event.target.classList.contains("ui-resize-handle")) return;
      
      LockSystem.toggle(item);
      event.preventDefault();
    },

    _handleDrag: (event) => {
      if (!state.active || !gridMetrics) return;
      
      const { col, row } = GridUtils.mouseToCell(event.clientX, event.clientY);
      const newState = { ...ElementState.get(state.active) };
      
      newState.col = col - state.grabOffset.dc;
      newState.row = row - state.grabOffset.dr;
      
      // Apply column limits only, not row limits
      if (newState.col < 1) newState.col = 1;
      if (newState.col + newState.w - 1 > gridMetrics.cols) {
        newState.col = Math.max(1, gridMetrics.cols - newState.w + 1);
      }
      
      // Allow free movement during drag, repositioning only on drop
      ElementState.set(state.active, newState);
    },

    _handleResize: (event) => {
      if (!state.active || !gridMetrics) return;
      
      const { colWidth, rowHeight } = gridMetrics;
      const dx = event.clientX - state.startMouse.x;
      const dy = event.clientY - state.startMouse.y;
      
      const newW = Math.max(1, Math.round(state.startState.w + dx / colWidth));
      const newH = Math.max(1, Math.round(state.startState.h + dy / rowHeight));
      const newState = { ...state.startState, w: newW, h: newH };
      
      // Always try to keep element in place by moving blocking elements dynamically
      if (!CollisionDetector.hasOverlap(state.active, newState)) {
        // No conflict, direct resize
        ElementState.set(state.active, newState);
      } else if (autoReposition && RepositioningStrategy) {
        // Conflict detected, dynamically move blocking elements and apply resize
        RepositioningStrategy.forResize(state.active, newState);
        ElementState.set(state.active, newState);
      }
      
      // Call callback
      if (onItemResize) {
        onItemResize(state.active.dataset.id, { w: newW, h: newH });
      }
    },

    _handleDrop: () => {
      if (!state.active) return;
      
      const currentState = ElementState.get(state.active);
      
      // If element overlaps others and autoReposition is enabled, reposition them intelligently
      if (CollisionDetector.hasOverlap(state.active, currentState) && autoReposition && RepositioningStrategy) {
        RepositioningStrategy.forDrop(state.active, currentState);
        
        // Check if final position is now free
        if (!CollisionDetector.hasOverlap(state.active, currentState)) {
          ElementState.set(state.active, currentState);
        } else if (PositionFinder) {
          // If still not free, find best position
          const finalState = PositionFinder.findNearestFree(state.active, currentState);
          ElementState.set(state.active, currentState);
        }
      }
      
      // Call callback
      if (onItemMove) {
        onItemMove(state.active.dataset.id, currentState);
      }
    }
  }), [draggable, resizable, lockSystem, GridUtils, ElementState, CollisionDetector, autoReposition, RepositioningStrategy, PositionFinder, onItemResize, onItemMove]);

  // Initialize grid metrics on mount and resize
  useEffect(() => {
    const updateMetrics = () => {
      const metrics = GridUtils.getMetrics();
      if (metrics) {
        setGridMetrics(metrics);
      }
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    
    return () => {
      window.removeEventListener("resize", updateMetrics);
    };
  }, [GridUtils]);

  // Initialize grid items
  useEffect(() => {
    if (!gridRef.current || !gridMetrics) return;
    
    const items = Array.from(gridRef.current.querySelectorAll(".ui-grid-item"));
    
    items.forEach((element, index) => {
      // Only initialize if not already set
      if (!element.dataset.col) {
        const col = (index % gridMetrics.cols) + 1;
        const row = Math.floor(index / gridMetrics.cols) + 1;
        
        element.dataset.col = col;
        element.dataset.row = row;
        element.dataset.w = element.dataset.w || 1;
        element.dataset.h = element.dataset.h || 1;
        
        GridUtils.applyStyles(element, {
          col,
          row,
          w: element.dataset.w || 1,
          h: element.dataset.h || 1
        });
      }
    });
  }, [gridMetrics, GridUtils]);

  // Bind event listeners
  useEffect(() => {
    if (!gridRef.current) return;
    
    const grid = gridRef.current;
    
    if (draggable || resizable) {
      grid.addEventListener("mousedown", EventHandlers.onMouseDown);
    }
    
    if (lockSystem) {
      grid.addEventListener("dblclick", EventHandlers.onDoubleClick);
    }
    
    return () => {
      if (draggable || resizable) {
        grid.removeEventListener("mousedown", EventHandlers.onMouseDown);
      }
      
      if (lockSystem) {
        grid.removeEventListener("dblclick", EventHandlers.onDoubleClick);
      }
    };
  }, [draggable, resizable, lockSystem, EventHandlers]);

  // Cleanup global event listeners
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", EventHandlers.onMouseMove);
      window.removeEventListener("mouseup", EventHandlers.onMouseUp);
    };
  }, [EventHandlers]);

  // Generate CSS variables for grid configuration
  const gridStyle = {
    ...style,
    '--ui-grid-columns': columns,
    '--ui-grid-gap': gap,
    '--ui-grid-row-height': rowHeight
  };

  return (
    <div 
      ref={gridRef}
      className={`ui-advanced-grid ${className}`}
      style={gridStyle}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </div>
  );
};

export { AdvancedGrid };



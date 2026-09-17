"use client";

import { forwardRef, type HTMLAttributes, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from "react";

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

function minWidthStyle(minWidth?: number | string): { minWidth: string } | undefined {
  if (minWidth === undefined) return undefined;
  return { minWidth: typeof minWidth === "number" ? `${minWidth}px` : minWidth };
}

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Minimum width of the table inside the horizontal scroller. Default 920px. */
  minWidth?: number | string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className = "", minWidth = 920, children, style, ...props },
  ref,
) {
  return (
    <div className="ui-table-scroll">
      <table
        ref={ref}
        className={cx("ui-table", className)}
        style={{ ...minWidthStyle(minWidth), ...style }}
        {...props}
      >
        {children}
      </table>
    </div>
  );
});

Table.displayName = "Table";

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className = "", ...props }, ref) {
    return <thead ref={ref} className={cx("ui-table-header", className)} {...props} />;
  },
);
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className = "", ...props }, ref) {
    return <tbody ref={ref} className={cx("ui-table-body", className)} {...props} />;
  },
);
TableBody.displayName = "TableBody";

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  function TableRow({ className = "", ...props }, ref) {
    return <tr ref={ref} className={cx("ui-table-row", className)} {...props} />;
  },
);
TableRow.displayName = "TableRow";

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className = "", numeric = false, ...props },
  ref,
) {
  return (
    <th
      ref={ref}
      className={cx("ui-table-head", numeric && "ui-table-head--end", className)}
      {...props}
    />
  );
});
TableHead.displayName = "TableHead";

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className = "", numeric = false, ...props },
  ref,
) {
  return (
    <td
      ref={ref}
      className={cx("ui-table-cell", numeric && "ui-table-cell--end", className)}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

const BAR_WIDTHS = ["72%", "88%", "48%", "64%", "40%", "56%", "70%", "44%"];

export interface TableSkeletonProps {
  columns: string[];
  rows?: number;
  label: string;
  minWidth?: number | string;
}

export function TableSkeleton({ columns, rows = 7, label, minWidth = 920 }: TableSkeletonProps) {
  return (
    <Table minWidth={minWidth} aria-busy="true" aria-label={label}>
      <TableHeader>
        <TableRow>
          {columns.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }, (_, row) => (
          <TableRow key={row} className="ui-table-skel-row">
            {columns.map((header, col) => (
              <TableCell key={header}>
                <span
                  className="ui-table-skel-bar"
                  style={{ width: BAR_WIDTHS[(row + col) % BAR_WIDTHS.length] }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

TableSkeleton.displayName = "TableSkeleton";

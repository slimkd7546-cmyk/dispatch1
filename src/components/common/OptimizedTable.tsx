import React, { memo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import VirtualScroller from './VirtualScroller';

interface OptimizedTableProps<T> {
  data: T[];
  columns: {
    key: string;
    header: React.ReactNode;
    cell: (item: T) => React.ReactNode;
    className?: string;
  }[];
  className?: string;
  rowClassName?: string | ((item: T, index: number) => string);
  virtualScroll?: boolean;
  maxHeight?: number;
  itemHeight?: number;
  onRowClick?: (item: T) => void;
}

/**
 * A performance-optimized table component that:
 * - Supports virtualization for large datasets
 * - Memoizes rendering for better performance
 * - Supports custom styling and row click handlers
 */
function OptimizedTable<T>({ 
  data, 
  columns, 
  className = '', 
  rowClassName = '',
  virtualScroll = false,
  maxHeight = 400,
  itemHeight = 48,
  onRowClick
}: OptimizedTableProps<T>) {
  // Render a regular table row
  const renderRow = (item: T, index: number) => {
    const rowClass = typeof rowClassName === 'function' ? rowClassName(item, index) : rowClassName;
    
    return (
      <TableRow 
        key={index} 
        className={`${rowClass} ${onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}`}
        onClick={() => onRowClick && onRowClick(item)}
      >
        {columns.map((column) => (
          <TableCell key={column.key} className={column.className}>
            {column.cell(item)}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  // Render the table header
  const TableHeaderComponent = memo(() => (
    <TableHeader>
      <TableRow>
        {columns.map((column) => (
          <TableHead key={column.key} className={column.className}>
            {column.header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  ));

  // If using virtual scrolling
  if (virtualScroll && data.length > 20) {
    return (
      <div className={`border rounded-md ${className}`}>
        <Table>
          <TableHeaderComponent />
          <TableBody className="relative">
            <tr>
              <td colSpan={columns.length} className="p-0">
                <VirtualScroller
                  items={data}
                  height={maxHeight}
                  itemHeight={itemHeight}
                  renderItem={(item, index) => renderRow(item, index)}
                />
              </td>
            </tr>
          </TableBody>
        </Table>
      </div>
    );
  }

  // Regular table rendering for smaller datasets
  return (
    <div className={`border rounded-md ${className} ${virtualScroll ? 'max-h-[' + maxHeight + 'px] overflow-auto' : ''}`}>
      <Table>
        <TableHeaderComponent />
        <TableBody>
          {data.map((item, index) => renderRow(item, index))}
        </TableBody>
      </Table>
    </div>
  );
}

export default memo(OptimizedTable) as typeof OptimizedTable;

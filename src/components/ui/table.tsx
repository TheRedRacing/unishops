import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
        <table ref={ref} className={cn("w-full caption-bottom border-separate border-spacing-0 border-none text-left text-sm", className)} {...props} />
    </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => <thead ref={ref} className={cn("h-8 rounded-md bg-zinc-100 dark:bg-zinc-900 [&_tr]:border-b", className)} {...props} />);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => <tfoot ref={ref} className={cn("border-t bg-zinc-100/50 font-medium dark:bg-zinc-800/50 [&>tr]:last:border-b-0", className)} {...props} />);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => <tr ref={ref} className={cn("transition-colors duration-75", className)} {...props} />);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => <th ref={ref} className={cn("h-8 border-b border-t border-zinc-300 px-3 text-left align-middle text-xs font-semibold text-zinc-500 first:rounded-l-md first:border-l last:rounded-r-md last:border-r dark:border-zinc-700 dark:text-zinc-200 [&:has([role=checkbox])]:pr-0", className)} {...props} />);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => <td ref={ref} className={cn("h-10 truncate border-b border-zinc-300 px-3 py-3 align-middle text-sm dark:border-zinc-700 [&:has([role=checkbox])]:pr-0", className)} {...props} />);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => <caption ref={ref} className={cn("mt-4 text-sm text-zinc-500 dark:text-zinc-400", className)} {...props} />);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

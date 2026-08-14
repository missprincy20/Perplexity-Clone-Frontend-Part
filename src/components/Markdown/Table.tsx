import type {
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
  HTMLAttributes,
} from "react";

export function MarkdownTable({
  children,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-white/10">
      <table
        {...props}
        className="w-full border-collapse text-sm"
      >
        {children}
      </table>
    </div>
  );
}

export function MarkdownTableHead({
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      {...props}
      className="bg-[#18181B]"
    >
      {children}
    </thead>
  );
}

export function MarkdownTableBody({
  children,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      {...props}
      className="bg-[#111113]"
    >
      {children}
    </tbody>
  );
}

export function MarkdownTableRow({
  children,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      {...props}
      className="
      border-b
      border-white/5
      transition
      hover:bg-white/5
      "
    >
      {children}
    </tr>
  );
}

export function MarkdownTableHeader({
  children,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className="
      px-5
      py-3
      text-left
      font-semibold
      text-white
      "
    >
      {children}
    </th>
  );
}

export function MarkdownTableCell({
  children,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className="
      px-5
      py-3
      text-zinc-300
      "
    >
      {children}
    </td>
  );
}
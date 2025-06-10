import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MdDeleteSweep } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PrintCardsInfo } from "./PrintCardsTable";
import { deleteMultipleCards } from "@/lib/firebase/actions/card.action";
import { toast } from "react-toastify";
import { UserState } from "@/types/types";
import { LoaderCircle } from "lucide-react";

interface PrintCardsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  user: UserState;
}

const PrintCardsDataTable = <TData, TValue>({
  columns,
  data,
  user,
}: PrintCardsDataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      rowSelection,
    },
  });

  const handleBulkDelete = async () => {
    const ids = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => (row.original as PrintCardsInfo).id)
      .filter((id): id is string => typeof id === "string");

    if (ids.length === 0) return;

    setIsDeleting(true);

    try {
      const result = await deleteMultipleCards({
        role: user?.role!,
        cardIds: ids,
      });

      if (!result.success) return toast.error(result.message);
      toast.success(result.message);
      setRowSelection({});
    } catch (error) {
      console.error("Failed to delete multiple cards", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {Object.values(rowSelection).length > 0 && (
        <div className="pt-2">
          <Button
            onClick={handleBulkDelete}
            variant={"destructive"}
            disabled={isDeleting}
            className="hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <LoaderCircle className="animate-spin size-4 mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <MdDeleteSweep className="size-8 shrink-0" /> Delete{" "}
                {table.getFilteredSelectedRowModel().rows.length}
                {table.getFilteredSelectedRowModel().rows.length > 1
                  ? " Cards"
                  : " Card"}
              </>
            )}
          </Button>
        </div>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead key={index}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell key={index}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-zinc-600"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PrintCardsDataTable;

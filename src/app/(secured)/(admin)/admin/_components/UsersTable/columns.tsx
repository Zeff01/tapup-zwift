"use client";

import { ExtendedUserInterface } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Copy,
  Edit,
  ImageDown,
  UserRoundSearch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Link from "next/link";
import { createUserLink } from "@/lib/utils";

export const columns: ColumnDef<ExtendedUserInterface>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          className="min-w-[5rem] flex cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <Link className="underline" href={`/admin/${row.original.id}`}>
          {row.original.email}
        </Link>
      );
    },
  },

  {
    accessorKey: "Name",
    header: () => <div className="min-w-[10rem]">Name</div>,
    cell: ({ row }) => {
      return (
        <div>
          {(row?.original?.firstName || "N/A") +
            " " +
            (row?.original?.lastName || "")}
        </div>
      );
    },
  },
  {
    accessorKey: "Role",
    header: () => <div className="min-w-[10rem]">Role</div>,
    cell: ({ row }) => {
      return <div>{row.original?.role}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="">Actions</div>,
    cell: ({ row }) => {
      const link = row.original;

      return (
        <div className="flex gap-1 w-fit">
          <Link href={`/user/update/${link.id}`}>
            <Button
              onClick={() => {}}
              className="h-8 w-8 rounded-full"
              variant="ghost"
              size="icon"
            >
              <Edit size={15} />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => {
              navigator.clipboard.writeText(
                createUserLink(link.id as string) as string
              );
              toast.success("Copied to clipboard");
            }}
          >
            <Copy size={15} />
          </Button>
          <Link href={`/site/${link.id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <UserRoundSearch size={15} />
            </Button>
          </Link>
          <Link href={`/card/${link.id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <ImageDown size={15} />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

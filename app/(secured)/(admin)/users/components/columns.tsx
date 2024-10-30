"use client";

import { Users } from "@/src/lib/firebase/store/users.type";
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

export const columns: ColumnDef<Users>[] = [
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
  },
  {
    accessorKey: "company",
    header: () => <div className="min-w-[10rem]">Company</div>,
  },
  {
    accessorKey: "position",
    header: () => <div className="min-w-[10rem]">position</div>,
  },
  {
    accessorKey: "firstName",
    header: () => <div className="min-w-[10rem]">FirstName</div>,
  },
  {
    accessorKey: "lastName",
    header: () => <div className="">LastName</div>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const link = row.original;
      // console.log("link:", link);
      // if (link.userCode === "LanXgtZFYp7je3p9imBE") console.log(link);

      return (
        <div className="flex gap-2 justify-center flex-nowrap ">
          <Link href={`/update/${link.id}`}>
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
              navigator.clipboard.writeText(link.user_link as string);
              toast.success("Copied to clipboard");
            }}
          >
            <Copy size={15} />
          </Button>
          <Link href={`/users/${link.userCode}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <UserRoundSearch size={15} />
            </Button>
          </Link>
          <Link href={`/card/${link.userCode}`}>
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

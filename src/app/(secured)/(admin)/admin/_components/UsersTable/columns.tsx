"use client";

import { ExtendedUserInterface } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<ExtendedUserInterface>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),

    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          className="min-w-[10rem] flex cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={row.original.profilePictureUrl || "/placeholder.svg"}
              alt={`${row.original.email}-image`}
            />
            <AvatarFallback>
              {row.original.email ? row.original.email[0].toUpperCase() : "n/a"}
            </AvatarFallback>
          </Avatar>
          <Link className="underline" href={`/admin/${row.original.id}`}>
            {row.original.email}
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "Name",
    // header: () => <div className="min-w-[10rem]">Name</div>,
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
    // header: () => <div className="min-w-[10rem]">Role</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            "place-self-start px-2 text-white rounded-full capitalize bg-green-700 border-green-500 border",
            {
              "bg-red-700 border-red-500 border":
                row.original?.role === "admin",
            }
          )}
        >
          {row.original?.role}
        </div>
      );
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
          {/* <Button
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
          </Button> */}
          {/* <Link href={`/site/${link.id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <UserRoundSearch size={15} />
            </Button>
          </Link> */}
          {/* <Link href={`/card/${link.id}`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <ImageDown size={15} />
            </Button>
          </Link> */}
        </div>
      );
    },
  },
];

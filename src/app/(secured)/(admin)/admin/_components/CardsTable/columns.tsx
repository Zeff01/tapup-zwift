"use client";

import { Card } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, Edit, ImageDown, UserRoundSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Link from "next/link";
import { createUserLink, formatDate } from "@/lib/utils";
import Image from "next/image";
import { carouselCards } from "@/constants";

export const columns: ColumnDef<Card>[] = [
  {
    accessorKey: "cardType",
    header: () => {
      return <div className="min-w-[5rem] flex cursor-pointer">Card Type</div>;
    },
    cell: ({ row }) => {
      return (
        <div>
          <Image
            src={
              Object.values(carouselCards).filter(
                (c) => c.title === row?.original?.chosenPhysicalCard?.name
              )[0].image
            }
            alt={`${row.original.id}-image`}
            width={100}
            height={65}
          />
        </div>
      );
    },
  },

  {
    accessorKey: "expirationDate",
    header: () => <div className="min-w-[10rem]">Expiration Date</div>,
    cell: ({ row }) => {
      return <div>{formatDate(row.original.expiryDate as number)}</div>;
    },
  },

  // TODO: Add actions column for editing and deleting cards

  // {
  //   id: "actions",
  //   header: () => <div className="">Actions</div>,
  //   cell: ({ row }) => {
  //     const link = row.original;

  //     return (
  //       <div className="flex gap-1 w-fit">
  //         <Link href={`/user/update/${link.id}`}>
  //           <Button
  //             onClick={() => {}}
  //             className="h-8 w-8 rounded-full"
  //             variant="ghost"
  //             size="icon"
  //           >
  //             <Edit size={15} />
  //           </Button>
  //         </Link>
  //         <Button
  //           variant="ghost"
  //           size="icon"
  //           className="h-8 w-8 rounded-full"
  //           onClick={() => {
  //             navigator.clipboard.writeText(
  //               createUserLink(link.id as string) as string
  //             );
  //             toast.success("Copied to clipboard");
  //           }}
  //         >
  //           <Copy size={15} />
  //         </Button>
  //         <Link href={`/site/${link.id}`}>
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             className="h-8 w-8 rounded-full"
  //           >
  //             <UserRoundSearch size={15} />
  //           </Button>
  //         </Link>
  //         <Link href={`/card/${link.id}`}>
  //           <Button
  //             variant="ghost"
  //             size="icon"
  //             className="h-8 w-8 rounded-full"
  //           >
  //             <ImageDown size={15} />
  //           </Button>
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];

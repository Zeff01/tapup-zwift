import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserState } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilLine, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FaRegAddressCard } from "react-icons/fa6";
import DeleteDialog from "./DeleteDialog";
import { PrintCardsInfo } from "./PrintCardsTable";

interface CreateColumnsProps {
  setSelectedCard: (card: PrintCardsInfo | null) => void;
  setCardId: (cardId: string | null) => void;
  setIsViewModalOpen: (isOpen: boolean) => void;
  setIsPrintModalOpen: (isOpen: boolean) => void;
  user: UserState;
}

export const useCreateColumns = ({
  setSelectedCard,
  setCardId,
  setIsViewModalOpen,
  setIsPrintModalOpen,
  user,
}: CreateColumnsProps) => {
  const router = useRouter();

  const columns = useMemo<ColumnDef<PrintCardsInfo>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            className="cursor-default border-neutral-400 dark:border-white/30"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="cursor-default border-neutral-400 dark:border-white/30"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "cardOwner",
        header: () => <div className="whitespace-nowrap">Card Owner</div>,
        cell: ({ row }) => (
          <div className="whitespace-nowrap">{row.original.cardOwner}</div>
        ),
      },
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: ({ row }) => (
          <div>
            {row.original.transactionId ? row.original.transactionId : "N/A"}
          </div>
        ),
      },
      {
        accessorKey: "subscription_id",
        header: "Subscription ID",
        cell: ({ row }) => (
          <div>
            {row.original.subscription_id
              ? row.original.subscription_id
              : "N/A"}
          </div>
        ),
      },
      {
        accessorKey: "subscription_id",
        header: () => <div className="whitespace-nowrap">Transfer Code</div>,
        cell: ({ row }) => (
          <div className="whitespace-nowrap">{row.original.transferCode}</div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: () => <div className="whitespace-nowrap">Date Created</div>,
        cell: ({ row }) => (
          <div>
            {" "}
            {row.original.createdAt &&
            typeof row.original.createdAt.seconds === "number" &&
            typeof row.original.createdAt.nanoseconds === "number"
              ? new Date(
                  row.original.createdAt.seconds * 1000 +
                    row.original.createdAt.nanoseconds / 1000000
                ).toLocaleDateString("en-US")
              : "Invalid Date"}
          </div>
        ),
      },
      {
        accessorKey: "printStatus",
        header: () => <div className="whitespace-nowrap">Status</div>,
        cell: ({ row }) => (
          <Badge
            className={`${row.original.printStatus ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white select-none font-normal whitespace-nowrap`}
          >
            {row.original.printStatus ? "Printed" : "Not Printed"}
          </Badge>
        ),
      },
      {
        id: "actions",
        header: () => <div className="w-[100px] text-center">Actions</div>,
        cell: ({ row }) => {
          const card = row.original;

          return (
            <div className="w-[100px] text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedCard(card);
                      setCardId(card.id!);
                      setIsViewModalOpen(true);
                    }}
                    className="flex items-center gap-2 justify-between focus:bg-gray-200 dark:focus:bg-accent"
                  >
                    <span>View</span>
                    <FaRegAddressCard size={15} />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedCard(card);
                      setCardId(card.id!);
                      setIsPrintModalOpen(true);
                    }}
                    className="flex items-center gap-2 justify-between focus:bg-gray-200 dark:focus:bg-accent"
                  >
                    <span>Print</span>
                    <Printer size={15} />
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => router.push(`/cards/update/${card.id}`)}
                    className="flex items-center gap-2 justify-between focus:bg-gray-200 dark:focus:bg-accent"
                  >
                    <span>Edit</span>
                    <PencilLine size={15} />
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="focus:bg-gray-200 dark:focus:bg-accent"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <DeleteDialog cardId={card.id} user={user} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [setSelectedCard, setCardId, setIsViewModalOpen, setIsPrintModalOpen, user]
  );

  return columns;
};

"use client";

import PrintCardPagination from "./Pagination";
import PreviewDialog from "./PreviewDialog";
import DeleteDialog from "./DeleteDialog";
import GenerateCardsDialog from "./GenerateCardsDialog";
import ViewDialog from "./ViewDialog";
import { useEffect, useState } from "react";
import { useUserContext } from "@/providers/user-provider";
import {
  Search,
  Filter,
  Printer,
  ArrowUpDown,
  MoreHorizontal,
  PencilLine,
  Plus,
} from "lucide-react";
import { Card } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaRegAddressCard } from "react-icons/fa6";

type sortDirectionType = "asc" | "desc" | null;

export type PrintCardsInfo = Card & {
  transactionId: string | null;
  customerName: string | null;
};

const PrintCardsTable = ({ cardsData }: { cardsData: PrintCardsInfo[] }) => {
  const { user } = useUserContext();
  const [filteredCards, setFilteredCards] =
    useState<PrintCardsInfo[]>(cardsData);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [sortDirection, setSortDirection] = useState<sortDirectionType>(null);
  const [selectedCard, setSelectedCard] = useState<PrintCardsInfo | null>(null);
  const [cardId, setCardId] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isGenModalOpen, setIsGenModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerpage = 10;

  const indexOfLastCard = currentPage * cardsPerpage;
  const indefOfFirstCard = indexOfLastCard - cardsPerpage;
  const currentCards = filteredCards.slice(indefOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerpage);

  useEffect(() => {
    let filtered = [...cardsData];

    if (searchFilter) {
      filtered = filtered.filter(
        (card) =>
          card.customerName
            ?.toLowerCase()
            .includes(searchFilter.trim().toLowerCase()) ||
          card.transactionId
            ?.toLowerCase()
            .includes(searchFilter.trim().toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((card) => {
        if (statusFilter === "printed") return card.printStatus === true;
        if (statusFilter === "notPrinted") return card.printStatus === false;
      });
    }

    filtered.sort((a, b) => {
      if (sortDirection === null) return 0;

      const dateA = a.createdAt.seconds * 1e3 + a.createdAt.nanoseconds / 1e6;
      const dateB = b.createdAt.seconds * 1e3 + b.createdAt.nanoseconds / 1e6;

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredCards(filtered);
  }, [cardsData, statusFilter, searchFilter, sortDirection]);

  const toggleSortDirection = () => {
    if (sortDirection === null) setSortDirection("asc");
    else if (sortDirection === "asc") setSortDirection("desc");
    else setSortDirection(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Manage Print Cards</h1>
        <Button
          onClick={() => setIsGenModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 font-semibold text-white"
        >
          <Plus size={16} className="mr-2" />
          Generate Cards
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search by customer name or transaction ID"
            className="pl-10"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="printed">Printed</SelectItem>
              <SelectItem value="notPrinted">Not Printed</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={toggleSortDirection}
            variant={"outline"}
            className="px-3"
          >
            <ArrowUpDown
              size={18}
              className="text-neutral-900 dark:text-white"
            />
          </Button>
        </div>
      </div>

      {sortDirection && (
        <div className="ml-4 flex items-center">
          <span className="text-sm text-slate-500 dark:text-gray-400">
            Sorted by date:
          </span>
          <Badge variant={"outline"} className="ml-2">
            {sortDirection === "asc" ? "Oldest first" : "Newest first"}
          </Badge>
        </div>
      )}

      {currentCards.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Subscription ID</TableHead>
              <TableHead>Transfer Code</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentCards.map((card, index) => (
              <TableRow key={index}>
                <TableCell>{card.customerName}</TableCell>
                <TableCell>{card.transactionId}</TableCell>
                <TableCell>{card.subscription_id}</TableCell>
                <TableCell>{card.transferCode}</TableCell>
                <TableCell>
                  {card.createdAt &&
                  typeof card.createdAt.seconds === "number" &&
                  typeof card.createdAt.nanoseconds === "number"
                    ? new Date(
                        card.createdAt.seconds * 1000 +
                          card.createdAt.nanoseconds / 1000000
                      ).toLocaleDateString("en-US")
                    : "Invalid Date"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${card.printStatus ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"} text-white select-none font-normal`}
                  >
                    {card.printStatus ? "Printed" : "Not Printed"}
                  </Badge>
                </TableCell>
                <TableCell className="w-[100px] text-center">
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
                      <DropdownMenuItem className="flex items-center gap-2 justify-between focus:bg-gray-200 dark:focus:bg-accent">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No transactions found matching your filters.
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              setStatusFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {filteredCards.length > cardsPerpage && (
        <PrintCardPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}

      <ViewDialog
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        card={selectedCard}
        cardId={cardId}
      />

      <PreviewDialog
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        card={selectedCard}
        cardId={cardId}
        user={user}
      />

      <GenerateCardsDialog
        isOpen={isGenModalOpen}
        onClose={() => setIsGenModalOpen(false)}
      />
    </div>
  );
};

export default PrintCardsTable;

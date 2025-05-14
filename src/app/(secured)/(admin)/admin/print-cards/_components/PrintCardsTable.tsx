"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Printer } from "lucide-react";
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

type PrintCardsInfo = Card & {
  transactionId: string | null;
  customerName: string | null;
};

const PrintCardsTable = ({ cardsData }: { cardsData: PrintCardsInfo[] }) => {
  const [filteredCards, setFilteredCards] =
    useState<PrintCardsInfo[]>(cardsData);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    let filtered = [...cardsData];

    // if (searchFilter) {

    // }

    if (statusFilter !== "all") {
      filtered = filtered.filter((card) => {
        if (statusFilter === "printed") return card.printStatus === true;
        if (statusFilter === "notPrinted") return card.printStatus === false;
      });
    }

    setFilteredCards(filtered);
  }, [cardsData, statusFilter]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">List of Print Cards</h1>
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
        </div>
      </div>

      {filteredCards.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCards.map((card) => (
              <TableRow key={card.id}>
                <TableCell>{card.customerName}</TableCell>
                <TableCell>{card.transactionId}</TableCell>
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
                  <Button variant="outline" size="sm" className="mt-2">
                    Print
                    <Printer size={15} />
                  </Button>
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
    </div>
  );
};

export default PrintCardsTable;

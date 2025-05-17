"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Search, Filter, Printer } from "lucide-react";
import { Card } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { carouselCards } from "@/constants";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PrintCardsInfo = Card & {
  transactionId: string | null;
  customerName: string | null;
};

const PrintCardsTable = ({ cardsData }: { cardsData: PrintCardsInfo[] }) => {
  const [filteredCards, setFilteredCards] =
    useState<PrintCardsInfo[]>(cardsData);

  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [searchFilter, setSearchFilter] = useState("");

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const [cardId, setCardId] = useState<string | null>(null);

  const card = Object.values(carouselCards).find(
    (card) => card.title === selectedCard
  );

  useEffect(() => {
    let filtered = [...cardsData];

    if (searchFilter) {
      filtered = filtered.filter(
        (card) =>
          card.customerName
            ?.toLowerCase()
            .includes(searchFilter.toLowerCase()) ||
          card.transactionId?.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((card) => {
        if (statusFilter === "printed") return card.printStatus === true;
        if (statusFilter === "notPrinted") return card.printStatus === false;
      });
    }

    setFilteredCards(filtered);
  }, [cardsData, statusFilter, searchFilter]);

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
            {filteredCards.map((card, index) => (
              <TableRow key={index}>
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
                  <Button
                    onClick={() => {
                      setSelectedCard(card.chosenPhysicalCard?.name!);
                      setCardId(card.id!);
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
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

      {/* card preview dialog */}
      {selectedCard && (
        <Dialog
          open={!!selectedCard}
          onOpenChange={(open) => !open && setSelectedCard(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{card?.title}</DialogTitle>
              <DialogDescription>Card ID: {cardId}</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center py-4">
              {/* Main Image Preview */}
              <div className="relative w-full h-80 mb-4">
                <Image
                  src={
                    card?.image ||
                    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                  }
                  alt={card?.title || "Card image"}
                  fill
                  className="object-contain rounded-md"
                />
              </div>

              {/* Thumbnail Carousel (optional) */}
              <div className="flex gap-2 overflow-x-auto w-full py-2">
                <button className="relative w-16 h-24 rounded-md overflow-hidden border-2 border-primary">
                  <Image
                    src={
                      card?.image ||
                      "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                    }
                    alt={card?.title || "Card image"}
                    fill
                    className="object-cover"
                  />
                </button>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{card?.title}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span>{card?.price ? `₱${card?.price}` : "N/A"}</span>
              </div>

              <Separator />

              <div className="flex justify-between ">
                <Button className="bg-buttonColor mt-3 text-white w-full">
                  Print Card
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PrintCardsTable;

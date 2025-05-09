"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Filter, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getAllTransactions } from "@/lib/firebase/actions/user.action";
import { TransactionType } from "@/types/types";
// Define TypeScript interfaces
interface CardItem {
  id: string;
  name: string;
  quantity: number;
  imageUrl?: string; // For demo purposes
}

interface Receiver {
  customerAddress: string;
  customerEmail: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
}

interface Transaction {
  id: string;
  amount: number;
  cards: CardItem[];
  createdAt: string;
  receiver: Receiver;
  status: "pending" | "completed" | "cancelled" | "processing";
}

// Dummy data based on the image
const dummyTransactions: Transaction[] = [
  {
    id: "tr-001",
    amount: 600,
    cards: [
      {
        id: "a6Wis9VKX1v2qBP2jHpD",
        name: "Midnight Flow",
        quantity: 1,
        imageUrl:
          "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
      },
      {
        id: "b7Xjt0WLY2w3rCS3kIqE",
        name: "Sunset Glow",
        quantity: 2,
        imageUrl:
          "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
      },
    ],
    createdAt: "April 23, 2025 at 2:40:40 PM UTC+8",
    receiver: {
      customerAddress:
        "Purok Riverside, Paglaum Village II, Binalbagan, Province of Negros Occidental, 6107, Philippines",
      customerEmail: "david.estrelloso.tribugenial@gmail.com",
      customerId: "cust-94d34a64-1a41-49f7-9ce2-be9b2d86dfe6",
      customerName: "David Techno",
      customerPhone: "+639398351262",
    },
    status: "pending",
  },
  {
    id: "tr-002",
    amount: 1200,
    cards: [
      {
        id: "c8Yku1XMZ3x4sD4lJrF",
        name: "Ocean Breeze",
        quantity: 3,
        imageUrl: "/placeholder.svg?height=200&width=150",
      },
    ],
    createdAt: "April 24, 2025 at 10:15:22 AM UTC+8",
    receiver: {
      customerAddress: "123 Main Street, Anytown, Anystate, 12345, USA",
      customerEmail: "john.smith@example.com",
      customerId: "cust-5678efgh-9012-ijkl-3456-mnopqrstuvwx",
      customerName: "John Smith",
      customerPhone: "+12025550179",
    },
    status: "completed",
  },
  {
    id: "tr-003",
    amount: 850,
    cards: [
      {
        id: "d9Zlv2YNA4y5tE5mKsG",
        name: "Forest Whisper",
        quantity: 1,
        imageUrl:
          "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
      },
      {
        id: "e0Amw3ZOB5z6uF6nLtH",
        name: "Mountain Echo",
        quantity: 1,
        imageUrl:
          "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg",
      },
    ],
    createdAt: "April 25, 2025 at 3:30:45 PM UTC+8",
    receiver: {
      customerAddress: "456 Park Avenue, Metropolis, State, 67890, Canada",
      customerEmail: "jane.doe@example.com",
      customerId: "cust-abcd1234-5678-efgh-9012-ijklmnopqrst",
      customerName: "Jane Doe",
      customerPhone: "+14165550123",
    },
    status: "processing",
  },
];

export default function TransactionDashboard() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(dummyTransactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(dummyTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Filter transactions based on search term and status
  useEffect(() => {
    let filtered = [...transactions];

    if (searchTerm) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.receiver.customerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.cards.some((card) =>
            card.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.status === statusFilter
      );
    }

    setFilteredTransactions(filtered);
  }, [searchTerm, statusFilter, transactions]);

  // Update transaction status
  const updateTransactionStatus = (
    id: string,
    newStatus: "pending" | "completed" | "cancelled" | "processing"
  ) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, status: newStatus }
        : transaction
    );
    setTransactions(updatedTransactions);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "completed":
        return "bg-green-500 hover:bg-green-600";
      case "cancelled":
        return "bg-red-500 hover:bg-red-600";
      case "processing":
        return "bg-blue-500 hover:bg-blue-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Transaction Dashboard</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search by customer name, transaction ID, or card name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
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
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="grid gap-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      Transaction {transaction.id}
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{transaction.createdAt}</CardDescription>
                  </div>
                  <div className="text-2xl font-bold">
                    ₱{transaction.amount}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="cards">
                      Cards ({transaction.cards.length})
                    </TabsTrigger>
                    <TabsTrigger value="receiver">Receiver</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Transaction ID
                        </h3>
                        <p>{transaction.id}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Amount
                        </h3>
                        <p>₱{transaction.amount}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Date
                        </h3>
                        <p>{transaction.createdAt}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Status
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Edit2 size={14} className="mr-1" /> Update
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  Update Transaction Status
                                </DialogTitle>
                                <DialogDescription>
                                  Change the status for transaction{" "}
                                  {transaction.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="status">Status</Label>
                                  <Select
                                    defaultValue={transaction.status}
                                    onValueChange={(value) =>
                                      updateTransactionStatus(
                                        transaction.id,
                                        value as
                                          | "pending"
                                          | "completed"
                                          | "cancelled"
                                          | "processing"
                                      )
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pending">
                                        Pending
                                      </SelectItem>
                                      <SelectItem value="processing">
                                        Processing
                                      </SelectItem>
                                      <SelectItem value="completed">
                                        Completed
                                      </SelectItem>
                                      <SelectItem value="cancelled">
                                        Cancelled
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Save changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cards">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {transaction.cards.map((card, index) => (
                        <div
                          key={card.id}
                          className="border rounded-lg p-4 flex gap-4"
                        >
                          <div className="w-20 h-28 relative flex-shrink-0">
                            <Image
                              src={
                                card.imageUrl ||
                                "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                              }
                              alt={card.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{card.name}</h3>
                            <p className="text-sm text-gray-500">
                              ID: {card.id}
                            </p>
                            <p className="text-sm">Quantity: {card.quantity}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setSelectedCardIndex(index);
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="receiver" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Customer Name
                        </h3>
                        <p>{transaction.receiver.customerName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Customer ID
                        </h3>
                        <p className="truncate">
                          {transaction.receiver.customerId}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Email
                        </h3>
                        <p className="truncate">
                          {transaction.receiver.customerEmail}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Phone
                        </h3>
                        <p>{transaction.receiver.customerPhone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="text-sm font-medium text-gray-500">
                          Address
                        </h3>
                        <p>{transaction.receiver.customerAddress}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No transactions found matching your filters.
            </p>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Card Image Viewer Dialog */}
      {selectedTransaction && (
        <Dialog
          open={!!selectedTransaction}
          onOpenChange={(open) => !open && setSelectedTransaction(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedTransaction.cards[selectedCardIndex].name}
              </DialogTitle>
              <DialogDescription>
                Card ID: {selectedTransaction.cards[selectedCardIndex].id}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center py-4">
              <div className="relative w-full h-80 mb-4">
                <Image
                  src={
                    selectedTransaction.cards[selectedCardIndex].imageUrl ||
                    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                  }
                  alt={selectedTransaction.cards[selectedCardIndex].name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto w-full py-2">
                {selectedTransaction.cards.map((card, index) => (
                  <button
                    key={card.id}
                    className={`relative w-16 h-24 rounded-md overflow-hidden border-2 ${
                      index === selectedCardIndex
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedCardIndex(index)}
                  >
                    <Image
                      src={
                        card.imageUrl ||
                        "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                      }
                      alt={card.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{selectedTransaction.cards[selectedCardIndex].name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Quantity:</span>
                <span>
                  {selectedTransaction.cards[selectedCardIndex].quantity}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">Transaction:</span>
                <span>{selectedTransaction.id}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

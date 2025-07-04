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
  DialogClose,
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
import { TransactionBoard } from "@/types/types";
import { carouselCards } from "@/constants";
import { useUserContext } from "@/providers/user-provider";
import { updateTransactionPerId } from "@/lib/firebase/actions/user.action";
import { toast } from "react-toastify";

export default function TransactionDashboard({
  transactionsData,
}: {
  transactionsData: TransactionBoard[];
}) {
  const { user } = useUserContext();
  const [transactions, setTransactions] =
    useState<TransactionBoard[]>(transactionsData);
  const [filteredTransactions, setFilteredTransactions] =
    useState<TransactionBoard[]>(transactionsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionBoard | null>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleSaveChanges = async (
    transactionID: string,
    newStatus: string
  ) => {
    try {
      const result = await updateTransactionPerId({
        role: user?.role!,
        transaction_id: transactionID,
        data: newStatus,
      });

      if (!result.success) return toast.error(result.message);
      toast.success(result.message);
    } catch (error) {
      console.log("Error updating transaction", error);
    }
  };

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
      <h1 className="text-xl font-bold mb-6">Transaction Dashboard</h1>
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
        <div className="relative flex items-center gap-2 justify-end">
          <Filter
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 md:relative md:left-0 md:top-0 md:translate-y-0"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="pl-10 w-full md:pl-3 md:w-[180px]">
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
        {filteredTransactions?.length > 0 ? (
          filteredTransactions?.map((transaction, i) => (
            <Card key={transaction.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {`Transaction-${i + 1}`}
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {transaction.createdAt &&
                      typeof transaction.createdAt.seconds === "number" &&
                      typeof transaction.createdAt.nanoseconds === "number"
                        ? new Date(
                            transaction.createdAt.seconds * 1000 +
                              transaction.createdAt.nanoseconds / 1000000
                          ).toLocaleString()
                        : "Invalid Date"}
                    </CardDescription>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <p>
                          {transaction.createdAt &&
                          typeof transaction.createdAt.seconds === "number" &&
                          typeof transaction.createdAt.nanoseconds === "number"
                            ? new Date(
                                transaction.createdAt.seconds * 1000 +
                                  transaction.createdAt.nanoseconds / 1000000
                              ).toLocaleString() // Changed to toLocaleString()
                            : "Invalid Date"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Status
                        </h3>
                        <div className="grid grid-cols-3 sm:flex items-center gap-4 sm:gap-2">
                          <Badge
                            className={`${getStatusColor(transaction.status)} text-center flex justify-center items-center sm:inline`}
                          >
                            {transaction.status.charAt(0).toUpperCase() +
                              transaction.status.slice(1)}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="col-span-2"
                              >
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
                                <DialogClose asChild>
                                  <Button
                                    onClick={() =>
                                      handleSaveChanges(
                                        transaction.id,
                                        transaction.status
                                      )
                                    }
                                    className="bg-greenColor text-white hover:bg-greenTitle mt-4"
                                  >
                                    Save changes
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cards">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {transaction.cards.map((card, index) => {
                        // console.log("card here", card);
                        const cardImage = Object.values(carouselCards).filter(
                          (item) => item.title === card.name
                        )[0].image;
                        return (
                          <div
                            key={card.id}
                            className="border rounded-lg p-4 flex gap-4"
                          >
                            <div className="w-20 h-28 relative flex-shrink-0">
                              <Image
                                src={
                                  cardImage ||
                                  "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                                }
                                alt={card.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-grow-0 sm:flex-1 min-w-0 w-full">
                              <h3 className="font-medium truncate">
                                {card.name}
                              </h3>
                              <p className="text-sm text-gray-500 truncate">
                                ID: {card.id}
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-8 w-full sm:w-auto"
                                onClick={() => {
                                  setSelectedTransaction(transaction);
                                  setSelectedCardIndex(index);
                                }}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        );
                      })}
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
                        <p className="text-balance">
                          {transaction.receiver.customerId}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">
                          Email
                        </h3>
                        <p className="text-balance">
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
            <div className="flex flex-col items-center sm:py-4">
              <div className="relative w-full h-80 sm:mb-4">
                <Image
                  src={
                    Object.values(carouselCards).filter(
                      (c) =>
                        c.title ===
                        selectedTransaction.cards[selectedCardIndex].name
                    )[0].image ||
                    "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                  }
                  alt={selectedTransaction.cards[selectedCardIndex].name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <div className="flex sm:gap-2 overflow-x-auto w-full pb-4 sm:py-2">
                {selectedTransaction.cards.map((card, index) => {
                  const cardImage = Object.values(carouselCards).filter(
                    (item) => item.title === card.name
                  )[0].image;

                  return (
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
                          cardImage ||
                          "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                        }
                        alt={card.name}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{selectedTransaction.cards[selectedCardIndex].name}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-medium">Transaction ID:</span>
                <span>{selectedTransaction.id}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

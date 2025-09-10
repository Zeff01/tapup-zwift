"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  User,
  Hash,
  MoreVertical,
  Eye,
  Download,
  Copy
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TransactionBoard } from "@/types/types";
import { carouselCards } from "@/constants";
import { useUserContext } from "@/providers/user-provider";
import { updateTransactionPerId } from "@/lib/firebase/actions/user.action";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-lg sm:text-2xl font-bold">{value}</p>
            {trend && (
              <p className="text-xs text-muted-foreground mt-1">{trend}</p>
            )}
          </div>
          <div className={cn("p-2 sm:p-3 rounded-full", color)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TransactionDashboard({
  transactionsData,
}: {
  transactionsData: TransactionBoard[];
}) {
  const { user } = useUserContext();
  const [transactions, setTransactions] = useState<TransactionBoard[]>(transactionsData);
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionBoard[]>(transactionsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedTransactions, setExpandedTransactions] = useState<Set<string>>(new Set());
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionBoard | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = transactions.length;
    const pending = transactions.filter(t => t.status === "pending").length;
    const completed = transactions.filter(t => t.status === "completed").length;
    const processing = transactions.filter(t => t.status === "processing").length;
    const cancelled = transactions.filter(t => t.status === "cancelled").length;
    const totalRevenue = transactions
      .filter(t => t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    return { total, pending, completed, processing, cancelled, totalRevenue };
  }, [transactions]);

  useEffect(() => {
    let filtered = [...transactions];

    if (searchTerm) {
      filtered = filtered.filter(
        (transaction) => {
          const cards = transaction.cards || transaction.items || [];
          return (
            transaction.receiver.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.receiver.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cards.some((card) =>
              card.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.status === statusFilter
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    setFilteredTransactions(filtered);
  }, [searchTerm, statusFilter, transactions]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedTransactions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedTransactions(newExpanded);
  };

  const handleStatusUpdate = async (
    transactionId: string,
    newStatus: "pending" | "completed" | "cancelled" | "processing"
  ) => {
    setIsUpdating(transactionId);
    try {
      const result = await updateTransactionPerId({
        role: user?.role!,
        transaction_id: transactionId,
        data: newStatus,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      // Update local state
      setTransactions(prev => 
        prev.map(t => t.id === transactionId ? { ...t, status: newStatus } : t)
      );
      
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "processing":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto py-4 px-4 max-w-7xl">
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">Orders Management</h1>
            <p className="text-muted-foreground">Manage and track all customer orders</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              title="Total Orders"
              value={statistics.total}
              icon={<Package className="w-4 h-4 text-white" />}
              color="bg-primary"
            />
            <StatCard
              title="Pending"
              value={statistics.pending}
              icon={<Clock className="w-4 h-4 text-white" />}
              color="bg-yellow-500"
            />
            <StatCard
              title="Completed"
              value={statistics.completed}
              icon={<CheckCircle2 className="w-4 h-4 text-white" />}
              color="bg-green-500"
            />
            <StatCard
              title="Revenue"
              value={`₱${statistics.totalRevenue.toLocaleString()}`}
              icon={<DollarSign className="w-4 h-4 text-white" />}
              color="bg-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search orders, customers, or cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          <div className="space-y-3">
            {filteredTransactions.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="space-y-3">
                  <Package className="w-12 h-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No orders found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || statusFilter !== "all" 
                      ? "Try adjusting your filters"
                      : "Orders will appear here once customers make purchases"}
                  </p>
                  {(searchTerm || statusFilter !== "all") && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              filteredTransactions.map((transaction) => {
                const isExpanded = expandedTransactions.has(transaction.id);
                const firstItemName = transaction.items?.[0]?.name || transaction.cards?.[0]?.name || '';
                const matchingCard = Object.values(carouselCards).find(
                  (item) => item.title === firstItemName
                );
                const cardImage = matchingCard?.image || carouselCards.eclipse.image;

                return (
                  <Card 
                    key={transaction.id} 
                    className={cn(
                      "transition-all duration-200",
                      isExpanded && "ring-2 ring-primary/20"
                    )}
                  >
                    {/* Order Summary - Always Visible */}
                    <CardContent className="p-3 sm:p-4">
                      <div className="flex items-start justify-between gap-3">
                        {/* Left Section - Order Info */}
                        <div className="flex gap-3 flex-1 min-w-0">
                          {/* Card Image Preview - Credit card ratio 1.586:1 */}
                          <div className="relative w-20 h-[50px] sm:w-24 sm:h-[60px] flex-shrink-0 overflow-hidden rounded-md border shadow-sm">
                            <Image
                              src={cardImage}
                              alt={transaction.cards[0]?.name || "Card"}
                              fill
                              className="object-cover"
                            />
                            {transaction.cards.length > 1 && (
                              <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium shadow-sm">
                                +{transaction.cards.length - 1}
                              </div>
                            )}
                          </div>

                          {/* Order Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <h3 className="font-semibold truncate text-sm sm:text-base">
                                  {transaction.receiver.customerName}
                                </h3>
                                <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Hash className="w-3 h-3" />
                                    {transaction.id.slice(0, 6)}...
                                  </span>
                                  <span className="hidden sm:flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(transaction.createdAt)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Quick Info */}
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={cn("gap-1 text-xs", getStatusColor(transaction.status))}>
                                {getStatusIcon(transaction.status)}
                                {transaction.status}
                              </Badge>
                              <span className="font-semibold text-sm sm:text-base">
                                ₱{transaction.amount.toLocaleString()}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {transaction.cards.length} {transaction.cards.length === 1 ? 'card' : 'cards'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Actions */}
                        <div className="flex items-center gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-8 w-8 p-0"
                                disabled={isUpdating === transaction.id}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                onClick={() => setSelectedTransaction(transaction)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => copyToClipboard(transaction.id)}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Order ID
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <Label className="px-2 py-1.5 text-xs font-normal text-muted-foreground">
                                Update Status
                              </Label>
                              {["pending", "processing", "completed", "cancelled"].map((status) => (
                                <DropdownMenuItem
                                  key={status}
                                  onClick={() => handleStatusUpdate(
                                    transaction.id,
                                    status as any
                                  )}
                                  disabled={transaction.status === status}
                                >
                                  <Badge 
                                    variant="outline" 
                                    className={cn(
                                      "w-full justify-start gap-1",
                                      getStatusColor(status)
                                    )}
                                  >
                                    {getStatusIcon(status)}
                                    {status}
                                  </Badge>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleExpanded(transaction.id)}
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <>
                          <Separator className="my-3" />
                          
                          {/* Customer Information */}
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Customer Information</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-2 text-sm">
                                  <User className="w-4 h-4 text-muted-foreground" />
                                  <span>{transaction.receiver.customerName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="w-4 h-4 text-muted-foreground" />
                                  <span className="truncate">{transaction.receiver.customerEmail}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <span>{transaction.receiver.customerPhone || "Not provided"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                  <span className="truncate">
                                    {transaction.receiver.customerAddress || "Not provided"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Ordered Cards */}
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Ordered Cards</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {transaction.cards.map((card) => {
                                  const cardData = Object.values(carouselCards).find(
                                    (item) => item.title === card.name
                                  );
                                  const image = cardData?.image || carouselCards.eclipse.image;
                                  
                                  return (
                                    <div 
                                      key={card.id} 
                                      className="flex items-center gap-2 p-2 rounded-md border bg-muted/30"
                                    >
                                      <div className="relative w-12 h-8 flex-shrink-0 overflow-hidden rounded">
                                        <Image
                                          src={image}
                                          alt={card.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium text-xs">{card.name}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                          ID: {card.id.slice(0, 8)}...
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedTransaction && (
          <Dialog
            open={!!selectedTransaction}
            onOpenChange={(open) => !open && setSelectedTransaction(null)}
          >
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                  Order #{selectedTransaction.id}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Order Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <Badge className={cn("mt-1", getStatusColor(selectedTransaction.status))}>
                      {getStatusIcon(selectedTransaction.status)}
                      {selectedTransaction.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Amount</Label>
                    <p className="text-xl font-semibold">
                      ₱{selectedTransaction.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Order Date</Label>
                    <p>{formatDate(selectedTransaction.createdAt)}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Cards Ordered</Label>
                    <p>{selectedTransaction.cards.length} cards</p>
                  </div>
                </div>

                <Separator />

                {/* Customer Details */}
                <div>
                  <h3 className="font-semibold mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span>{selectedTransaction.receiver.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>{selectedTransaction.receiver.customerEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span>{selectedTransaction.receiver.customerPhone || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Address</span>
                      <span className="text-right ml-4">
                        {selectedTransaction.receiver.customerAddress || "Not provided"}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cards */}
                <div>
                  <h3 className="font-semibold mb-3">Ordered Cards</h3>
                  <div className="space-y-3">
                    {selectedTransaction.cards.map((card, index) => {
                      const cardData = Object.values(carouselCards).find(
                        (item) => item.title === card.name
                      );
                      const image = cardData?.image || carouselCards.eclipse.image;
                      
                      return (
                        <div key={card.id} className="flex gap-4 p-3 rounded-lg border">
                          <div className="relative w-20 h-28 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={image}
                              alt={card.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{card.name}</h4>
                            <p className="text-sm text-muted-foreground">ID: {card.id}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Card {index + 1} of {selectedTransaction.cards.length}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedTransaction(null)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </TooltipProvider>
  );
}
"use client";

import { useState, useMemo, useEffect } from "react";
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
  Calendar as CalendarIcon2,
  DollarSign,
  User,
  Hash,
  MoreVertical,
  Eye,
  Download,
  Copy,
  CreditCard,
  Truck,
  FileText,
  TrendingUp,
  TrendingDown,
  SlidersHorizontal,
  RefreshCw,
  Building,
  Receipt,
  Wallet,
  CalendarRange,
  ArrowUpDown,
  FileDown,
  ShoppingCart
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
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionBoard, ExtendedUserInterface } from "@/types/types";
import { carouselCards } from "@/constants";
import { updateTransactionPerId } from "@/lib/firebase/actions/user.action";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TransactionManagementDashboardProps {
  transactions: TransactionBoard[];
  users: ExtendedUserInterface[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  color: string;
}

interface FilterState {
  searchTerm: string;
  status: string;
  dateRange: DateRange | undefined;
  minAmount: string;
  maxAmount: string;
  customer: string;
  sortBy: "date" | "amount" | "customer";
  sortOrder: "asc" | "desc";
}

function StatCard({ title, value, icon, trend, description, color }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 text-xs">
                {trend.isPositive ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
                  {trend.value}%
                </span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-full", color)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TransactionManagementDashboard({ 
  transactions, 
  users 
}: TransactionManagementDashboardProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    status: "all",
    dateRange: undefined,
    minAmount: "",
    maxAmount: "",
    customer: "all",
    sortBy: "date",
    sortOrder: "desc"
  });
  
  const [selectedTab, setSelectedTab] = useState<"all" | "pending" | "completed" | "failed">("all");
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionBoard | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());

  // Create user map for quick lookup
  const userMap = useMemo(() => {
    const map = new Map<string, ExtendedUserInterface>();
    users.forEach(user => {
      if (user.id) map.set(user.id, user);
    });
    return map;
  }, [users]);

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
    
    const avgOrderValue = completed > 0 ? totalRevenue / completed : 0;
    
    // Calculate trends (mock data - replace with actual historical data)
    const revenueTrend = 15.3; // percentage
    const orderTrend = 8.7;
    
    // Top customers
    const customerStats = new Map<string, { count: number; total: number }>();
    transactions.forEach(t => {
      const customerId = t.receiver.customerId;
      const current = customerStats.get(customerId) || { count: 0, total: 0 };
      customerStats.set(customerId, {
        count: current.count + 1,
        total: current.total + t.amount
      });
    });
    
    const topCustomers = Array.from(customerStats.entries())
      .map(([id, stats]) => ({
        id,
        user: userMap.get(id),
        ...stats
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
    
    return { 
      total, 
      pending, 
      completed, 
      processing, 
      cancelled, 
      totalRevenue, 
      avgOrderValue,
      revenueTrend,
      orderTrend,
      topCustomers
    };
  }, [transactions, userMap]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Tab filter
    if (selectedTab !== "all") {
      filtered = filtered.filter(t => t.status === selectedTab);
    }

    // Search filter
    if (filters.searchTerm) {
      const search = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(t => {
        const cards = t.cards || [];
        return (
          t.receiver.customerName.toLowerCase().includes(search) ||
          t.id.toLowerCase().includes(search) ||
          t.receiver.customerEmail.toLowerCase().includes(search) ||
          t.receiver.customerPhone?.toLowerCase().includes(search) ||
          cards.some(card => card.name.toLowerCase().includes(search))
        );
      });
    }

    // Status filter
    if (filters.status !== "all") {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    // Date range filter
    if (filters.dateRange?.from || filters.dateRange?.to) {
      filtered = filtered.filter(t => {
        const date = new Date(t.createdAt);
        if (filters.dateRange?.from && date < filters.dateRange.from) return false;
        if (filters.dateRange?.to && date > filters.dateRange.to) return false;
        return true;
      });
    }

    // Amount filter
    if (filters.minAmount || filters.maxAmount) {
      const min = parseFloat(filters.minAmount) || 0;
      const max = parseFloat(filters.maxAmount) || Infinity;
      filtered = filtered.filter(t => t.amount >= min && t.amount <= max);
    }

    // Customer filter
    if (filters.customer !== "all") {
      filtered = filtered.filter(t => t.receiver.customerId === filters.customer);
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case "date":
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
        case "amount":
          comparison = b.amount - a.amount;
          break;
        case "customer":
          comparison = a.receiver.customerName.localeCompare(b.receiver.customerName);
          break;
      }
      
      return filters.sortOrder === "asc" ? -comparison : comparison;
    });

    return filtered;
  }, [transactions, selectedTab, filters]);

  const handleStatusUpdate = async (
    transactionId: string,
    newStatus: "pending" | "completed" | "cancelled" | "processing"
  ) => {
    setIsUpdating(transactionId);
    try {
      const result = await updateTransactionPerId({
        role: "admin",
        transaction_id: transactionId,
        data: newStatus,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      // Update local state
      transactions.forEach(t => {
        if (t.id === transactionId) {
          t.status = newStatus;
        }
      });
      
      toast.success("Transaction status updated successfully");
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error("Failed to update transaction status");
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
    return format(date, "MMM dd, yyyy HH:mm");
  };

  const exportTransactions = () => {
    const data = filteredTransactions.map(t => ({
      "Transaction ID": t.id,
      "Date": formatDate(t.createdAt),
      "Customer Name": t.receiver.customerName,
      "Customer Email": t.receiver.customerEmail,
      "Customer Phone": t.receiver.customerPhone || "N/A",
      "Amount": t.amount,
      "Status": t.status,
      "Cards": t.cards.map(c => c.name).join(", "),
      "Delivery Address": t.receiver.customerAddress || "N/A"
    }));

    const csv = [
      Object.keys(data[0]).join(","),
      ...data.map(row => Object.values(row).map(v => `"${v}"`).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Transactions exported successfully");
  };

  const handleBulkAction = (action: string) => {
    if (selectedTransactions.size === 0) {
      toast.error("No transactions selected");
      return;
    }

    switch (action) {
      case "export":
        // Export selected transactions
        toast.info(`Exporting ${selectedTransactions.size} transactions...`);
        break;
      case "update-status":
        // Bulk status update
        toast.info(`Update status for ${selectedTransactions.size} transactions`);
        break;
    }
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Receipt className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Transaction Management</h1>
                <p className="text-muted-foreground">
                  Monitor and manage all customer transactions
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={exportTransactions}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Transactions"
            value={statistics.total}
            icon={<ShoppingCart className="w-4 h-4 text-white" />}
            color="bg-primary"
            trend={{ value: statistics.orderTrend, isPositive: true }}
          />
          <StatCard
            title="Total Revenue"
            value={`₱${statistics.totalRevenue.toLocaleString()}`}
            icon={<DollarSign className="w-4 h-4 text-white" />}
            color="bg-green-500"
            trend={{ value: statistics.revenueTrend, isPositive: true }}
          />
          <StatCard
            title="Average Order"
            value={`₱${Math.round(statistics.avgOrderValue).toLocaleString()}`}
            icon={<Wallet className="w-4 h-4 text-white" />}
            color="bg-blue-500"
            description="Per transaction"
          />
          <StatCard
            title="Success Rate"
            value={`${Math.round((statistics.completed / statistics.total) * 100)}%`}
            icon={<CheckCircle2 className="w-4 h-4 text-white" />}
            color="bg-purple-500"
            description={`${statistics.completed} completed`}
          />
        </div>

        {/* Tabs and Filters */}
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="all" className="gap-2">
                All ({statistics.total})
              </TabsTrigger>
              <TabsTrigger value="pending" className="gap-2">
                <Clock className="w-4 h-4" />
                Pending ({statistics.pending})
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Completed ({statistics.completed})
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="gap-2">
                <XCircle className="w-4 h-4" />
                Cancelled ({statistics.cancelled})
              </TabsTrigger>
            </TabsList>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                  className="pl-10 w-full sm:w-[300px]"
                />
              </div>
              
              <Popover open={showFilters} onOpenChange={setShowFilters}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {Object.values(filters).some(f => f && f !== "all" && f !== "date" && f !== "desc") && (
                      <Badge variant="secondary" className="ml-1 px-1">Active</Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96" align="end">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-3">Advanced Filters</h4>
                      <Separator />
                    </div>
                    
                    {/* Date Range */}
                    <div className="space-y-2">
                      <Label className="text-xs">Date Range</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !filters.dateRange && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {filters.dateRange?.from ? (
                              filters.dateRange.to ? (
                                <>
                                  {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                                  {format(filters.dateRange.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(filters.dateRange.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={filters.dateRange?.from}
                            selected={filters.dateRange}
                            onSelect={(range) => setFilters({ ...filters, dateRange: range })}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Amount Range */}
                    <div className="space-y-2">
                      <Label className="text-xs">Amount Range</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={filters.minAmount}
                          onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                          className="h-8"
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={filters.maxAmount}
                          onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                          className="h-8"
                        />
                      </div>
                    </div>

                    {/* Customer Filter */}
                    <div className="space-y-2">
                      <Label className="text-xs">Customer</Label>
                      <Select value={filters.customer} onValueChange={(v) => setFilters({ ...filters, customer: v })}>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="All customers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Customers</SelectItem>
                          {statistics.topCustomers.map(customer => (
                            <SelectItem key={customer.id} value={customer.id}>
                              {customer.user?.firstName} {customer.user?.lastName} ({customer.count} orders)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Sort Options */}
                    <div className="space-y-2">
                      <Label className="text-xs">Sort By</Label>
                      <div className="flex gap-2">
                        <Select 
                          value={filters.sortBy} 
                          onValueChange={(v) => setFilters({ ...filters, sortBy: v as any })}
                        >
                          <SelectTrigger className="h-8 flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="amount">Amount</SelectItem>
                            <SelectItem value="customer">Customer</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setFilters({ 
                            ...filters, 
                            sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" 
                          })}
                        >
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFilters({
                            searchTerm: "",
                            status: "all",
                            dateRange: undefined,
                            minAmount: "",
                            maxAmount: "",
                            customer: "all",
                            sortBy: "date",
                            sortOrder: "desc"
                          });
                        }}
                      >
                        Clear All
                      </Button>
                      <Button size="sm" onClick={() => setShowFilters(false)}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {selectedTransactions.size > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      Actions ({selectedTransactions.size})
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleBulkAction("export")}>
                      <FileDown className="w-4 h-4 mr-2" />
                      Export Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction("update-status")}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Update Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* Transactions List/Table */}
          <TabsContent value={selectedTab} className="mt-0">
            <Card>
              <CardContent className="p-0">
                {filteredTransactions.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="space-y-3">
                      <Receipt className="w-12 h-12 mx-auto text-muted-foreground" />
                      <h3 className="text-lg font-semibold">No transactions found</h3>
                      <p className="text-muted-foreground">
                        {filters.searchTerm || Object.values(filters).some(f => f && f !== "all" && f !== "date" && f !== "desc")
                          ? "Try adjusting your filters"
                          : "Transactions will appear here once customers make purchases"}
                      </p>
                      {(filters.searchTerm || Object.values(filters).some(f => f && f !== "all" && f !== "date" && f !== "desc")) && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setFilters({
                              searchTerm: "",
                              status: "all",
                              dateRange: undefined,
                              minAmount: "",
                              maxAmount: "",
                              customer: "all",
                              sortBy: "date",
                              sortOrder: "desc"
                            });
                          }}
                        >
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Cards</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions.map((transaction) => {
                          const user = userMap.get(transaction.receiver.customerId);
                          const firstCard = transaction.cards?.[0];
                          const cardData = firstCard ? Object.values(carouselCards).find(
                            c => c.title === firstCard.name
                          ) : null;
                          
                          return (
                            <TableRow key={transaction.id}>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="font-medium">
                                    #{transaction.id.slice(0, 8)}...
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Order ID
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="font-medium">
                                    {transaction.receiver.customerName}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {transaction.receiver.customerEmail}
                                  </div>
                                  {user && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <User className="w-3 h-3" />
                                      {user.role === "admin" ? "Admin" : "User"}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {cardData && (
                                    <div className="relative w-10 h-6 overflow-hidden rounded border">
                                      <Image
                                        src={cardData.image}
                                        alt={firstCard.name}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-sm">
                                      {transaction.cards.length} {transaction.cards.length === 1 ? "card" : "cards"}
                                    </div>
                                    {firstCard && (
                                      <div className="text-xs text-muted-foreground">
                                        {firstCard.name}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="font-semibold">
                                  ₱{transaction.amount.toLocaleString()}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={cn("gap-1", getStatusColor(transaction.status))}>
                                  {getStatusIcon(transaction.status)}
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  {formatDate(transaction.createdAt)}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
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
                                      Copy Transaction ID
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Update Status</DropdownMenuLabel>
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
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Top Customers Card */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>
              Customers with the highest transaction values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statistics.topCustomers.map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">
                        {customer.user?.firstName} {customer.user?.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {customer.count} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₱{customer.total.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Avg: ₱{Math.round(customer.total / customer.count).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <Dialog
            open={!!selectedTransaction}
            onOpenChange={(open) => !open && setSelectedTransaction(null)}
          >
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Transaction Details</DialogTitle>
                <DialogDescription>
                  Complete information about transaction #{selectedTransaction.id}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Transaction Overview */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-muted-foreground text-xs">Status</Label>
                    <Badge className={cn("mt-1", getStatusColor(selectedTransaction.status))}>
                      {getStatusIcon(selectedTransaction.status)}
                      {selectedTransaction.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Amount</Label>
                    <p className="text-xl font-semibold">
                      ₱{selectedTransaction.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Date</Label>
                    <p>{formatDate(selectedTransaction.createdAt)}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs">Cards</Label>
                    <p>{selectedTransaction.cards.length} cards ordered</p>
                  </div>
                </div>

                <Separator />

                {/* Customer Information */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Name</Label>
                        <p className="font-medium">{selectedTransaction.receiver.customerName}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Email</Label>
                        <p className="text-sm">{selectedTransaction.receiver.customerEmail}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Phone</Label>
                        <p className="text-sm">{selectedTransaction.receiver.customerPhone || "Not provided"}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Customer ID</Label>
                        <p className="text-sm font-mono">{selectedTransaction.receiver.customerId}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Delivery Information */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Delivery Information
                  </h3>
                  <div className="rounded-lg border p-4 bg-muted/30">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm">
                          {selectedTransaction.receiver.customerAddress || "No delivery address provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Ordered Cards */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Ordered Cards
                  </h3>
                  <div className="space-y-3">
                    {selectedTransaction.cards.map((card, index) => {
                      const cardData = Object.values(carouselCards).find(
                        (item) => item.title === card.name
                      );
                      const image = cardData?.image || carouselCards.eclipse.image;
                      
                      return (
                        <div key={card.id} className="flex gap-4 p-4 rounded-lg border bg-card">
                          <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={image}
                              alt={card.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h4 className="font-medium">{card.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Hash className="w-3 h-3" />
                                ID: {card.id}
                              </span>
                              <span>Card {index + 1} of {selectedTransaction.cards.length}</span>
                            </div>
                            {card.quantity && (
                              <p className="text-sm">Quantity: {card.quantity}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Information */}
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Payment Information
                  </h3>
                  <div className="rounded-lg border p-4 bg-muted/30">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₱{selectedTransaction.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span>Xendit</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₱{selectedTransaction.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(selectedTransaction.id)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy ID
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast.info("Opening invoice...");
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Invoice
                    </Button>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Update Status
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {["pending", "processing", "completed", "cancelled"].map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => {
                            handleStatusUpdate(selectedTransaction.id, status as any);
                            setSelectedTransaction(null);
                          }}
                          disabled={selectedTransaction.status === status}
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
                </div>
              </div>

              <DialogFooter className="mt-6">
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
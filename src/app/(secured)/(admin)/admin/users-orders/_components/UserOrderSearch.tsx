"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, User, Package, ShoppingCart, X } from "lucide-react";
import { getUserOrderSummary, getAllUsersWithOrders } from "@/lib/firebase/actions/user-orders.action";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const UserOrderSearch: React.FC = () => {
  const [searchUserId, setSearchUserId] = useState("");
  const [searching, setSearching] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userSummary, setUserSummary] = useState<any>(null);
  const [usersList, setUsersList] = useState<Array<{userId: string, name: string, orderCount: number}>>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const handleSearch = async () => {
    if (!searchUserId.trim()) {
      toast.error("Please enter a user ID");
      return;
    }

    setSearching(true);
    try {
      const summary = await getUserOrderSummary(searchUserId.trim());
      setUserSummary(summary);
      setDialogOpen(true);
    } catch (error) {
      toast.error("Failed to fetch user orders");
      console.error(error);
    } finally {
      setSearching(false);
    }
  };

  const loadUsersWithOrders = async () => {
    setLoadingUsers(true);
    try {
      const users = await getAllUsersWithOrders();
      setUsersList(users);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSearchUserId(userId);
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      "Pending": "bg-yellow-100 text-yellow-800",
      "To Ship": "bg-blue-100 text-blue-800",
      "To Receive": "bg-purple-100 text-purple-800",
      "Delivered": "bg-green-100 text-green-800",
      "To Return/Refund": "bg-orange-100 text-orange-800",
      "Cancelled": "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Search User Orders</CardTitle>
          <CardDescription>
            Search for orders by user ID or select from users with existing orders
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter User ID"
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={searching}
              size="icon"
            >
              {searching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Or select a user:</span>
            <Select onValueChange={handleSelectUser}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a user with orders" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={loadUsersWithOrders}
                    disabled={loadingUsers}
                    className="w-full"
                  >
                    {loadingUsers ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Loading users...
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-3 w-3" />
                        Load users with orders
                      </>
                    )}
                  </Button>
                </div>
                {usersList.length > 0 && (
                  <>
                    <div className="px-2 py-1 text-xs text-gray-500">
                      {usersList.length} users found
                    </div>
                    {usersList.map((user) => (
                      <SelectItem key={user.userId} value={user.userId}>
                        <div className="flex items-center justify-between w-full">
                          <span className="truncate mr-2">{user.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {user.orderCount} orders
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* User Order Summary Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Order Summary</DialogTitle>
            <DialogDescription>
              Order details for user ID: {searchUserId}
            </DialogDescription>
          </DialogHeader>

          {userSummary && (
            <div className="space-y-6">
              {/* User Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4" />
                    User Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <Badge variant={userSummary.user.exists ? "default" : "destructive"} className="ml-2">
                        {userSummary.user.exists ? "Active" : "Not Found"}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <span className="ml-2 font-medium">{userSummary.user.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <span className="ml-2">{userSummary.user.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <span className="ml-2">{userSummary.user.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Orders Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Orders ({userSummary.orders.total})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userSummary.orders.total > 0 ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(userSummary.orders.statuses).map(([status, count]) => (
                          <Badge key={status} className={getStatusBadgeColor(status)}>
                            {status}: {count as number}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        Latest orders shown in the orders table
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No orders found</p>
                  )}
                </CardContent>
              </Card>

              {/* Transactions Summary */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Transactions ({userSummary.transactions.total})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userSummary.transactions.total > 0 ? (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(userSummary.transactions.statuses).map(([status, count]) => (
                          <Badge key={status} className={getStatusBadgeColor(status)}>
                            {status}: {count as number}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {userSummary.transactions.items.slice(0, 3).map((trans: any) => (
                          <div key={trans.id} className="text-sm border-l-2 pl-3 py-1">
                            <div className="flex justify-between">
                              <span className="font-medium">ID: {trans.id.slice(-8)}</span>
                              <span>₱{trans.amount || trans.totalAmount}</span>
                            </div>
                            <div className="text-gray-500">
                              {trans.createdAt?.toDate?.()?.toLocaleDateString() || "Unknown date"}
                            </div>
                          </div>
                        ))}
                        {userSummary.transactions.total > 3 && (
                          <p className="text-sm text-gray-500">
                            +{userSummary.transactions.total - 3} more transactions
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No transactions found</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
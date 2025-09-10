"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Plus,
  Minus,
  RefreshCw,
  Save,
  CheckCircle2,
  Clock,
  PackageX,
  Edit3,
  X,
  Check
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { carouselCards } from "@/constants";
import Image from "next/image";
import {
  getInventory,
  updateInventoryCount,
  initializeInventory,
  type InventoryData,
  type CardInventory,
} from "@/lib/firebase/actions/inventory.action";

interface InventoryCardProps {
  cardType: string;
  inventory: CardInventory;
  onUpdate: (cardType: string, newTotal: number) => Promise<void>;
}

function InventoryCard({ cardType, inventory, onUpdate }: InventoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTotal, setNewTotal] = useState(inventory.total.toString());
  const [isUpdating, setIsUpdating] = useState(false);

  const cardDesign = carouselCards[cardType as keyof typeof carouselCards];
  const availablePercentage = (inventory.available / inventory.total) * 100;
  const isLowStock = inventory.available < 20;
  const isOutOfStock = inventory.available === 0;

  const handleUpdate = async () => {
    const total = parseInt(newTotal);
    if (isNaN(total) || total < 0) {
      toast.error("Please enter a valid number");
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(cardType, total);
      setIsEditing(false);
      toast.success(`${cardDesign?.title || cardType} inventory updated`);
    } catch (error) {
      console.error("Error updating inventory:", error);
      toast.error("Failed to update inventory");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all",
      isOutOfStock && "border-red-500/50",
      isLowStock && !isOutOfStock && "border-yellow-500/50"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {cardDesign?.title || cardType}
              {isOutOfStock && (
                <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
              )}
              {isLowStock && !isOutOfStock && (
                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">Low Stock</Badge>
              )}
            </CardTitle>
            <CardDescription>
              Card ID: {cardType}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            disabled={isUpdating}
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Card Image */}
        {cardDesign?.image && (
          <div className="relative w-full h-32 rounded-lg overflow-hidden bg-muted">
            <Image
              src={cardDesign.image}
              alt={cardDesign.title}
              fill
              className="object-contain"
            />
          </div>
        )}

        {/* Inventory Stats */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Available</p>
            <p className="text-2xl font-bold text-green-600">{inventory.available}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{inventory.pending}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Assigned</p>
            <p className="text-2xl font-bold text-blue-600">{inventory.assigned}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Stock Level</span>
            <span className="font-medium">{availablePercentage.toFixed(0)}%</span>
          </div>
          <Progress 
            value={availablePercentage} 
            className={cn(
              "h-2",
              isOutOfStock && "[&>div]:bg-red-500",
              isLowStock && !isOutOfStock && "[&>div]:bg-yellow-500"
            )}
          />
        </div>

        {/* Edit Total */}
        {isEditing && (
          <div className="space-y-2 pt-2 border-t">
            <Label className="text-sm">Total Inventory</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={newTotal}
                onChange={(e) => setNewTotal(e.target.value)}
                min={inventory.pending + inventory.assigned}
                placeholder="Enter new total"
                disabled={isUpdating}
              />
              <Button
                size="sm"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum: {inventory.pending + inventory.assigned} (pending + assigned)
            </p>
          </div>
        )}

        {/* Last Updated */}
        <p className="text-xs text-muted-foreground">
          Last updated: {inventory.lastUpdated?.toDate?.().toLocaleDateString() || "Unknown"}
        </p>
      </CardContent>
    </Card>
  );
}

export default function InventoryDashboard() {
  const [inventory, setInventory] = useState<InventoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitializing, setIsInitializing] = useState(false);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      toast.error("Failed to fetch inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleInitializeInventory = async () => {
    setIsInitializing(true);
    try {
      // Initialize with 200 of each card type
      const initialCounts = {
        eclipse: 200,
        aurora: 200,
        bloom: 200,
        vortex: 200,
        viper: 200,
      };

      const success = await initializeInventory(initialCounts);
      if (success) {
        toast.success("Inventory initialized successfully");
        await fetchInventory();
      } else {
        toast.error("Failed to initialize inventory");
      }
    } catch (error) {
      console.error("Error initializing inventory:", error);
      toast.error("Failed to initialize inventory");
    } finally {
      setIsInitializing(false);
    }
  };

  const handleUpdateInventory = async (cardType: string, newTotal: number) => {
    const result = await updateInventoryCount(cardType, newTotal);
    if (result.success) {
      await fetchInventory();
    } else {
      throw new Error(result.message);
    }
  };

  // Calculate totals
  const totals = inventory ? Object.values(inventory).reduce(
    (acc, inv) => ({
      available: acc.available + inv.available,
      pending: acc.pending + inv.pending,
      assigned: acc.assigned + inv.assigned,
      total: acc.total + inv.total,
    }),
    { available: 0, pending: 0, assigned: 0, total: 0 }
  ) : { available: 0, pending: 0, assigned: 0, total: 0 };

  const outOfStockCount = inventory ? Object.values(inventory).filter(inv => inv.available === 0).length : 0;
  const lowStockCount = inventory ? Object.values(inventory).filter(inv => inv.available > 0 && inv.available < 20).length : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!inventory) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <PackageX className="w-16 h-16 text-muted-foreground" />
        <h3 className="text-lg font-semibold">No Inventory Data</h3>
        <p className="text-muted-foreground text-center max-w-md">
          The inventory system has not been initialized yet. Click below to set up initial inventory.
        </p>
        <Button onClick={handleInitializeInventory} disabled={isInitializing}>
          {isInitializing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Initializing...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Initialize Inventory
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="py-4 px-4 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Inventory Management</h1>
              <p className="text-muted-foreground">
                Track and manage card inventory levels
              </p>
            </div>
          </div>
        </div>
        <Button onClick={fetchInventory} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Alerts */}
      {outOfStockCount > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Out of Stock Alert</AlertTitle>
          <AlertDescription>
            {outOfStockCount} card {outOfStockCount === 1 ? 'type is' : 'types are'} currently out of stock.
          </AlertDescription>
        </Alert>
      )}

      {lowStockCount > 0 && (
        <Alert className="border-yellow-500/50 text-yellow-800 dark:text-yellow-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Low Stock Warning</AlertTitle>
          <AlertDescription>
            {lowStockCount} card {lowStockCount === 1 ? 'type has' : 'types have'} low inventory (less than 20 cards).
          </AlertDescription>
        </Alert>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Available</p>
                <p className="text-2xl font-bold">{totals.available}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">{totals.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Assigned</p>
                <p className="text-2xl font-bold">{totals.assigned}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cards</p>
                <p className="text-2xl font-bold">{totals.total}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Card Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(inventory).map(([cardType, cardInventory]) => (
          <InventoryCard
            key={cardType}
            cardType={cardType}
            inventory={cardInventory}
            onUpdate={handleUpdateInventory}
          />
        ))}
      </div>

      {/* Instructions */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">Inventory Management Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong>Available</strong>: Cards ready to be shipped to customers</p>
          <p>• <strong>Pending</strong>: Cards ordered but not yet activated (in transit or with customers)</p>
          <p>• <strong>Assigned</strong>: Cards that have been activated by customers</p>
          <p>• <strong>Total</strong>: The complete inventory count for each card type</p>
          <div className="pt-2 border-t">
            <p>When you print new cards, update the total inventory to reflect the new stock.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
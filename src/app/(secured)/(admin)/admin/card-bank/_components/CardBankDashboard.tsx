"use client";

import { useState, useEffect } from "react";
import { carouselCards } from "@/constants";
import { Card } from "@/types/types";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Package,
  QrCode,
  Download,
  RefreshCw,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card as UICard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPregeneratedCards,
  generateBulkCards,
  deletePregeneratedCard,
  exportPregeneratedCards,
  testFirebaseConnection
} from "@/lib/firebase/actions/card-bank.action";

interface CardVariantStock {
  id: string;
  title: string;
  image: string;
  backImage: string;
  totalCards: number;
  availableCards: number;
  reservedCards: number;
  assignedCards: number;
}

export default function CardBankDashboard() {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [generateCount, setGenerateCount] = useState<number>(5);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [selectedCardDetails, setSelectedCardDetails] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: pregeneratedCards = [], isLoading, refetch } = useQuery({
    queryKey: ["pregeneratedCards"],
    queryFn: async () => {
      console.log("[CardBankDashboard] Fetching pregenerated cards...");
      const cards = await getPregeneratedCards();
      console.log("[CardBankDashboard] Received cards:", cards);
      return cards;
    },
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    refetchOnWindowFocus: true,
  });

  const { mutate: generateCards, isPending: isGenerating } = useMutation({
    mutationFn: ({ cardType, count }: { cardType: string; count: number }) => 
      generateBulkCards(cardType, count),
    onSuccess: async (_, variables) => {
      toast.success(`Successfully generated ${variables.count} ${variables.cardType} cards!`);
      setShowGenerateDialog(false);
      setGenerateCount(5);
      // Add a small delay before refetching to ensure Firebase has updated
      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey: ["pregeneratedCards"] });
        await queryClient.invalidateQueries({ queryKey: ["all-cards-stock"] });
        refetch();
      }, 1000);
    },
    onError: (error: any) => {
      const errorMessage = error?.message || "Failed to generate cards";
      toast.error(errorMessage);
      console.error("Error generating cards:", error);
    },
  });

  const { mutate: deleteCard, isPending: isDeleting } = useMutation({
    mutationFn: deletePregeneratedCard,
    onSuccess: async () => {
      toast.success("Card deleted successfully");
      await queryClient.invalidateQueries({ queryKey: ["pregeneratedCards"] });
      await queryClient.invalidateQueries({ queryKey: ["all-cards-stock"] });
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to delete card");
      console.error("Error deleting card:", error);
    },
  });

  // Calculate stock for each card variant
  const cardVariantStock: CardVariantStock[] = Object.values(carouselCards).map((card) => {
    const variantCards = pregeneratedCards.filter(
      (pc) => pc.cardType === card.id
    );
    const availableCards = variantCards.filter((pc) => pc.status === "available");
    const reservedCards = variantCards.filter((pc) => pc.status === "reserved");
    const assignedCards = variantCards.filter((pc) => pc.status === "assigned");

    console.log(`[CardBankDashboard] Stock for ${card.id}:`, {
      total: variantCards.length,
      available: availableCards.length,
      reserved: reservedCards.length,
      assigned: assignedCards.length,
      sampleCard: variantCards[0],
      allCards: pregeneratedCards.length
    });

    return {
      id: card.id,
      title: card.title,
      image: card.image,
      backImage: card.backImage,
      totalCards: variantCards.length,
      availableCards: availableCards.length,
      reservedCards: reservedCards.length,
      assignedCards: assignedCards.length,
    };
  });

  const handleGenerateCards = () => {
    console.log("[CardBankDashboard] Generate cards clicked:", {
      selectedVariant,
      generateCount
    });
    if (!selectedVariant || generateCount < 1) {
      console.log("[CardBankDashboard] Invalid params, aborting");
      return;
    }
    generateCards({ cardType: selectedVariant, count: generateCount });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Transfer code copied!");
  };

  const handleCopyLink = (cardId: string) => {
    const domain = process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_DEV
      : process.env.NEXT_PUBLIC_RESET_PASSWORD_URL_PROD;
    const link = `${domain}/site/${cardId}`;
    navigator.clipboard.writeText(link);
    toast.success("Card link copied!");
  };

  const handleExportCards = async (cardType: string) => {
    try {
      const csvContent = await exportPregeneratedCards(cardType);
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${cardType}-cards-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Cards exported successfully!");
    } catch (error) {
      toast.error("Failed to export cards");
      console.error("Error exporting cards:", error);
    }
  };

  const getStockBadge = (available: number) => {
    if (available === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (available <= 5) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
    }
    return <Badge variant="secondary" className="bg-green-100 text-green-800">In Stock</Badge>;
  };

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
              <h1 className="text-2xl font-bold">Card Bank</h1>
              <p className="text-muted-foreground">
                Manage pregenerated cards and inventory
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              const isConnected = await testFirebaseConnection();
              if (isConnected) {
                toast.success("Firebase connection successful!");
              } else {
                toast.error("Firebase connection failed - check console");
              }
            }}
          >
            Test Connection
          </Button>
          <Button
            variant="outline"
            onClick={async () => {
              await queryClient.invalidateQueries({ queryKey: ["pregeneratedCards"] });
              await queryClient.invalidateQueries({ queryKey: ["all-cards-stock"] });
              refetch();
            }}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <UICard>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cards</p>
                <p className="text-2xl font-bold">{pregeneratedCards.length}</p>
              </div>
              <CreditCard className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </UICard>

        <UICard>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {pregeneratedCards.filter(c => c.status === "available").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </UICard>

        <UICard>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reserved</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {pregeneratedCards.filter(c => c.status === "reserved").length}
                </p>
              </div>
              <Package className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </UICard>

        <UICard>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Activated</p>
                <p className="text-2xl font-bold text-blue-600">
                  {pregeneratedCards.filter(c => c.status === "assigned").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </UICard>

        <UICard>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {cardVariantStock.filter(v => v.availableCards === 0).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </UICard>
      </div>

      {/* Card Variants Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {cardVariantStock.map((variant) => (
            <UICard key={variant.id} className="overflow-hidden">
              <div className="aspect-[1.586/1] relative">
                <Image
                  src={variant.image}
                  alt={variant.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{variant.title}</h3>
                  {getStockBadge(variant.availableCards)}
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium">{variant.totalCards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available:</span>
                    <span className="font-medium text-green-600">{variant.availableCards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reserved:</span>
                    <span className="font-medium text-yellow-600">{variant.reservedCards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Activated:</span>
                    <span className="font-medium text-blue-600">{variant.assignedCards}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedCardDetails(variant)}
                  >
                    View
                  </Button>

                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setSelectedVariant(variant.id);
                      setShowGenerateDialog(true);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Generate
                  </Button>
                </div>
              </CardContent>
            </UICard>
          ))}
        </div>
      </div>

      {/* View Cards Dialog */}
      <Dialog open={!!selectedCardDetails} onOpenChange={(open) => !open && setSelectedCardDetails(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCardDetails?.title} Cards</DialogTitle>
            <DialogDescription>
              Manage pregenerated cards for {selectedCardDetails?.title}
            </DialogDescription>
          </DialogHeader>

          {selectedCardDetails && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="outline">Total: {selectedCardDetails.totalCards}</Badge>
                  <Badge variant="outline" className="text-green-600">
                    Available: {selectedCardDetails.availableCards}
                  </Badge>
                  <Badge variant="outline" className="text-yellow-600">
                    Reserved: {selectedCardDetails.reservedCards}
                  </Badge>
                  <Badge variant="outline" className="text-blue-600">
                    Activated: {selectedCardDetails.assignedCards}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      await queryClient.invalidateQueries({ queryKey: ["pregeneratedCards"] });
                      await queryClient.invalidateQueries({ queryKey: ["all-cards-stock"] });
                      refetch();
                    }}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportCards(selectedCardDetails.id)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Card ID</TableHead>
                        <TableHead>Transfer Code</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pregeneratedCards
                        .filter((card) => card.cardType === selectedCardDetails.id)
                        .map((card) => (
                          <TableRow key={card.id}>
                            <TableCell className="font-mono text-sm">
                              <span title={card.id}>{card.id.slice(0, 8)}...</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {card.transferCode}
                                </code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyCode(card.transferCode)}
                                  title="Copy transfer code"
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={card.status === "available" ? "secondary" : "default"}
                                className={
                                  card.status === "available"
                                    ? "bg-green-100 text-green-800"
                                    : card.status === "reserved"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                                }
                              >
                                {card.status}
                              </Badge>
                              {card.status === "reserved" && card.reservedFor && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  User: {card.reservedFor.slice(0, 8)}...
                                </p>
                              )}
                              {card.status === "assigned" && card.assignedTo && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  User: {card.assignedTo.slice(0, 8)}...
                                </p>
                              )}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(card.createdAt).toLocaleDateString()}
                              <p className="text-xs">
                                {new Date(card.createdAt).toLocaleTimeString()}
                              </p>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyLink(card.id)}
                                  title="Copy card link"
                                >
                                  <QrCode className="w-4 h-4" />
                                </Button>
                                {card.status === "available" && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                    onClick={() => deleteCard(card.id)}
                                    disabled={isDeleting}
                                    title="Delete card"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      {pregeneratedCards.filter((card) => card.cardType === selectedCardDetails.id).length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No cards generated yet for this variant
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Generate Cards Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Cards</DialogTitle>
            <DialogDescription>
              Generate preprinted cards for {selectedVariant && carouselCards[selectedVariant as keyof typeof carouselCards]?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedVariant && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Image
                  src={carouselCards[selectedVariant as keyof typeof carouselCards]?.image || ""}
                  alt={carouselCards[selectedVariant as keyof typeof carouselCards]?.title || ""}
                  width={60}
                  height={40}
                  className="object-cover rounded"
                />
                <div>
                  <p className="font-medium">{carouselCards[selectedVariant as keyof typeof carouselCards]?.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Current stock: {cardVariantStock.find(v => v.id === selectedVariant)?.availableCards || 0} available
                  </p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="count">Number of cards to generate</Label>
              <Input
                id="count"
                type="number"
                value={generateCount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setGenerateCount(0);
                  } else {
                    const num = parseInt(value);
                    if (!isNaN(num) && num >= 0 && num <= 100) {
                      setGenerateCount(num);
                    }
                  }
                }}
                onBlur={() => {
                  if (generateCount < 1) {
                    setGenerateCount(1);
                  }
                }}
                min={1}
                max={100}
                placeholder="Enter number of cards"
              />
              <p className="text-sm text-muted-foreground">
                Each card will have a unique ID and transfer code
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-300">
                  <p className="font-medium">Important:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Generated cards will be marked as "available" for purchase</li>
                    <li>Each card gets a unique 8-character transfer code</li>
                    <li>Cards can be exported as CSV for printing QR codes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowGenerateDialog(false)}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerateCards}
              disabled={isGenerating || generateCount < 1}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Generate {generateCount} Cards
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
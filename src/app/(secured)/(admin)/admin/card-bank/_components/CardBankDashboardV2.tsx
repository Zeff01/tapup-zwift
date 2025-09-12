"use client";

import { useState, useEffect, useCallback } from "react";
import { carouselCards, USER_ROLE_ENUMS } from "@/constants";
import { Card, UserRole } from "@/types/types";
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
import {
  getPregeneratedCards,
  generateBulkCards,
  deletePregeneratedCard,
  exportPregeneratedCards,
  getCardGenerationLogs,
  PregeneratedCard
} from "@/lib/firebase/actions/card-bank.action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Calendar, User } from "lucide-react";
import { useUserContext } from "@/providers/user-provider";
import { getUserById } from "@/lib/firebase/actions/user.action";

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

interface CardBankDashboardProps {
  userRole: UserRole;
  currentUser: {
    uid: string;
    email: string;
    name: string;
  };
  initialCards?: PregeneratedCard[];
  initialLogs?: any[];
}

export default function CardBankDashboardV2({ userRole, currentUser, initialCards = [], initialLogs = [] }: CardBankDashboardProps) {
  const { user } = useUserContext();
  const [pregeneratedCards, setPregeneratedCards] = useState<PregeneratedCard[]>(initialCards);
  const [logs, setLogs] = useState<any[]>(initialLogs);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [generateCount, setGenerateCount] = useState<number>(5);
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [selectedCardDetails, setSelectedCardDetails] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<Record<string, any>>({});
  
  // Check if user is super admin (can only generate cards)
  const isSuperAdmin = userRole === USER_ROLE_ENUMS.SUPER_ADMIN;
  const canViewDetails = true; // All admins can view details
  const canDeleteCards = true; // All admins can delete
  const canExportCards = true; // All admins can export

  // Fetch cards
  const fetchCards = useCallback(async () => {
    try {
      setIsLoading(true);
      const cards = await getPregeneratedCards();
      setPregeneratedCards(cards);
      
      // Fetch user details for reserved/assigned cards
      const userIds = new Set<string>();
      cards.forEach(card => {
        if (card.reservedFor) userIds.add(card.reservedFor);
        if (card.assignedTo) userIds.add(card.assignedTo);
      });
      
      const userDetailsMap: Record<string, any> = {};
      for (const userId of userIds) {
        if (!userDetails[userId]) {
          try {
            const user = await getUserById(userId);
            if (user) {
              userDetailsMap[userId] = user;
            }
          } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
          }
        }
      }
      
      if (Object.keys(userDetailsMap).length > 0) {
        setUserDetails(prev => ({ ...prev, ...userDetailsMap }));
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Failed to fetch cards");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch logs
  const fetchLogs = useCallback(async () => {
    if (!isSuperAdmin) return;
    try {
      setIsLoadingLogs(true);
      const logsData = await getCardGenerationLogs();
      setLogs(logsData);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setIsLoadingLogs(false);
    }
  }, [isSuperAdmin]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCards();
      if (isSuperAdmin) {
        fetchLogs();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchCards, fetchLogs, isSuperAdmin]);

  const handleGenerateCards = async () => {
    if (!selectedVariant || generateCount < 1) return;
    
    // Double-check permission
    if (!isSuperAdmin) {
      toast.error("Only Super Admins can generate cards. Please contact a Super Admin to generate cards for you.");
      return;
    }
    
    try {
      setIsGenerating(true);
      const userData = {
        uid: user?.uid || currentUser.uid,
        email: user?.email || currentUser.email,
        name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || currentUser.name
      };
      
      await generateBulkCards(selectedVariant, generateCount, userData);
      toast.success(`Successfully generated ${generateCount} ${selectedVariant} cards!`);
      setShowGenerateDialog(false);
      setGenerateCount(5);
      
      // Refresh data
      await Promise.all([fetchCards(), fetchLogs()]);
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to generate cards";
      toast.error(errorMessage);
      console.error("Error generating cards:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    try {
      setIsDeleting(true);
      await deletePregeneratedCard(cardId);
      toast.success("Card deleted successfully");
      await fetchCards();
    } catch (error) {
      toast.error("Failed to delete card");
      console.error("Error deleting card:", error);
    } finally {
      setIsDeleting(false);
    }
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

  // Calculate stock for each card variant
  const cardVariantStock: CardVariantStock[] = Object.values(carouselCards).map((card) => {
    const variantCards = pregeneratedCards.filter(
      (pc) => pc.cardType === card.id
    );
    const availableCards = variantCards.filter((pc) => pc.status === "available");
    const reservedCards = variantCards.filter((pc) => pc.status === "reserved");
    const assignedCards = variantCards.filter((pc) => pc.status === "assigned");

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

  return (
    <div className="py-4 px-4 space-y-6">
      <Tabs defaultValue="inventory" className="w-full">
        <div className="flex items-start justify-between mb-6">
          <TabsList>
            <TabsTrigger value="inventory">Card Inventory</TabsTrigger>
            {isSuperAdmin && (
              <TabsTrigger value="logs">
                <History className="w-4 h-4 mr-2" />
                Generation Logs
              </TabsTrigger>
            )}
          </TabsList>
        </div>
        
        <TabsContent value="inventory" className="mt-0 space-y-6">
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
                onClick={() => {
                  fetchCards();
                  if (isSuperAdmin) fetchLogs();
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {cardVariantStock.map((variant) => (
                <UICard key={variant.id} className="overflow-hidden">
                  <div className="aspect-[1.586/1] relative">
                    <Image
                      src={variant.image}
                      alt={variant.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      priority={variant.image.includes('Eclipse-front.png')}
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-3 sm:p-4 space-y-3">
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
                      {canViewDetails && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => setSelectedCardDetails(variant)}
                        >
                          View
                        </Button>
                      )}

                      <Button
                        size="sm"
                        className={canViewDetails ? "flex-1" : "w-full"}
                        onClick={() => {
                          if (!isSuperAdmin) {
                            toast.error("Only Super Admins can generate cards. Please contact a Super Admin to generate cards for you.");
                            return;
                          }
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
            <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
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
                        onClick={fetchCards}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      {canExportCards && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportCards(selectedCardDetails.id)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Export CSV
                        </Button>
                      )}
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
                            <TableHead>User</TableHead>
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
                                </TableCell>
                                <TableCell className="max-w-xs">
                                  {(card.status === "reserved" || card.status === "assigned") && (
                                    <div className="space-y-1">
                                      {(() => {
                                        const userId = card.status === "reserved" ? card.reservedFor : card.assignedTo;
                                        const user = userDetails[userId || ''];
                                        
                                        if (user) {
                                          return (
                                            <>
                                              <p className="font-medium text-sm">
                                                {user.firstName} {user.lastName}
                                              </p>
                                              <p className="text-xs text-muted-foreground">
                                                {user.email}
                                              </p>
                                              <p className="text-xs text-muted-foreground font-mono">
                                                ID: {userId}
                                              </p>
                                            </>
                                          );
                                        }
                                        
                                        return (
                                          <p className="text-xs text-muted-foreground font-mono">
                                            ID: {userId}
                                          </p>
                                        );
                                      })()}
                                    </div>
                                  )}
                                  {card.status === "available" && (
                                    <span className="text-sm text-muted-foreground">—</span>
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
                                    {card.status === "available" && canDeleteCards && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                        onClick={() => handleDeleteCard(card.id)}
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
                {selectedVariant && carouselCards[selectedVariant as keyof typeof carouselCards] && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    {carouselCards[selectedVariant as keyof typeof carouselCards]?.image ? (
                      <Image
                        src={carouselCards[selectedVariant as keyof typeof carouselCards].image}
                        alt={carouselCards[selectedVariant as keyof typeof carouselCards].title}
                        width={60}
                        height={40}
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="w-[60px] h-[40px] bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
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
        </TabsContent>
        
        {/* Logs Tab - Only for Super Admins */}
        {isSuperAdmin && (
          <TabsContent value="logs" className="mt-0 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Card Generation History</h2>
              <UICard>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Card Type</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Transfer Codes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingLogs ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : logs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No generation logs found
                        </TableCell>
                      </TableRow>
                    ) : (
                      logs.map((log: any) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              {new Date(log.generatedAt).toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{log.generatedBy?.name}</p>
                                <p className="text-xs text-muted-foreground">{log.generatedBy?.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{log.cardType}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge>{log.count} cards</Badge>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  View Codes
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Transfer Codes</DialogTitle>
                                  <DialogDescription>
                                    Generated on {new Date(log.generatedAt).toLocaleString()}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
                                  {log.transferCodes?.map((code: string, index: number) => (
                                    <div key={index} className="font-mono text-sm p-2 bg-muted rounded">
                                      {code}
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </UICard>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
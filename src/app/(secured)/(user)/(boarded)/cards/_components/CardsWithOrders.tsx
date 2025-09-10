"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Package } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Cards from "./cards";
import Orders from "./Orders";

const CardsWithOrders = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam === "orders" ? "orders" : "cards");

  useEffect(() => {
    // Update tab if URL parameter changes
    if (tabParam === "orders" || tabParam === "cards") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  return (
    <div className="flex-1">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-4 md:px-14 pt-4 md:pt-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              My Cards
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              My Orders
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="cards" className="mt-0">
          <Cards />
        </TabsContent>
        
        <TabsContent value="orders" className="mt-0">
          <Orders />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CardsWithOrders;
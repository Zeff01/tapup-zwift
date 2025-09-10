"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2, AlertCircle, CheckCircle2, Database, Trash2, Wrench } from "lucide-react";

export default function FixDataPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);

  const runFix = async (action: string) => {
    setIsLoading(action);
    try {
      const response = await fetch("/api/admin/fix-transaction-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to run fix");
      }

      if (action === "analyze") {
        setAnalysisData(data.analysis);
        toast.success("Analysis completed");
      } else {
        toast.success(data.message || "Fix completed successfully");
        // Refresh analysis after fix
        runFix("analyze");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to run fix");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Fix Transaction Data</h1>
        <p className="text-muted-foreground mt-2">
          Clean up and standardize transaction data
        </p>
      </div>

      <div className="grid gap-6">
        {/* Analysis Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data Analysis
            </CardTitle>
            <CardDescription>
              Analyze current transaction data to identify issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => runFix("analyze")}
              disabled={isLoading !== null}
              className="mb-4"
            >
              {isLoading === "analyze" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Run Analysis
                </>
              )}
            </Button>

            {analysisData && (
              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <p><strong>Total Transactions:</strong> {analysisData.total}</p>
                <div>
                  <p className="font-semibold mb-1">Status Breakdown:</p>
                  <ul className="ml-4 space-y-1">
                    {Object.entries(analysisData.byStatus).map(([status, count]) => (
                      <li key={status}>
                        {status}: {count as number} transactions
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-red-600">
                    <AlertCircle className="inline w-4 h-4 mr-1" />
                    Issues Found:
                  </p>
                  <ul className="ml-4 space-y-1 text-red-600">
                    <li>Missing Customer Info: {analysisData.missingReceiver}</li>
                    <li>Missing User ID: {analysisData.missingUserId}</li>
                    <li>No Items/Cards: {analysisData.missingItems}</li>
                    <li>Empty Transactions: {analysisData.emptyTransactions}</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fix Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Fix Transaction Statuses
            </CardTitle>
            <CardDescription>
              Update all non-standard statuses (like "to-ship") to valid ones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm">This will:</p>
                <ul className="text-sm ml-4 mt-1 list-disc">
                  <li>Change "to-ship" → "processing"</li>
                  <li>Change "shipping" or "delivered" → "completed"</li>
                  <li>Standardize all other non-standard statuses</li>
                </ul>
              </div>
              <Button
                onClick={() => runFix("fix-statuses")}
                disabled={isLoading !== null}
                variant="default"
              >
                {isLoading === "fix-statuses" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fixing Statuses...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Fix Statuses
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fix Missing Customers Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Fix Missing Customer Data
            </CardTitle>
            <CardDescription>
              Fix transactions with missing customer information or delete empty ones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <p className="text-sm">This will:</p>
                <ul className="text-sm ml-4 mt-1 list-disc">
                  <li>Try to reconstruct missing receiver data from other fields</li>
                  <li>Delete completely empty transactions (no user, items, or amount)</li>
                  <li>Log problematic transactions that can't be automatically fixed</li>
                </ul>
              </div>
              <Button
                onClick={() => runFix("fix-missing-customers")}
                disabled={isLoading !== null}
                variant="destructive"
              >
                {isLoading === "fix-missing-customers" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Fixing Customer Data...
                  </>
                ) : (
                  <>
                    <Wrench className="mr-2 h-4 w-4" />
                    Fix Customer Data
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
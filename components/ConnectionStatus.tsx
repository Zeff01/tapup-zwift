"use client";

import { useFirebaseConnection } from "@/hooks/useFirebaseConnection";
import { AlertCircle, Wifi, WifiOff } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ConnectionStatus() {
  const { isOnline, isConnected } = useFirebaseConnection();

  if (isOnline && isConnected) {
    return null; // Don't show anything when connected
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Alert variant={isOnline ? "default" : "destructive"}>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Connecting to server... Your changes will sync when connection is restored.
              </AlertDescription>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              <AlertDescription>
                You're offline. Your changes will be saved locally and synced when you're back online.
              </AlertDescription>
            </>
          )}
        </div>
      </Alert>
    </div>
  );
}
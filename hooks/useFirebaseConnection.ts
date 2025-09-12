import { useEffect, useState } from 'react';
import { onlineManager } from '@tanstack/react-query';
import { enableNetwork, disableNetwork } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';

export function useFirebaseConnection() {
  const [isOnline, setIsOnline] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Listen to browser online/offline events
    const handleOnline = async () => {
      console.log('Browser is online, enabling Firestore network...');
      setIsOnline(true);
      try {
        await enableNetwork(db);
        setIsConnected(true);
      } catch (error) {
        console.error('Error enabling Firestore network:', error);
        setIsConnected(false);
      }
    };

    const handleOffline = async () => {
      console.log('Browser is offline, disabling Firestore network...');
      setIsOnline(false);
      setIsConnected(false);
      try {
        await disableNetwork(db);
      } catch (error) {
        console.error('Error disabling Firestore network:', error);
      }
    };

    // Set initial state
    if (!navigator.onLine) {
      handleOffline();
    }

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Sync with React Query
    onlineManager.setEventListener(setOnline => {
      setOnline(navigator.onLine);
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, isConnected };
}

// Retry logic for Firestore operations
export async function retryFirestoreOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a connection error
      if (error.code === 'unavailable' || error.message?.includes('client is offline')) {
        console.log(`Firestore operation failed (attempt ${i + 1}/${maxRetries}), retrying...`);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        
        // Try to re-enable network
        try {
          await enableNetwork(db);
        } catch (e) {
          console.error('Failed to enable network:', e);
        }
      } else {
        // If it's not a connection error, throw immediately
        throw error;
      }
    }
  }
  
  throw lastError!;
}
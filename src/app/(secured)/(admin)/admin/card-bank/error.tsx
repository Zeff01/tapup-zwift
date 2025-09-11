'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Card Bank Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Something went wrong!</h2>
        <p className="mb-4 text-gray-600">
          Error loading card bank. This might be a permission issue.
        </p>
        <div className="mb-4 rounded bg-gray-100 p-4 text-left text-sm">
          <p className="font-mono text-xs">{error.message}</p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => window.location.href = '/dashboard'}
            variant="outline"
          >
            Go to Dashboard
          </Button>
          <Button onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
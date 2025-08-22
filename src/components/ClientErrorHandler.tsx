
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ClientErrorHandlerProps {
  error: Error | null;
  onRetry?: () => void;
  onReset?: () => void;
}

export function ClientErrorHandler({ error, onRetry, onReset }: ClientErrorHandlerProps) {
  if (!error) return null;

  const isPermissionError = error.message.includes('permission denied') || 
                           error.message.includes('RLS') ||
                           error.message.includes('unauthorized');

  const isNetworkError = error.message.includes('network') || 
                        error.message.includes('fetch');

  return (
    <div className="p-4">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>
          {isPermissionError ? 'Access Denied' : 
           isNetworkError ? 'Connection Error' : 
           'Error Occurred'}
        </AlertTitle>
        <AlertDescription className="mt-2">
          {isPermissionError ? 
            'You don\'t have permission to access this resource. Please make sure you\'re logged in.' :
           isNetworkError ?
            'Unable to connect to the server. Please check your internet connection.' :
            'An unexpected error occurred. Please try again.'}
        </AlertDescription>
        <div className="flex gap-2 mt-4">
          {onRetry && (
            <Button size="sm" onClick={onRetry}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          {onReset && (
            <Button size="sm" variant="outline" onClick={onReset}>
              Reset
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
}

import React, { createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DocumentTrackingContextType {
  trackDocumentEvent: (params: TrackEventParams) => Promise<void>;
  generateTrackingUrl: (params: GenerateTrackingUrlParams) => string;
  addTrackingPixel: (token: string, eventType: 'viewed' | 'receipt_viewed') => string;
}

interface TrackEventParams {
  token: string;
  eventType: 'viewed' | 'payment_link_clicked' | 'payment_received' | 'receipt_viewed';
  paymentInfo?: {
    amount?: number;
    method?: string;
    reference?: string;
  };
}

interface GenerateTrackingUrlParams {
  token: string;
  originalUrl: string;
  eventType: 'payment_link_clicked';
}

const DocumentTrackingContext = createContext<DocumentTrackingContextType | undefined>(undefined);

export function DocumentTrackingProvider({ children }: { children: ReactNode }) {
  const trackDocumentEvent = async (params: TrackEventParams) => {
    try {
      const { error } = await supabase.functions.invoke('track-document-event', {
        body: {
          ...params,
          clientInfo: {
            userAgent: navigator.userAgent,
            // Note: IP address will be captured server-side
          }
        }
      });

      if (error) {
        console.error('Failed to track document event:', error);
      }
    } catch (error) {
      console.error('Error tracking document event:', error);
    }
  };

  const generateTrackingUrl = (params: GenerateTrackingUrlParams): string => {
    const baseUrl = 'https://featherbiz.io';
    const trackingUrl = `${baseUrl}/api/track/${params.token}/${params.eventType}`;
    
    // Create a URL that tracks the click and then redirects
    return `${trackingUrl}?redirect=${encodeURIComponent(params.originalUrl)}`;
  };

  const addTrackingPixel = (token: string, eventType: 'viewed' | 'receipt_viewed'): string => {
    const baseUrl = 'https://featherbiz.io';
    return `${baseUrl}/api/track/${token}/${eventType}`;
  };

  const value = {
    trackDocumentEvent,
    generateTrackingUrl,
    addTrackingPixel
  };

  return (
    <DocumentTrackingContext.Provider value={value}>
      {children}
    </DocumentTrackingContext.Provider>
  );
}

export function useDocumentTracking() {
  const context = useContext(DocumentTrackingContext);
  if (context === undefined) {
    throw new Error('useDocumentTracking must be used within a DocumentTrackingProvider');
  }
  return context;
}

// Utility function to generate tracking URLs for email templates
export function generateEmailTrackingUrls(document: any, documentType: string) {
  if (!document.tracking_token) {
    console.warn('Document missing tracking token:', document.id);
    return {
      viewTrackingPixel: '',
      paymentTrackingUrl: '',
      receiptTrackingPixel: ''
    };
  }

  const baseUrl = 'https://featherbiz.io';
  const token = document.tracking_token;

  return {
    // 1x1 tracking pixel for email views
    viewTrackingPixel: `${baseUrl}/api/track/${token}/viewed`,
    
    // Tracked payment URL that logs click before redirecting to payment
    paymentTrackingUrl: `${baseUrl}/api/track/${token}/payment_link_clicked?redirect=${encodeURIComponent(getPaymentUrl(document, documentType))}`,
    
    // 1x1 tracking pixel for receipt views
    receiptTrackingPixel: `${baseUrl}/api/track/${token}/receipt_viewed`
  };
}

function getPaymentUrl(document: any, documentType: string): string {
  // Generate the actual payment URL based on document type and payment provider
  const baseUrl = 'https://featherbiz.io';
  return `${baseUrl}/payment/${documentType}/${document.id}`;
}
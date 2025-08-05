import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DocumentEvent {
  id: string;
  document_id: string;
  document_type: string;
  document_number: string;
  event_type: 'viewed' | 'payment_link_clicked' | 'payment_received' | 'receipt_viewed';
  client_email: string;
  client_name: string;
  client_ip?: string;
  user_agent?: string;
  amount?: number;
  payment_method?: string;
  payment_reference?: string;
  tracking_token: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export function useDocumentEvents(documentId?: string) {
  return useQuery({
    queryKey: ['document-events', documentId],
    queryFn: async (): Promise<DocumentEvent[]> => {
      if (!documentId) return [];
      
      const { data, error } = await supabase
        .from('document_events')
        .select('*')
        .eq('document_id', documentId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching document events:', error);
        throw error;
      }

      return data || [];
    },
    enabled: !!documentId
  });
}

export function useAllDocumentEvents() {
  return useQuery({
    queryKey: ['all-document-events'],
    queryFn: async (): Promise<DocumentEvent[]> => {
      const { data, error } = await supabase
        .from('document_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching all document events:', error);
        throw error;
      }

      return data || [];
    }
  });
}

// Hook to get event stats for a document
export function useDocumentEventStats(documentId?: string) {
  return useQuery({
    queryKey: ['document-event-stats', documentId],
    queryFn: async () => {
      if (!documentId) return null;
      
      const { data, error } = await supabase
        .from('document_events')
        .select('event_type, created_at')
        .eq('document_id', documentId);

      if (error) {
        console.error('Error fetching document event stats:', error);
        throw error;
      }

      const events = data || [];
      
      return {
        totalEvents: events.length,
        viewed: events.filter(e => e.event_type === 'viewed').length,
        paymentLinkClicked: events.filter(e => e.event_type === 'payment_link_clicked').length,
        paymentReceived: events.filter(e => e.event_type === 'payment_received').length,
        receiptViewed: events.filter(e => e.event_type === 'receipt_viewed').length,
        lastActivity: events.length > 0 ? events[0].created_at : null
      };
    },
    enabled: !!documentId
  });
}
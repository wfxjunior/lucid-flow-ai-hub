import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { 
  Eye, 
  CreditCard, 
  CheckCircle, 
  Receipt, 
  Clock,
  User,
  DollarSign
} from 'lucide-react';

interface DocumentEvent {
  id: string;
  event_type: string;
  client_name: string;
  client_email: string;
  amount?: number;
  payment_method?: string;
  payment_reference?: string;
  created_at: string;
  metadata?: any;
}

interface DocumentEventTimelineProps {
  documentId: string;
  documentType: string;
}

export function DocumentEventTimeline({ documentId, documentType }: DocumentEventTimelineProps) {
  const [events, setEvents] = useState<DocumentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [documentId]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('document_events')
        .select('*')
        .eq('document_id', documentId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching document events:', error);
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching document events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'viewed':
        return <Eye className="h-4 w-4" />;
      case 'payment_link_clicked':
        return <CreditCard className="h-4 w-4" />;
      case 'payment_received':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'receipt_viewed':
        return <Receipt className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'viewed':
        return 'bg-blue-500';
      case 'payment_link_clicked':
        return 'bg-yellow-500';
      case 'payment_received':
        return 'bg-green-500';
      case 'receipt_viewed':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getEventLabel = (eventType: string) => {
    switch (eventType) {
      case 'viewed':
        return 'Document Viewed';
      case 'payment_link_clicked':
        return 'Payment Link Clicked';
      case 'payment_received':
        return 'Payment Received';
      case 'receipt_viewed':
        return 'Receipt Viewed';
      default:
        return eventType.replace('_', ' ').toUpperCase();
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No client activity recorded yet
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex items-start gap-4">
              {/* Timeline dot */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full ${getEventColor(event.event_type)} flex items-center justify-center text-white`}>
                  {getEventIcon(event.event_type)}
                </div>
                {index < events.length - 1 && (
                  <div className="w-px h-12 bg-border mt-2" />
                )}
              </div>

              {/* Event content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary">
                    {getEventLabel(event.event_type)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(event.created_at), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <User className="h-3 w-3" />
                  <span>{event.client_name}</span>
                  <span className="text-xs">({event.client_email})</span>
                </div>

                {event.event_type === 'payment_received' && (
                  <div className="flex items-center gap-4 text-sm">
                    {event.amount && (
                      <div className="flex items-center gap-1 text-green-600">
                        <DollarSign className="h-3 w-3" />
                        <span className="font-medium">${event.amount}</span>
                      </div>
                    )}
                    {event.payment_method && (
                      <Badge variant="outline">
                        {event.payment_method}
                      </Badge>
                    )}
                    {event.payment_reference && (
                      <span className="text-xs text-muted-foreground">
                        Ref: {event.payment_reference}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
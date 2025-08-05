import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useDocumentEventStats } from '@/hooks/useDocumentEvents';
import { Eye, CreditCard, CheckCircle, Receipt } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DocumentEventsBadgeProps {
  documentId: string;
  compact?: boolean;
}

export function DocumentEventsBadge({ documentId, compact = false }: DocumentEventsBadgeProps) {
  const { data: stats, isLoading } = useDocumentEventStats(documentId);

  if (isLoading || !stats || stats.totalEvents === 0) {
    return null;
  }

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Badge variant="secondary" className="text-xs">
              {stats.totalEvents} events
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1 text-xs">
              {stats.viewed > 0 && (
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>Viewed {stats.viewed}x</span>
                </div>
              )}
              {stats.paymentLinkClicked > 0 && (
                <div className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  <span>Payment clicked {stats.paymentLinkClicked}x</span>
                </div>
              )}
              {stats.paymentReceived > 0 && (
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Paid {stats.paymentReceived}x</span>
                </div>
              )}
              {stats.receiptViewed > 0 && (
                <div className="flex items-center gap-1">
                  <Receipt className="h-3 w-3" />
                  <span>Receipt viewed {stats.receiptViewed}x</span>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {stats.viewed > 0 && (
        <Badge variant="outline" className="text-xs">
          <Eye className="h-3 w-3 mr-1" />
          {stats.viewed}
        </Badge>
      )}
      {stats.paymentLinkClicked > 0 && (
        <Badge variant="outline" className="text-xs">
          <CreditCard className="h-3 w-3 mr-1" />
          {stats.paymentLinkClicked}
        </Badge>
      )}
      {stats.paymentReceived > 0 && (
        <Badge variant="outline" className="text-xs text-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          {stats.paymentReceived}
        </Badge>
      )}
      {stats.receiptViewed > 0 && (
        <Badge variant="outline" className="text-xs">
          <Receipt className="h-3 w-3 mr-1" />
          {stats.receiptViewed}
        </Badge>
      )}
    </div>
  );
}
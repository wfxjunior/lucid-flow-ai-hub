
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";
import { Settings, RefreshCw, AlertCircle, Crown, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SubscriptionStatusProps {
  onNavigate?: (view: string) => void;
}

export const SubscriptionStatus = ({ onNavigate }: SubscriptionStatusProps) => {
  const { subscription, loading, checkSubscription, openCustomerPortal, isSubscribed, planName } = useSubscription();
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
          <CardDescription>Loading subscription information...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await checkSubscription();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleUpgrade = () => {
    console.log('Upgrade button clicked - navigating to pricing');
    
    // Use the onNavigate prop if available (for internal routing)
    if (onNavigate) {
      onNavigate('pricing');
    } else {
      // Fallback to external navigation
      navigate('/#pricing');
      
      // If we're already on a single page, try to scroll to pricing
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          // If no pricing section found, navigate to the landing page
          window.location.href = '/#pricing';
        }
      }, 100);
    }
  };

  const getStatusIcon = () => {
    if (isSubscribed) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else {
      return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    return isSubscribed ? "default" : "secondary";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {getStatusIcon()}
            Subscription Status
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
        <CardDescription>
          Manage your FeatherBiz subscription and billing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Current Plan:</span>
          <Badge variant={getStatusColor()} className="flex items-center gap-1">
            {isSubscribed && <Crown className="h-3 w-3" />}
            {planName}
          </Badge>
        </div>
        
        {subscription?.current_period_end && (
          <div className="flex items-center justify-between">
            <span className="font-medium">Renewal Date:</span>
            <span className="text-sm text-muted-foreground">
              {formatDate(subscription.current_period_end)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="font-medium">Status:</span>
          <Badge variant={getStatusColor()}>
            {isSubscribed ? "Active" : "Free Plan"}
          </Badge>
        </div>

        {!isSubscribed && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 text-center">
                <p className="font-medium text-blue-900 mb-1">Free Plan Active</p>
                <p className="text-blue-700 text-sm mb-3">
                  You're currently using the free plan with limited features. Upgrade to Professional to unlock:
                </p>
                <ul className="text-blue-700 text-sm space-y-1 mb-4 text-left">
                  <li>• Unlimited invoices and estimates</li>
                  <li>• AI voice assistant</li>
                  <li>• Advanced analytics</li>
                  <li>• Priority support</li>
                </ul>
                <div className="flex justify-center">
                  <Button
                    onClick={handleUpgrade}
                    className="w-full max-w-xs mx-auto"
                    size="sm"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade to Professional
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isSubscribed && (
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-800 font-medium">Premium Active</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                You have access to all premium features and priority support.
              </p>
            </div>
            
            <Button
              onClick={openCustomerPortal}
              className="w-full"
              variant="outline"
            >
              <Settings className="mr-2 h-4 w-4" />
              Manage Subscription
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

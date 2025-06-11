
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";
import { Settings, RefreshCw, AlertCircle, Crown } from "lucide-react";

interface SubscriptionStatusProps {
  onNavigate?: (view: string) => void;
}

export const SubscriptionStatus = ({ onNavigate }: SubscriptionStatusProps) => {
  const { subscription, loading, checkSubscription, openCustomerPortal, isSubscribed, planName } = useSubscription();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Status</CardTitle>
          <CardDescription>Loading...</CardDescription>
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

  const handleUpgrade = () => {
    if (onNavigate) {
      onNavigate('pricing');
    } else {
      // Fallback to window location if onNavigate is not available
      window.location.href = '/';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Subscription Status
          <Button
            variant="outline"
            size="sm"
            onClick={checkSubscription}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          Manage your FeatherBiz subscription
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Current Plan:</span>
          <Badge variant={isSubscribed ? "default" : "secondary"}>
            {planName}
          </Badge>
        </div>
        
        {subscription?.current_period_end && (
          <div className="flex items-center justify-between">
            <span>Renewal:</span>
            <span className="text-sm text-muted-foreground">
              {formatDate(subscription.current_period_end)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span>Status:</span>
          <Badge variant={isSubscribed ? "default" : "secondary"}>
            {isSubscribed ? "Active" : "Free Plan"}
          </Badge>
        </div>

        {!isSubscribed && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Free Plan Active</p>
                <p className="text-blue-700">You're currently using the free plan. Upgrade to access premium features.</p>
              </div>
            </div>
            <Button
              onClick={handleUpgrade}
              className="w-full mt-3"
              size="sm"
            >
              <Crown className="mr-2 h-4 w-4" />
              Upgrade to Premium
            </Button>
          </div>
        )}

        {isSubscribed && (
          <Button
            onClick={openCustomerPortal}
            className="w-full"
            variant="outline"
          >
            <Settings className="mr-2 h-4 w-4" />
            Manage Subscription
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

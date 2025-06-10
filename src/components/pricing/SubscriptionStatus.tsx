
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";
import { Settings, RefreshCw } from "lucide-react";

export const SubscriptionStatus = () => {
  const { subscription, loading, checkSubscription, openCustomerPortal, isSubscribed, planName } = useSubscription();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status da Assinatura</CardTitle>
          <CardDescription>Carregando...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Status da Assinatura
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
          Gerencie sua assinatura do FeatherBiz
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Plano Atual:</span>
          <Badge variant={isSubscribed ? "default" : "secondary"}>
            {planName}
          </Badge>
        </div>
        
        {subscription?.current_period_end && (
          <div className="flex items-center justify-between">
            <span>Renovação:</span>
            <span className="text-sm text-muted-foreground">
              {formatDate(subscription.current_period_end)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span>Status:</span>
          <Badge variant={isSubscribed ? "default" : "secondary"}>
            {isSubscribed ? "Ativo" : "Inativo"}
          </Badge>
        </div>

        {isSubscribed && (
          <Button
            onClick={openCustomerPortal}
            className="w-full"
            variant="outline"
          >
            <Settings className="mr-2 h-4 w-4" />
            Gerenciar Assinatura
          </Button>
        )}
      </CardContent>
    </Card>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: string;
    period: string;
    originalPrice?: string;
    savings?: string;
    icon: any;
    features: string[];
    buttonText: string;
    popular: boolean;
    color: string;
    bgGradient: string;
    stripePrice?: number | null;
    recurring?: boolean;
  };
  onPlanSelect: (plan: any) => void;
  loading?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onPlanSelect, loading = false }) => {
  const Icon = plan.icon;
  
  return (
    <Card 
      className={`relative h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        plan.popular 
          ? 'border-primary shadow-lg ring-1 ring-primary/20' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground font-medium px-3 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.bgGradient} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 text-${plan.color}-600`} />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
            <CardDescription className="text-sm">{plan.description}</CardDescription>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-foreground">{plan.price}</span>
            {plan.period && (
              <span className="text-sm text-muted-foreground">/ {plan.period}</span>
            )}
          </div>
          
          {plan.originalPrice && plan.savings && (
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}/mo</span>
              <Badge variant="secondary" className="text-xs font-medium text-green-700 bg-green-100">
                {plan.savings}
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Button
          onClick={() => onPlanSelect(plan)}
          disabled={loading}
          className={`w-full ${
            plan.popular
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          {loading ? 'Loading...' : plan.buttonText}
        </Button>
        
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

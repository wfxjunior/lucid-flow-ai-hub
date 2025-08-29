
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: string;
    period: string;
    originalPrice?: string;
    savings?: string;
    features: string[];
    buttonText: string;
    popular: boolean;
    stripePrice?: number | null;
    recurring?: boolean;
  };
  onPlanSelect: (plan: any) => void;
  loading?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onPlanSelect, loading = false }) => {
  return (
    <Card 
      className={`relative h-full transition-all duration-300 hover:border-slate-300 bg-white rounded-[10px] ${
        plan.popular 
          ? 'border-[#C7D2FE] shadow-[0_0_0_1px_#C7D2FE,inset_0_1px_0_#E0E7FF]' 
          : 'border-slate-200'
      }`}
    >
      <CardHeader className="p-7 pb-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
          <p className="text-sm text-slate-500">{plan.description}</p>
        </div>
        
        <div className="mt-6">
          <div className="flex items-baseline space-x-1 justify-center sm:justify-start">
            <span className="text-3xl font-semibold text-slate-900 tracking-tight">{plan.price}</span>
            {plan.period && (
              <span className="text-sm text-slate-500">/{plan.period.replace('per ', '').replace(' billed annually', '')}</span>
            )}
          </div>
          
          {plan.period.includes('billed annually') && (
            <p className="text-xs text-slate-500 mt-1 text-center sm:text-left">Billed annually</p>
          )}
          
          {plan.originalPrice && plan.savings && (
            <div className="flex items-center space-x-2 mt-2 justify-center sm:justify-start">
              <span className="text-sm text-slate-400 line-through">{plan.originalPrice}/mo</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                {plan.savings}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-7 pt-0 space-y-6">
        <Button
          onClick={() => onPlanSelect(plan)}
          disabled={loading}
          className={`w-full h-11 rounded-lg font-medium transition-colors duration-200 ${
            plan.popular
              ? 'bg-slate-900 hover:bg-slate-800 text-white'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400'
          }`}
        >
          {loading ? 'Loading...' : plan.buttonText}
        </Button>
        
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <span className="text-sm text-slate-600 leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

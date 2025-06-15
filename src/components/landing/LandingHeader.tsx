
import React from "react";
import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="w-full border-b shadow-sm bg-white/90 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Feather size={28} className="text-blue-700" strokeWidth={2.1} />
          <span className="ml-1 text-xl font-bold text-blue-800 tracking-tight">FeatherBiz</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-blue-100 text-blue-800 font-medium px-5"
            onClick={() => navigate('/auth')}
          >
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
};


import React from 'react';

interface MainContentProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function MainContent({ activeView, onNavigate }: MainContentProps) {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">Main Content</h1>
      <p className="text-muted-foreground">Current view: {activeView}</p>
    </div>
  );
}

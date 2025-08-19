
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Bem-vindo ao FeatherBiz
        </h1>
        <p className="text-lg text-gray-600">
          Escolha para onde deseja ir:
        </p>
        <div className="flex gap-4">
          <Link to="/landing">
            <Button size="lg">
              Ver Landing Page
            </Button>
          </Link>
          <Link to="/pricing">
            <Button variant="outline" size="lg">
              Ver Preços
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;

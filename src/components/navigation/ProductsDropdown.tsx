
import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProductsMegaMenu } from './ProductsMegaMenu';

export const ProductsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={triggerRef}
        className="flex items-center gap-1 text-base font-medium text-[#111827] hover:text-[#111827]/90 focus:text-[#111827] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        Products
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <ProductsMegaMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
      />
    </>
  );
};

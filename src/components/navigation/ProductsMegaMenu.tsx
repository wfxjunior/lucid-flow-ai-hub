
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ProductItem {
  id: string;
  title: string;
  route: string;
  description: string;
  preview: {
    title: string;
    description: string;
    badge?: string;
  };
}

const products: ProductItem[] = [
  {
    id: 'ai-voice',
    title: 'AI Voice',
    route: '/features/ai-voice',
    description: 'Turn calls into actions with AI',
    preview: {
      title: 'AI Voice Assistant',
      description: 'Transform phone calls into actionable tasks and insights with our advanced AI voice processing.',
      badge: 'New'
    }
  },
  {
    id: 'invoices',
    title: 'Invoices',
    route: '/features/invoices',
    description: 'Professional billing system',
    preview: {
      title: 'Smart Invoicing',
      description: 'Create, send, and track professional invoices with automated reminders and payment processing.'
    }
  },
  {
    id: 'estimates',
    title: 'Estimates',
    route: '/features/estimates',
    description: 'Faster quotes, fewer errors',
    preview: {
      title: 'Accurate Estimates',
      description: 'Generate detailed project estimates and quotes that convert to invoices with one click.'
    }
  },
  {
    id: 'easycalc',
    title: 'EasyCalc',
    route: '/features/easycalc',
    description: 'Smart pricing calculator',
    preview: {
      title: 'Pricing Calculator',
      description: 'Calculate margins, markups, and project costs with built-in business math tools.'
    }
  },
  {
    id: 'pipeline',
    title: 'Pipeline',
    route: '/features/pipeline',
    description: 'Manage your sales funnel',
    preview: {
      title: 'Sales Pipeline',
      description: 'Track leads through your sales process with visual pipeline management and forecasting.'
    }
  },
  {
    id: 'feathertax',
    title: 'FeatherTax',
    route: '/features/feathertax',
    description: 'Tax management made easy',
    preview: {
      title: 'Tax Management',
      description: 'Stay on top of tax obligations with automated tracking, receipt storage, and deadline alerts.'
    }
  },
  {
    id: 'work-orders',
    title: 'Work Orders',
    route: '/features/work-orders',
    description: 'Streamline operations',
    preview: {
      title: 'Work Order Management',
      description: 'Create, assign, and track work orders with real-time status updates and team coordination.'
    }
  }
];

// Monochrome SVG Icons
const ProductIcon: React.FC<{ productId: string; className?: string }> = ({ productId, className = "h-5 w-5 text-slate-700" }) => {
  const icons = {
    'ai-voice': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3v8a3 3 0 1 1-6 0V9"/>
        <path d="M18 11a6 6 0 0 1-12 0"/>
        <path d="M12 19v2"/>
        <path d="M3 12c2-1 3 1 5 0s3-2 5-1 3 2 5 1"/>
      </svg>
    ),
    'invoices': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 3h8l4 4v14H6z"/>
        <path d="M14 3v4h4"/>
        <path d="M8 11h8M8 15h8"/>
      </svg>
    ),
    'estimates': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 3h8l4 4v14H6z"/>
        <path d="M14 3v4h4"/>
        <path d="M8 12h6"/>
        <path d="M8 16h4"/>
        <path d="M17 12l3 3-3 3-3-3 3-3z"/>
      </svg>
    ),
    'easycalc': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="6" y="3" width="12" height="18" rx="2"/>
        <path d="M8 8h8M9 13h.01M12 13h.01M15 13h.01M9 16h.01M12 16h.01M15 16h.01"/>
      </svg>
    ),
    'pipeline': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="5" width="4" height="14" rx="1"/>
        <rect x="10" y="5" width="4" height="9" rx="1"/>
        <rect x="16" y="5" width="4" height="6" rx="1"/>
      </svg>
    ),
    'feathertax': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 4h11a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2V4z"/>
        <path d="M6 8h13M10 12h6M10 16h6"/>
      </svg>
    ),
    'work-orders': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="6" cy="6" r="2.5"/>
        <circle cx="18" cy="6" r="2.5"/>
        <circle cx="12" cy="18" r="2.5"/>
        <path d="M8.5 7.5L10.5 16M15.5 7.5L13.5 16"/>
      </svg>
    )
  };

  return icons[productId as keyof typeof icons] || null;
};

interface ProductsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export const ProductsMegaMenu: React.FC<ProductsMegaMenuProps> = ({ isOpen, onClose, triggerRef }) => {
  const [activeProduct, setActiveProduct] = useState<string>(products[0].id);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const activeProductData = products.find(p => p.id === activeProduct) || products[0];

  // Calculate position relative to logo - match Resources menu positioning
  useEffect(() => {
    if (isOpen && menuRef.current && triggerRef.current) {
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      const logo = document.querySelector('[aria-label="FeatherBiz home"]') as HTMLElement;
      
      if (logo) {
        const logoRect = logo.getBoundingClientRect();
        const triggerRect = trigger.getBoundingClientRect();
        
        // Position menu aligned with logo left edge
        menu.style.left = `${logoRect.left}px`;
        menu.style.top = `${triggerRect.bottom + 8}px`;
        menu.style.width = '720px';
        menu.style.maxWidth = `calc(100vw - ${logoRect.left + 32}px)`;
      }
    }
  }, [isOpen, triggerRef]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = Math.min(focusedIndex + 1, products.length - 1);
          setFocusedIndex(nextIndex);
          setActiveProduct(products[nextIndex].id);
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = Math.max(focusedIndex - 1, 0);
          setFocusedIndex(prevIndex);
          setActiveProduct(products[prevIndex].id);
          break;
        case 'Enter':
          e.preventDefault();
          window.location.href = products[focusedIndex].route;
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, focusedIndex, onClose]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target as Node) && 
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose, triggerRef]);

  // Prefetch routes when menu opens
  useEffect(() => {
    if (isOpen) {
      products.forEach(product => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = product.route;
        document.head.appendChild(link);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div className="fixed inset-0 bg-black/5 z-40 lg:hidden" onClick={onClose} />
      
      {/* Menu */}
      <div
        ref={menuRef}
        className="fixed z-50 bg-white border border-[#E5E7EB] rounded-xl shadow-md p-6"
        style={{ position: 'fixed' }}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Left Column - Product List */}
          <div className="space-y-1">
            <ul ref={listRef} className="space-y-1" role="none">
              {products.map((product, index) => (
                <li key={product.id} role="none">
                  <Link
                    to={product.route}
                    className={`flex items-start gap-3 rounded-lg p-3 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-3 ${
                      activeProduct === product.id || focusedIndex === index
                        ? 'bg-[#F8FAFC] text-[#111827]'
                        : 'text-[#374151] hover:bg-[#F8FAFC] hover:text-[#111827]'
                    }`}
                    onMouseEnter={() => {
                      setActiveProduct(product.id);
                      setFocusedIndex(index);
                    }}
                    onFocus={() => {
                      setActiveProduct(product.id);
                      setFocusedIndex(index);
                    }}
                    role="menuitem"
                    aria-selected={activeProduct === product.id}
                  >
                    <ProductIcon 
                      productId={product.id} 
                      className={`h-5 w-5 mt-0.5 transition-colors ${
                        activeProduct === product.id || focusedIndex === index
                          ? 'text-slate-900'
                          : 'text-slate-700 group-hover:text-slate-900'
                      }`}
                    />
                    <div>
                      <div className="font-medium text-sm mb-1">{product.title}</div>
                      <div className="text-xs text-[#6B7280]">{product.description}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Preview Panel */}
          <div className="hidden lg:block space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-[#111827]">
                  {activeProductData.preview.title}
                </h3>
                {activeProductData.preview.badge && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                    {activeProductData.preview.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {activeProductData.preview.description}
              </p>
            </div>

            {/* Demo Card Placeholder */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-6 h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#E5E7EB] rounded-lg mx-auto mb-2"></div>
                <div className="text-xs text-[#6B7280]">Preview available in demo</div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="flex gap-4 pt-3 border-t border-[#E5E7EB]">
              <Link
                to="/guides/getting-started"
                className="text-xs text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                FeatherBiz 101
              </Link>
              <Link
                to="/changelog"
                className="text-xs text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                What's New
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

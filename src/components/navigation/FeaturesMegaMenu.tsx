
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface FeatureItem {
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

const features: FeatureItem[] = [
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

interface FeaturesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export const FeaturesMegaMenu: React.FC<FeaturesMegaMenuProps> = ({ isOpen, onClose, triggerRef }) => {
  const [activeFeature, setActiveFeature] = useState<string>(features[0].id);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const activeFeatureData = features.find(f => f.id === activeFeature) || features[0];

  // Calculate position relative to logo
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
        menu.style.width = '1160px';
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
          const nextIndex = Math.min(focusedIndex + 1, features.length - 1);
          setFocusedIndex(nextIndex);
          setActiveFeature(features[nextIndex].id);
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = Math.max(focusedIndex - 1, 0);
          setFocusedIndex(prevIndex);
          setActiveFeature(features[prevIndex].id);
          break;
        case 'Enter':
          e.preventDefault();
          window.location.href = features[focusedIndex].route;
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div className="fixed inset-0 bg-black/5 z-40 lg:hidden" onClick={onClose} />
      
      {/* Menu */}
      <div
        ref={menuRef}
        className="fixed z-50 bg-white border border-[#E5E7EB] rounded-xl shadow-[0_12px_32px_rgba(15,23,42,0.12)] p-8"
        style={{ position: 'fixed' }}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Left Column - Feature List */}
          <div className="space-y-1">
            <ul ref={listRef} className="space-y-1" role="none">
              {features.map((feature, index) => (
                <li key={feature.id} role="none">
                  <Link
                    to={feature.route}
                    className={`block px-4 py-3 rounded-lg transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      activeFeature === feature.id || focusedIndex === index
                        ? 'bg-[#F8FAFC] text-[#111827]'
                        : 'text-[#374151] hover:bg-[#F8FAFC] hover:text-[#111827]'
                    }`}
                    onMouseEnter={() => {
                      setActiveFeature(feature.id);
                      setFocusedIndex(index);
                    }}
                    onFocus={() => {
                      setActiveFeature(feature.id);
                      setFocusedIndex(index);
                    }}
                    role="menuitem"
                    aria-selected={activeFeature === feature.id}
                  >
                    <div className="font-medium text-base mb-1">{feature.title}</div>
                    <div className="text-sm text-[#6B7280]">{feature.description}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Preview Panel */}
          <div className="hidden lg:block space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-[#111827]">
                  {activeFeatureData.preview.title}
                </h3>
                {activeFeatureData.preview.badge && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                    {activeFeatureData.preview.badge}
                  </span>
                )}
              </div>
              <p className="text-[#6B7280] leading-relaxed">
                {activeFeatureData.preview.description}
              </p>
            </div>

            {/* Demo Card Placeholder */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-6 h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#E5E7EB] rounded-lg mx-auto mb-3"></div>
                <div className="text-sm text-[#6B7280]">Preview available in demo</div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex gap-4 pt-4 border-t border-[#E5E7EB]">
              <Link
                to="/guides/getting-started"
                className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
              >
                FeatherBiz 101
              </Link>
              <Link
                to="/changelog"
                className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
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

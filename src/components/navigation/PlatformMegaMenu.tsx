
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface PlatformSection {
  title: string;
  items: {
    id: string;
    title: string;
    route: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const platformSections: PlatformSection[] = [
  {
    title: "CRM PLATFORM",
    items: [
      {
        id: 'data-model',
        title: 'Data model',
        route: '/platform/data-model',
        description: 'Sync and enrich your data',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5 text-slate-700">
            <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
            <path d="M9 9h6v6H9z"/>
          </svg>
        )
      },
      {
        id: 'ai-native',
        title: 'AI',
        route: '/platform/ai',
        description: 'Native to your CRM',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5 text-slate-700">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
          </svg>
        )
      },
      {
        id: 'productivity',
        title: 'Productivity & collaboration',
        route: '/platform/productivity',
        description: 'Context for your team operations',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5 text-slate-700">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )
      },
      {
        id: 'integrations',
        title: 'Apps & integrations',
        route: '/platform/integrations',
        description: 'Connect all your favorite tools',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5 text-slate-700">
            <rect x="3" y="3" width="6" height="6" rx="1"/>
            <rect x="15" y="3" width="6" height="6" rx="1"/>
            <rect x="3" y="15" width="6" height="6" rx="1"/>
            <rect x="15" y="15" width="6" height="6" rx="1"/>
          </svg>
        )
      }
    ]
  },
  {
    title: "AUTOMATIONS",
    items: [
      {
        id: 'workflows',
        title: 'Workflows',
        route: '/platform/workflows',
        description: 'Automate any process',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5 text-slate-700">
            <path d="M3 12h18m-9-9l9 9-9 9"/>
          </svg>
        )
      },
      {
        id: 'sequences',
        title: 'Sequences',
        route: '/platform/sequences',
        description: 'Personalized outreach',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5 text-slate-700">
            <path d="M7 7h10v10H7z"/>
            <path d="M3 3h4v4H3z"/>
            <path d="M17 17h4v4h-4z"/>
          </svg>
        )
      }
    ]
  },
  {
    title: "INSIGHTS",
    items: [
      {
        id: 'call-intelligence',
        title: 'Call intelligence',
        route: '/platform/call-intelligence',
        description: 'Record and analyze meetings',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5 text-slate-700">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
        )
      },
      {
        id: 'reporting',
        title: 'Reporting',
        route: '/platform/reporting',
        description: 'Insights in real time',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5 text-slate-700">
            <path d="M3 3v18h18"/>
            <path d="M18 17V9"/>
            <path d="M13 17V5"/>
            <path d="M8 17v-3"/>
          </svg>
        )
      }
    ]
  }
];

interface PlatformMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export const PlatformMegaMenu: React.FC<PlatformMegaMenuProps> = ({ isOpen, onClose, triggerRef }) => {
  const menuRef = useRef<HTMLDivElement>(null);

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
        menu.style.width = '800px';
        menu.style.maxWidth = `calc(100vw - ${logoRect.left + 32}px)`;
      }
    }
  }, [isOpen, triggerRef]);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div className="fixed inset-0 bg-black/5 z-40 lg:hidden" onClick={onClose} />
      
      {/* Menu */}
      <div
        ref={menuRef}
        className="fixed z-50 bg-white border border-[#E5E7EB] rounded-xl shadow-md p-8"
        style={{ position: 'fixed' }}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="space-y-8">
          {platformSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    to={item.route}
                    className="flex items-start gap-3 rounded-lg p-4 transition-colors text-left hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    role="menuitem"
                  >
                    <div className="mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-[#111827] mb-1">{item.title}</div>
                      <div className="text-sm text-[#6B7280]">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="flex gap-6 pt-6 mt-8 border-t border-[#E5E7EB]">
          <Link
            to="/platform/documentation"
            className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            Platform Documentation
          </Link>
          <Link
            to="/platform/api"
            className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            API Reference
          </Link>
        </div>
      </div>
    </>
  );
};

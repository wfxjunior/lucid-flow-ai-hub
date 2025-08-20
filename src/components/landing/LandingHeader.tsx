import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu, BookText, Compass, GraduationCap, Layers, Workflow, FileCode2, Code2, History, Activity, Users, Mail } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ProductsDropdown } from "@/components/navigation/ProductsDropdown";
import navglyphsUrl from "@/assets/navglyphs.svg";
import { WhatsNewCard } from "./WhatsNewCard";
import { track } from "@/lib/analytics";
import { useSubscription } from "@/hooks/useSubscription";

// Helper: inline SVG symbol use
const NavGlyph = ({ name, className = "", size = 24 }: { name: string; className?: string; size?: number }) => (
  <svg
    aria-hidden="true"
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <use href={`${navglyphsUrl}#glyph-${name}`} />
  </svg>
);

const features = [
  { key: "ai-voice", icon: "voices", title: "AI Voice", desc: "Turn calls into actions" },
  { key: "invoices", icon: "estimates", title: "Invoices", desc: "Professional billing system" },
  { key: "estimates", icon: "estimates", title: "Estimates", desc: "Faster quotes, fewer errors" },
  { key: "easy-calc", icon: "ai-calc", title: "EasyCalc", desc: "Smart pricing calculator" },
  { key: "pipeline", icon: "assignments", title: "Pipeline", desc: "Manage your sales funnel" },
  { key: "feather-tax", icon: "reporting", title: "FeatherTax", desc: "Tax management made easy" },
  { key: "work-orders", icon: "automations", title: "Work Orders", desc: "Streamline operations" },
];

const resourcesItems = [
  // Learn & Support
  { 
    key: "help-center", 
    icon: BookText, 
    title: "Help Center / Docs", 
    desc: "Documentation and guides",
    href: "/docs",
    section: "Learn & Support"
  },
  { 
    key: "getting-started", 
    icon: Compass, 
    title: "FeatherBiz 101", 
    desc: "Getting started guide",
    href: "/docs/getting-started",
    section: "Learn & Support"
  },
  { 
    key: "academy", 
    icon: GraduationCap, 
    title: "Academy / Tutorials", 
    desc: "Video tutorials and courses",
    href: "/academy",
    section: "Learn & Support"
  },
  { 
    key: "templates", 
    icon: Layers, 
    title: "Templates Library", 
    desc: "Quotes, invoices, contracts",
    href: "/templates",
    section: "Learn & Support"
  },
  { 
    key: "playbooks", 
    icon: Workflow, 
    title: "Best Practices & Playbooks", 
    desc: "Business process guides",
    href: "/playbooks",
    section: "Learn & Support"
  },
  // Developers
  { 
    key: "api-docs", 
    icon: FileCode2, 
    title: "API & Webhooks", 
    desc: "Developer documentation",
    href: "/developers/api",
    section: "Developers"
  },
  { 
    key: "github", 
    icon: Code2, 
    title: "SDKs & Examples", 
    desc: "GitHub repositories",
    href: "https://github.com/featherbiz",
    external: true,
    section: "Developers"
  },
  // Updates & Status
  { 
    key: "changelog", 
    icon: History, 
    title: "Changelog / What's New", 
    desc: "Latest product updates",
    href: "/changelog",
    section: "Updates & Status"
  },
  { 
    key: "status", 
    icon: Activity, 
    title: "System Status", 
    desc: "Service availability",
    href: "https://status.featherbiz.io",
    external: true,
    section: "Updates & Status"
  },
  // Community & Help
  { 
    key: "community", 
    icon: Users, 
    title: "Community", 
    desc: "Forum and Discord",
    href: "/community",
    section: "Community & Help"
  },
  { 
    key: "support", 
    icon: Mail, 
    title: "Contact Support", 
    desc: "Get help from our team",
    href: "/support",
    section: "Community & Help"
  },
];

export const LandingHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locale = typeof navigator !== "undefined" ? navigator.language : "en";

  const { isSubscribed, openCustomerPortal } = useSubscription();

  const onPricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isLanding = location.pathname === '/landing' || location.pathname === '/';
    if (isLanding) {
      e.preventDefault();
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Lazy render toggles for right column
  const [resourcesReady, setResourcesReady] = useState(false);

  const handleOpen = (menuId: string) => {
    track('nav_megamenu_open', { menu_id: menuId, locale });
    if (menuId === 'header_megamenu_resources') setResourcesReady(true);
  };

  const ResourcesItem = ({ item, menuId }: { item: typeof resourcesItems[number]; menuId: string }) => {
    const IconComponent = item.icon;
    
    const handleClick = () => {
      track('nav_megamenu_click', { menu_id: menuId, item_key: item.key, locale });
    };

    const linkProps = item.external 
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Link
        to={item.href}
        onClick={handleClick}
        className="flex items-start gap-3 rounded-md p-3 hover:bg-accent hover:text-accent-foreground text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 no-underline"
        aria-label={`${item.title} — ${item.desc}`}
        {...linkProps}
      >
        <IconComponent className="shrink-0 text-foreground/80" size={22} strokeWidth={1.5} />
        <span>
          <span className="block text-sm font-semibold">{item.title}</span>
          <span className="block text-xs text-muted-foreground">{item.desc}</span>
        </span>
      </Link>
    );
  };

  const RightColumn = ({ menuId, ready }: { menuId: 'header_megamenu_platform'|'header_megamenu_resources'; ready: boolean }) => {
    // For Platform menu, show only FeatherBiz 101 CTA
    if (menuId === 'header_megamenu_platform') {
      return (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-2" aria-label="Get started">
            <button
              type="button"
              onClick={() => track('nav_megamenu_click', { menu_id: menuId, item_key: 'get-started-101', locale })}
              className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="FeatherBiz 101"
            >
              <NavGlyph name="work" className="text-foreground/80" size={20} />
              <span className="text-sm">FeatherBiz 101</span>
            </button>
          </div>
          {ready && (
            <div onPointerEnter={() => track('nav_whatsnew_view', { menu_id: menuId, locale })}>
              <WhatsNewCard menuId={menuId} locale={locale} />
            </div>
          )}
        </div>
      );
    }

    // For Resources menu, only show FeatherBiz 101 CTA
    return (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-1 gap-2" aria-label="Get started">
          <Link
            to="/docs/getting-started"
            onClick={() => track('nav_megamenu_click', { menu_id: menuId, item_key: 'featherbiz-101-cta', locale })}
            className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 no-underline"
            aria-label="FeatherBiz 101 - Getting Started"
          >
            <Compass className="text-foreground/80" size={20} strokeWidth={1.5} />
            <span className="text-sm font-medium">FeatherBiz 101</span>
          </Link>
        </div>
        {ready && (
          <div onPointerEnter={() => track('nav_whatsnew_view', { menu_id: menuId, locale })}>
            <WhatsNewCard menuId={menuId} locale={locale} />
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="w-full border-b border-[#E9EEF5] bg-white/95 backdrop-blur-sm sticky top-0 z-50" style={{ height: 'var(--nav-h)' }}>
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-full px-4">
        {/* Logo and Navigation - Left aligned like Attio */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-[#111827] tracking-tight" aria-label="FeatherBiz home">
            FeatherBiz
          </Link>

          {/* Navigation - Hidden on mobile, tight spacing like Attio */}
          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-4">
                {/* Products - New mega menu */}
                <NavigationMenuItem>
                  <ProductsDropdown />
                </NavigationMenuItem>

                {/* Resources */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="text-base font-medium text-[#111827] hover:text-[#111827]/90 focus:text-[#111827] bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent px-0 py-0 h-auto focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                    onPointerEnter={() => handleOpen('header_megamenu_resources')}
                  >
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent onPointerEnter={() => handleOpen('header_megamenu_resources')}>
                    <div id="header_megamenu_resources" className="grid w-[520px] gap-2 p-4 md:w-[720px] md:grid-cols-[1fr_320px]">
                      <div className="grid gap-1">
                        {resourcesItems.map((it) => (
                          <ResourcesItem key={it.key} item={it} menuId="header_megamenu_resources" />
                        ))}
                      </div>
                      <RightColumn menuId="header_megamenu_resources" ready={resourcesReady} />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing */}
                <NavigationMenuItem>
                  <Link 
                    to="/landing#pricing" 
                    onClick={onPricingClick} 
                    className="text-base font-medium text-[#111827] hover:text-[#111827]/90 transition-colors"
                  >
                    Pricing
                  </Link>
                </NavigationMenuItem>

                {/* Blog */}
                <NavigationMenuItem>
                  <Link 
                    to="/blog" 
                    className="text-base font-medium text-[#111827] hover:text-[#111827]/90 transition-colors"
                  >
                    Blog
                  </Link>
                </NavigationMenuItem>

                {/* Scale */}
                <NavigationMenuItem>
                  <Link 
                    to="/scale" 
                    className="text-base font-medium text-[#111827] hover:text-[#111827]/90 transition-colors"
                  >
                    Scale
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        {/* Right actions */}
        <div className="flex items-center">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden p-2 mr-2" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <nav className="mt-6 space-y-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Products</p>
                  <div className="grid gap-2">
                    <SheetClose asChild><Link to="/features/ai-voice" className="text-foreground hover:underline">AI Voice</Link></SheetClose>
                    <SheetClose asChild><Link to="/features/invoices" className="text-foreground hover:underline">Invoices</Link></SheetClose>
                    <SheetClose asChild><Link to="/features/estimates" className="text-foreground hover:underline">Estimates</Link></SheetClose>
                    <SheetClose asChild><Link to="/features/easycalc" className="text-foreground hover:underline">EasyCalc</Link></SheetClose>
                    <SheetClose asChild><Link to="/features/pipeline" className="text-foreground hover:underline">Pipeline</Link></SheetClose>
                    <SheetClose asChild><Link to="/features/feathertax" className="text-foreground hover:underline">FeatherTax</Link></SheetClose>
                    <SheetClose asChild><Link to="/features/work-orders" className="text-foreground hover:underline">Work Orders</Link></SheetClose>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Resources</p>
                  <div className="grid gap-2">
                    <SheetClose asChild><Link to="/docs" className="text-foreground hover:underline">Help Center</Link></SheetClose>
                    <SheetClose asChild><Link to="/docs/getting-started" className="text-foreground hover:underline">FeatherBiz 101</Link></SheetClose>
                    <SheetClose asChild><Link to="/academy" className="text-foreground hover:underline">Academy</Link></SheetClose>
                    <SheetClose asChild><Link to="/templates" className="text-foreground hover:underline">Templates</Link></SheetClose>
                    <SheetClose asChild><Link to="/developers/api" className="text-foreground hover:underline">API Docs</Link></SheetClose>
                    <SheetClose asChild><Link to="/changelog" className="text-foreground hover:underline">Changelog</Link></SheetClose>
                    <SheetClose asChild><Link to="/community" className="text-foreground hover:underline">Community</Link></SheetClose>
                    <SheetClose asChild><Link to="/support" className="text-foreground hover:underline">Support</Link></SheetClose>
                  </div>
                </div>
                <div className="grid gap-2">
                  <SheetClose asChild>
                    <Link to="/landing#pricing" onClick={onPricingClick} className="text-foreground hover:underline">Pricing</Link>
                  </SheetClose>
                  <SheetClose asChild><Link to="/blog" className="text-foreground hover:underline">Blog</Link></SheetClose>
                  <SheetClose asChild><Link to="/scale" className="text-foreground hover:underline">Scale</Link></SheetClose>
                </div>
                <div className="pt-4 border-t border-border/40">
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={() => navigate('/auth')} className="w-full text-muted-foreground hover:text-foreground">Sign in</Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            {isSubscribed ? (
              <Button
                variant="default"
                onClick={openCustomerPortal}
                className="h-9 px-4 text-base font-semibold transition-all duration-180 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
                style={{ borderRadius: '8px' }}
              >
                Manage Subscription
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => {
                  const isLanding = location.pathname === '/landing' || location.pathname === '/';
                  if (isLanding) {
                    const el = document.getElementById('pricing');
                    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
                  }
                  navigate('/pricing');
                }}
                className="h-9 px-4 text-base font-semibold transition-all duration-180 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
                style={{ borderRadius: '8px' }}
              >
                Subscribe
              </Button>
            )}
            <button
              onClick={() => navigate('/auth')}
              className="text-base font-medium text-[#111827] hover:text-[#111827]/85 hover:underline transition-all duration-180 ml-1"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

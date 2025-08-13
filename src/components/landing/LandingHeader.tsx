import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import navglyphsUrl from "@/assets/navglyphs.svg";
import { WhatsNewCard } from "./WhatsNewCard";
import { track } from "@/lib/analytics";

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
  { key: "voices", icon: "voices", title: "Voices", desc: "Turn calls into actions" },
  { key: "estimates", icon: "estimates", title: "Estimates", desc: "Faster quotes, fewer errors" },
  { key: "ai-calc", icon: "ai-calc", title: "AI & Calc", desc: "Smart pricing & ops" },
  { key: "assignments", icon: "assignments", title: "Assignments", desc: "Own every task" },
  { key: "reporting", icon: "reporting", title: "Reporting", desc: "Analyze & share" },
  { key: "automations", icon: "automations", title: "Automations", desc: "Workflow anything" },
  { key: "integrations", icon: "integrations", title: "Apps & integrations", desc: "Connect your stack" },
];

export const LandingHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locale = typeof navigator !== "undefined" ? navigator.language : "en";

  const onPricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isLanding = location.pathname === '/landing' || location.pathname === '/';
    if (isLanding) {
      e.preventDefault();
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Lazy render toggles for right column
  const [platformReady, setPlatformReady] = useState(false);
  const [resourcesReady, setResourcesReady] = useState(false);
  const [customersReady, setCustomersReady] = useState(false);

  const handleOpen = (menuId: string) => {
    track('nav_megamenu_open', { menu_id: menuId, locale });
    if (menuId === 'header_megamenu_platform') setPlatformReady(true);
    if (menuId === 'header_megamenu_resources') setResourcesReady(true);
    if (menuId === 'header_megamenu_customers') setCustomersReady(true);
  };

  const FeatureItem = ({ item, menuId }: { item: typeof features[number]; menuId: string }) => (
    <button
      type="button"
      onClick={() => track('nav_megamenu_click', { menu_id: menuId, item_key: item.key, locale })}
      className="flex items-start gap-3 rounded-md p-3 hover:bg-accent hover:text-accent-foreground text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      aria-label={`${item.title} — ${item.desc}`}
    >
      <NavGlyph name={item.icon} className="shrink-0 text-foreground/80" size={24} />
      <span>
        <span className="block text-sm font-medium">{item.title}</span>
        <span className="block text-xs text-muted-foreground">{item.desc}</span>
      </span>
    </button>
  );

  const RightColumn = ({ menuId, ready }: { menuId: 'header_megamenu_platform'|'header_megamenu_resources'|'header_megamenu_customers'; ready: boolean }) => (
    <div className="flex flex-col gap-3">
      {/* Get started links */}
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
        <button
          type="button"
          onClick={() => track('nav_megamenu_click', { menu_id: menuId, item_key: 'hire-expert', locale })}
          className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Hire an expert"
        >
          <NavGlyph name="integrations" className="text-foreground/80" size={20} />
          <span className="text-sm">Hire an expert</span>
        </button>
      </div>
      {/* What's new card */}
      {ready && (
        <div onPointerEnter={() => track('nav_whatsnew_view', { menu_id: menuId, locale })}>
          <WhatsNewCard menuId={menuId} locale={locale} />
        </div>
      )}
    </div>
  );

  return (
    <header className="w-full border-b border-border/20 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-foreground tracking-tight hover-scale" aria-label="FeatherBiz home">
            FeatherBiz
          </Link>
        </div>

        {/* Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Platform */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium" onPointerEnter={() => handleOpen('header_megamenu_platform')}>Platform</NavigationMenuTrigger>
                <NavigationMenuContent onPointerEnter={() => handleOpen('header_megamenu_platform')}>
                  <div id="header_megamenu_platform" className="grid w-[520px] gap-2 p-4 md:w-[720px] md:grid-cols-[1fr_320px]">
                    <div className="grid gap-1">
                      {features.map((it) => (
                        <FeatureItem key={it.key} item={it} menuId="header_megamenu_platform" />
                      ))}
                    </div>
                    <RightColumn menuId="header_megamenu_platform" ready={platformReady} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium" onPointerEnter={() => handleOpen('header_megamenu_resources')}>Resources</NavigationMenuTrigger>
                <NavigationMenuContent onPointerEnter={() => handleOpen('header_megamenu_resources')}>
                  <div id="header_megamenu_resources" className="grid w-[520px] gap-2 p-4 md:w-[720px] md:grid-cols-[1fr_320px]">
                    <div className="grid gap-1">
                      {features.map((it) => (
                        <FeatureItem key={it.key} item={it} menuId="header_megamenu_resources" />
                      ))}
                    </div>
                    <RightColumn menuId="header_megamenu_resources" ready={resourcesReady} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Customers */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium" onPointerEnter={() => handleOpen('header_megamenu_customers')}>Customers</NavigationMenuTrigger>
                <NavigationMenuContent onPointerEnter={() => handleOpen('header_megamenu_customers')}>
                  <div id="header_megamenu_customers" className="grid w-[520px] gap-2 p-4 md:w-[720px] md:grid-cols-[1fr_320px]">
                    <div className="grid gap-1">
                      {features.map((it) => (
                        <FeatureItem key={it.key} item={it} menuId="header_megamenu_customers" />
                      ))}
                    </div>
                    <RightColumn menuId="header_megamenu_customers" ready={customersReady} />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pricing (unchanged) */}
              <NavigationMenuItem>
                <Link to="/landing#pricing" onClick={onPricingClick} className="text-muted-foreground hover:text-foreground font-medium transition-colors">Pricing</Link>
              </NavigationMenuItem>

              {/* Blog */}
              <NavigationMenuItem>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Blog</Link>
              </NavigationMenuItem>

              {/* Gold */}
              <NavigationMenuItem>
                <Link to="/gold" className="text-foreground font-medium transition-colors">Gold</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden p-2" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-sm">
              <nav className="mt-6 space-y-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Platform</p>
                  <div className="grid gap-2">
                    <SheetClose asChild><Link to="/landing#features" className="text-foreground hover:underline">Features overview</Link></SheetClose>
                    <SheetClose asChild><Link to="/landing#automation" className="text-foreground hover:underline">Automation & AI</Link></SheetClose>
                    <SheetClose asChild><Link to="/landing#integrations" className="text-foreground hover:underline">Integrations</Link></SheetClose>
                    <SheetClose asChild><Link to="/landing#security" className="text-foreground hover:underline">Security & permissions</Link></SheetClose>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Resources</p>
                  <div className="grid gap-2">
                    <SheetClose asChild><Link to="/landing#guides" className="text-foreground hover:underline">Guides & tutorials</Link></SheetClose>
                    <SheetClose asChild><Link to="/landing#templates" className="text-foreground hover:underline">Templates</Link></SheetClose>
                    <SheetClose asChild><Link to="/landing#help" className="text-foreground hover:underline">Help center</Link></SheetClose>
                    <SheetClose asChild><Link to="/landing#api" className="text-foreground hover:underline">API docs</Link></SheetClose>
                  </div>
                </div>
                <div className="grid gap-2">
                  <SheetClose asChild><Link to="/landing#testimonials" className="text-foreground hover:underline">Customers</Link></SheetClose>
                  <SheetClose asChild>
                    <Link to="/landing#pricing" onClick={onPricingClick} className="text-foreground hover:underline">Pricing</Link>
                  </SheetClose>
                  <SheetClose asChild><Link to="/blog" className="text-foreground hover:underline">Blog</Link></SheetClose>
                  <SheetClose asChild><Link to="/gold" className="text-foreground hover:underline">Gold</Link></SheetClose>
                </div>
                <div className="pt-4 border-t border-border/40">
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={() => navigate('/auth')} className="w-full text-muted-foreground hover:text-foreground">Sign in</Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* CTAs */}
          <Button
            onClick={() => {
              const isLanding = location.pathname === '/landing' || location.pathname === '/';
              if (isLanding) {
                const el = document.getElementById('pricing');
                if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
              }
              navigate('/pricing');
            }}
            className="hidden sm:inline-flex font-medium"
          >
            Subscribe
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/auth')}
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground font-medium px-4"
          >
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
};

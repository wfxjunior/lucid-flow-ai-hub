
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export const LandingHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onPricingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isLanding = location.pathname === '/landing' || location.pathname === '/';
    if (isLanding) {
      e.preventDefault();
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
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
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium">Platform</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[520px] gap-2 p-4 md:w-[640px] md:grid-cols-2">
                    <li>
                      <Link to="/landing#features" className="block rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <span className="block text-sm font-medium">Features overview</span>
                        <span className="block text-xs text-muted-foreground">CRM, projects, billing, and more</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/landing#automation" className="block rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <span className="block text-sm font-medium">Automation & AI</span>
                        <span className="block text-xs text-muted-foreground">Workflows, assistants, and voice</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/landing#integrations" className="block rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <span className="block text-sm font-medium">Integrations</span>
                        <span className="block text-xs text-muted-foreground">Connect your favorite tools</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/landing#security" className="block rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                        <span className="block text-sm font-medium">Security & permissions</span>
                        <span className="block text-xs text-muted-foreground">Best‑practice controls for teams</span>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[280px] p-2">
                    <li>
                      <Link to="/landing#guides" className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">Guides & tutorials</Link>
                    </li>
                    <li>
                      <Link to="/landing#templates" className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">Templates</Link>
                    </li>
                    <li>
                      <Link to="/landing#help" className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">Help center</Link>
                    </li>
                    <li>
                      <Link to="/landing#api" className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">API docs</Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a href="#testimonials" className="text-muted-foreground hover:text-foreground font-medium transition-colors">Customers</a>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/landing#pricing" onClick={onPricingClick} className="text-muted-foreground hover:text-foreground font-medium transition-colors">Pricing</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate('/auth')}
            className="text-muted-foreground hover:text-foreground font-medium px-4"
          >
            Sign in
          </Button>
          <Button
            onClick={() => navigate('/auth')}
            className="bg-foreground text-background hover:bg-foreground/90 font-medium px-6 rounded-lg"
          >
            Start for free
          </Button>
        </div>
        
      </div>
    </header>
  );
};


import { useState } from "react";
import {
  Home,
  BookOpen,
  DollarSign,
  Users,
  Mail,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EssentialSideMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    console.log("Opening menu...");
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    console.log("Closing menu...");
    setIsOpen(false);
  };

  const handleMenuClick = (title: string, action: () => void) => {
    console.log(`Clicked on: ${title}`);
    action();
    handleCloseMenu();
  };

  const links = [
    {
      icon: Home,
      title: "Home",
      onClick: () => navigate("/"),
    },
    {
      icon: BookOpen,
      title: "Features",
      onClick: () => {
        const element = document.getElementById("features");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      icon: DollarSign,
      title: "Pricing",
      onClick: () => {
        const element = document.getElementById("pricing");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      icon: Users,
      title: "Testimonials",
      onClick: () => {
        const element = document.getElementById("testimonials");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      },
    },
    {
      icon: Mail,
      title: "Contact",
      onClick: () => navigate("/contact"),
    },
    {
      icon: HelpCircle,
      title: "Help Center",
      onClick: () => navigate("/faq"),
    },
  ];

  return (
    <>
      {/* Floating circular button */}
      {!isOpen && (
        <button
          onClick={handleOpenMenu}
          className="fixed bottom-7 right-7 z-50 bg-blue-700 text-white rounded-full shadow-xl hover:bg-blue-800 w-14 h-14 flex items-center justify-center transition-all focus:outline-none"
          aria-label="Open menu"
        >
          <span className="text-sm font-bold">FB</span>
        </button>
      )}

      {/* Sidebar overlay and content */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black/40 transition-opacity"
            onClick={handleCloseMenu}
            aria-label="Close menu"
          />
          
          {/* Sidebar */}
          <div className="relative max-w-xs w-full bg-white shadow-xl z-10 animate-slide-in-right">
            {/* Header */}
            <div className="bg-blue-700 py-7 px-5 mb-2 rounded-b-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white text-2xl font-extrabold tracking-tight">
                  FeatherBiz
                </span>
              </div>
              <button
                onClick={handleCloseMenu}
                className="text-white hover:text-blue-200 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-blue-900/70 text-sm mt-1 mb-6 px-5">
              Essential Info & Quick Links
            </p>

            {/* Menu items */}
            <div className="px-5">
              <h4 className="text-xs text-muted-foreground mt-3 mb-3 uppercase tracking-wide">
                Main Sections
              </h4>
              <nav className="space-y-1">
                {links.map((link) => (
                  <button
                    key={link.title}
                    onClick={() => handleMenuClick(link.title, link.onClick)}
                    className="w-full px-3 py-2 rounded-md hover:bg-blue-50 flex items-center gap-3 text-blue-900 font-medium transition text-left"
                  >
                    <link.icon className="w-5 h-5 opacity-70" />
                    <span>{link.title}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Extra Info */}
            <div className="border-t mt-6 pt-5 px-6 pb-8 text-sm">
              <div className="mb-3 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-blue-700">
                  <ShieldCheck className="w-4 h-4" /> 
                  Security: <span className="text-green-700">Enterprise-grade</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-blue-700">
                  <Clock className="w-4 h-4" /> 
                  Support: <span className="text-blue-700">24/7</span>
                </div>
              </div>
              
              <div className="text-muted-foreground font-medium mb-4">
                <span className="block mb-1">Modern Business Management Platform</span>
                <span className="block text-xs font-normal">© 2025 FeatherBiz • By FX American Group</span>
              </div>
              
              <button
                onClick={() => {
                  console.log("Clicked 'Try it free now'");
                  navigate("/auth");
                  handleCloseMenu();
                }}
                className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 rounded-full px-4 py-2 w-full justify-center transition cursor-pointer"
              >
                Try it free now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

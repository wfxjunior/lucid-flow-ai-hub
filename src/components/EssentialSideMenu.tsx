
import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Info,
  Home,
  BookOpen,
  DollarSign,
  Users,
  Mail,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EssentialSideMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    {
      icon: Home,
      title: "Home",
      onClick: () => {
        setOpen(false);
        navigate("/");
      },
    },
    {
      icon: BookOpen,
      title: "Features",
      onClick: () => {
        setOpen(false);
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: DollarSign,
      title: "Pricing",
      onClick: () => {
        setOpen(false);
        document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: Users,
      title: "Testimonials",
      onClick: () => {
        setOpen(false);
        document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: Mail,
      title: "Contact",
      onClick: () => {
        setOpen(false);
        navigate("/contact");
      },
    },
    {
      icon: HelpCircle,
      title: "Help Center",
      onClick: () => {
        setOpen(false);
        navigate("/faq");
      },
    },
  ];

  return (
    <SidebarProvider>
      {/* Floating Button to Open Sidebar */}
      <button
        aria-label="Open Info Menu"
        onClick={() => setOpen(true)}
        className="fixed bottom-7 left-7 z-50 bg-blue-700 text-white rounded-full shadow-xl hover:bg-blue-800 w-14 h-14 flex items-center justify-center transition-all"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
      >
        <Info className="w-7 h-7" />
      </button>
      {/* Overlay Sidebar */}
      <Sidebar open={open} onOpenChange={setOpen} className="max-w-xs w-full shadow-xl z-50">
        <SidebarContent>
          <SidebarHeader className="bg-blue-700 py-6 px-5 mb-2 rounded-b-2xl">
            <div className="flex items-center gap-2">
              <Info className="w-6 h-6 text-white" />
              <span className="text-white text-xl font-bold tracking-tight">FeatherBiz</span>
            </div>
            <p className="text-blue-50/80 text-sm mt-1">Essential Info & Quick Links</p>
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupLabel className="px-5 text-xs text-muted-foreground mt-3 mb-1">Main Sections</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem key={link.title}>
                    <SidebarMenuButton
                      className="px-5 py-2 rounded-md hover:bg-blue-50 flex gap-2 text-blue-900 font-medium transition text-base"
                      asChild
                    >
                      <a
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          link.onClick();
                        }}
                        className="flex items-center gap-2 w-full"
                      >
                        <link.icon className="w-5 h-5 opacity-70" />
                        <span>{link.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Extra Info Section */}
          <div className="border-t mt-6 pt-5 px-6 pb-8 text-sm">
            <div className="mb-3">
              <div className="flex items-center gap-2 font-semibold text-blue-700 mb-1">
                <ShieldCheck className="w-4 h-4" /> Security: <span className="text-green-700">Enterprise-grade</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-blue-700 mb-1">
                <Clock className="w-4 h-4" /> Support: <span className="text-blue-700 font-semibold">24/7</span>
              </div>
            </div>
            <div className="text-muted-foreground font-medium">
              <span className="block mb-1">Modern Business Management Platform</span>
              <span className="block text-xs font-normal">© 2025 FeatherBiz • By FX American Group</span>
            </div>
            <div
              className="mt-4 flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 rounded-full px-4 py-2 w-max transition cursor-pointer select-none"
              onClick={() => {
                setOpen(false);
                window.open("/auth", "_self");
              }}
            >
              Try it free now
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}


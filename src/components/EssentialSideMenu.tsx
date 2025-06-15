
import { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Feather,
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

  // Log para depuração
  console.log("EssentialSideMenu open:", open);

  return (
    <SidebarProvider>
      {/* Floating circular button (bottom right) */}
      {!open && (
        <button
          aria-label="Abrir menu de informações"
          onClick={() => {
            setOpen(true);
            console.log("Botão circular clicado! setOpen(true) chamado.");
          }}
          className="fixed bottom-7 right-7 z-[110] bg-blue-700 text-white rounded-full shadow-xl hover:bg-blue-800 w-14 h-14 flex items-center justify-center transition-all focus:outline-none"
          type="button"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
        >
          <Feather className="w-7 h-7" strokeWidth={2.1} />
        </button>
      )}
      {/* Sidebar overlay e conteúdo */}
      {open && (
        <div className="fixed inset-0 z-[110] flex">
          {/* Overlay escurecendo o fundo */}
          <div
            className="fixed inset-0 bg-black/40 z-[111] transition-opacity"
            onClick={() => {
              setOpen(false);
              console.log("Overlay clicado, fechando menu.");
            }}
            aria-label="Fechar menu"
          />
          {/* Sidebar */}
          <Sidebar className="relative max-w-xs w-full shadow-xl z-[112]">
            <SidebarContent>
              {/* Header */}
              <div className="bg-blue-700 py-7 px-5 mb-2 rounded-b-2xl flex items-center gap-3 select-none">
                <Feather className="w-7 h-7 text-white" strokeWidth={2.1} />
                <span className="text-white text-2xl font-extrabold tracking-tight">
                  FeatherBiz
                </span>
              </div>
              <p className="text-blue-50/80 text-sm mt-1 mb-6 px-5">Essential Info & Quick Links</p>
              <SidebarGroup>
                <SidebarGroupLabel className="px-5 text-xs text-muted-foreground mt-3 mb-1">
                  Main Sections
                </SidebarGroupLabel>
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
                              console.log(`Clicou em: ${link.title}`);
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
              {/* Extra Info */}
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
                    console.log("Clicou em 'Try it free now'");
                  }}
                >
                  Try it free now
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </SidebarContent>
          </Sidebar>
        </div>
      )}
    </SidebarProvider>
  );
}


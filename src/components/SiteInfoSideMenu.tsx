
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetTrigger } from "@/components/ui/sheet"
import { HelpCircle, Home, DollarSign, Info, BookOpen, Users, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function SiteInfoSideMenu() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Floating Button - bottom left */}
      <div className="fixed bottom-6 left-6 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800 w-14 h-14 flex items-center justify-center animate-fade-in"
              aria-label="Open Site Menu"
            >
              <Info className="w-7 h-7" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[320px] max-w-full px-0 py-0 shadow-xl animate-slide-in-right flex flex-col">
            <SheetHeader className="px-6 pt-6 pb-2 border-b mb-2">
              <SheetTitle className="flex items-center gap-2">
                <div className="h-18 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/2d53a2ef-a962-4c01-a5c0-e7b672621acf.png" 
                    alt="FeatherBiz" 
                    className="h-18 w-auto"
                  />
                </div>
                FeatherBiz Info
              </SheetTitle>
              <SheetDescription className="">
                All the essentials of FeatherBiz in one spot!
              </SheetDescription>
            </SheetHeader>
            <nav className="flex-1 px-6 py-3 space-y-1">
              <button
                onClick={() => { navigate("/"); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-blue-50 text-blue-800 font-medium transition"
              >
                <Home className="w-5 h-5 opacity-90" /> Home
              </button>
              <button
                onClick={() => { document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-green-50 text-green-800 font-medium transition"
              >
                <BookOpen className="w-5 h-5 opacity-90" /> Features
              </button>
              <button
                onClick={() => { document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" }); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-yellow-50 text-yellow-800 font-medium transition"
              >
                <DollarSign className="w-5 h-5 opacity-90" /> Pricing
              </button>
              <button
                onClick={() => { document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" }); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-purple-50 text-purple-800 font-medium transition"
              >
                <Users className="w-5 h-5 opacity-90" /> Testimonials
              </button>
              <button
                onClick={() => { navigate("/contact"); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-pink-50 text-pink-800 font-medium transition"
              >
                <Mail className="w-5 h-5 opacity-90" /> Contact
              </button>
              <button
                onClick={() => { navigate("/faq"); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-blue-100 text-blue-900 font-medium transition"
              >
                <HelpCircle className="w-5 h-5 opacity-90" /> Help Center
              </button>
            </nav>
            <div className="px-6 py-4 border-t bg-muted/50 text-xs text-muted-foreground">
              <div className="font-semibold text-primary mb-1">FeatherBiz</div>
              <div>Modern Business Management Platform</div>
              <div className="mt-2">Support: <span className="font-medium text-blue-700">24/7</span></div>
              <div>Security: <span className="font-medium text-green-700">Enterprise-grade</span></div>
              <div className="mt-3 flex items-center gap-1 text-blue-600 font-medium cursor-pointer"
                onClick={() => { navigate('/auth'); }}>
                Try it free now <ArrowRight className="w-4 h-4" />
              </div>
            </div>
            <SheetClose />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

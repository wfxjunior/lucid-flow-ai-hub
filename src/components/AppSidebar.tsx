import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Home, Users, Calendar, FileText, CreditCard, Settings, BarChart3, Briefcase, PiggyBank, Calculator, Car, Package, UserCheck, Target, MessageSquare, Mail, Zap, Video, CheckSquare, StickyNote, FileSpreadsheet, Receipt, TrendingUp, Clipboard, DollarSign, PenTool, Clock, Building, Heart, Mic, Signature, ChevronLeft, ChevronRight, Menu, X } from "lucide-react"
import { MenuItem } from "./sidebar/types"

interface AppSidebarProps {
  activeView: string
}

// Define menu sections with their items
const generalItems: MenuItem[] = [
  { title: "Dashboard", icon: Home, view: "" },
  { title: "Careers", icon: Users, view: "careers" }
]

const coreBusinessItems: MenuItem[] = [
  { title: "Customers", icon: Users, view: "customers" },
  { title: "Projects", icon: Briefcase, view: "projects" },
  { title: "Project Timeline", icon: Calendar, view: "project-schedule" },
  { title: "Invoices", icon: Receipt, view: "invoices" },
  { title: "Estimates", icon: Calculator, view: "estimates" },
  { title: "Smart Schedule", icon: Clock, view: "smart-schedule" }
]

const financialItems: MenuItem[] = [
  { title: "FeatherBudget AI", icon: PiggyBank, view: "financial-tools" },
  { title: "FeatherTax", icon: Calculator, view: "feather-tax" },
  { title: "EasyCalc", icon: Calculator, view: "easy-calc" },
  { title: "Receipts", icon: Receipt, view: "receipts" },
  { title: "Accounting", icon: FileSpreadsheet, view: "accounting" },
  { title: "Quotes", icon: Clipboard, view: "quotes" }
]

const operationsItems: MenuItem[] = [
  { title: "Car Rental", icon: Car, view: "car-rental" },
  { title: "Work Orders", icon: Package, view: "work-orders" },
  { title: "MatTrack", icon: Package, view: "mattrack" },
  { title: "CrewControl", icon: UserCheck, view: "crew-control" },
  { title: "EarnSync", icon: DollarSign, view: "earnsync" },
  { title: "AfterCare", icon: Heart, view: "aftercare" }
]

const documentsItems: MenuItem[] = [
  { title: "FeatherForms", icon: FileText, view: "documents-forms" },
  { title: "Sales Orders", icon: TrendingUp, view: "sales-orders" },
  { title: "Business Proposals", icon: Clipboard, view: "business-proposals" },
  { title: "Bids", icon: DollarSign, view: "bids" },
  { title: "Contracts", icon: PenTool, view: "contracts" }
]

const productivityItems: MenuItem[] = [
  { title: "Meetings", icon: Video, view: "meetings" },
  { title: "Todo List", icon: CheckSquare, view: "tasks" },
  { title: "Notes", icon: StickyNote, view: "notes" },
  { title: "Appointments", icon: Calendar, view: "appointments" }
]

const communicationItems: MenuItem[] = [
  { title: "Messages", icon: MessageSquare, view: "messages" },
  { title: "Email Center", icon: Mail, view: "email-center" }
]

const analyticsItems: MenuItem[] = [
  { title: "Analytics", icon: BarChart3, view: "analytics" }
]

const systemItems: MenuItem[] = [
  { title: "Settings", icon: Settings, view: "settings" },
  { title: "Admin Panel", icon: Settings, view: "admin-panel" }
]

export function AppSidebar({ activeView }: AppSidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle body scroll lock for mobile sidebar
  useEffect(() => {
    const appElement = document.querySelector('[data-app="FeatherBiz"]')
    if (isMobileOpen) {
      appElement?.setAttribute('data-sidebar-mobile', 'open')
      document.body.style.overflow = 'hidden'
    } else {
      appElement?.removeAttribute('data-sidebar-mobile')
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      appElement?.removeAttribute('data-sidebar-mobile')
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  // Update main content data attribute based on sidebar state
  useEffect(() => {
    const mainElement = document.querySelector('[data-role="main"]')
    if (mainElement) {
      if (isCollapsed) {
        mainElement.setAttribute('data-sidebar', 'collapsed')
      } else {
        mainElement.removeAttribute('data-sidebar')
      }
    }
  }, [isCollapsed])

  const handleMenuClick = (view: string) => {
    console.log('Sidebar: Navigating to', view)
    navigate(view === "" ? "/" : `/${view}`)
  }

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const renderMenuSection = (items: MenuItem[], sectionTitle: string) => (
    <div key={sectionTitle} className="featherbiz-sidebar-group">
      <div className="featherbiz-sidebar-group-label">{sectionTitle}</div>
      <ul className="featherbiz-sidebar-menu">
        {items.map((item) => (
          <li key={item.view} className="featherbiz-sidebar-menu-item">
            <button
              className={`featherbiz-sidebar-menu-button ${activeView === item.view ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.view)}
              data-tooltip={item.title}
              aria-label={item.title}
            >
              {item.icon && (
                <item.icon className="featherbiz-sidebar-menu-button-icon" />
              )}
              <span className="featherbiz-sidebar-menu-button-text">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`featherbiz-sidebar-backdrop ${isMobileOpen ? 'show' : ''}`}
        onClick={() => setIsMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside 
        data-role="sidebar"
        data-state={isCollapsed ? 'collapsed' : 'expanded'}
        data-open={isMobileOpen}
        className={`featherbiz-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
        aria-label="Main navigation"
        role="navigation"
      >
        {/* Header */}
        <div className="featherbiz-sidebar-header">
          <span className="featherbiz-sidebar-logo">FeatherBiz</span>
          <button
            className="featherbiz-sidebar-toggle"
            onClick={toggleCollapsed}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            className="featherbiz-mobile-toggle"
            onClick={toggleMobile}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div data-scroll="true" className="featherbiz-sidebar-content">
          {renderMenuSection(generalItems, "General")}
          {renderMenuSection(coreBusinessItems, "Core Business")}
          {renderMenuSection(financialItems, "Financial Tools")}
          {renderMenuSection(operationsItems, "Operations")}
          {renderMenuSection(documentsItems, "Documents & Forms")}
          {renderMenuSection(productivityItems, "Productivity")}
          {renderMenuSection(communicationItems, "Communication")}
          {renderMenuSection(analyticsItems, "Analytics")}
          {renderMenuSection(systemItems, "System Tools")}
        </div>
      </aside>
    </>
  )
}

// Mobile Header Toggle Component
export function MobileHeaderToggle() {
  const [, setIsMobileOpen] = useState(false)

  const toggleMobile = () => {
    setIsMobileOpen(prev => !prev)
    // Dispatch custom event to communicate with sidebar
    window.dispatchEvent(new CustomEvent('toggleMobileSidebar'))
  }

  return (
    <button
      className="featherbiz-mobile-toggle"
      onClick={toggleMobile}
      aria-label="Open sidebar"
    >
      <Menu size={20} />
    </button>
  )
}

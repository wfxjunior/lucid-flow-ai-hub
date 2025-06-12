
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BusinessDashboard } from "@/components/BusinessDashboard";
import { ImprovedDashboard } from "@/components/ImprovedDashboard";
import { CustomerManagement } from "@/components/CustomerManagement";
import { CreateInvoice } from "@/components/CreateInvoice";
import { ESignaturesPage } from "@/components/ESignaturesPage";
import { ProjectsPage } from "@/components/ProjectsPage";
import { AIVoice } from "@/components/AIVoice";
import { FeatherFormsPage } from "@/components/FeatherFormsPage";
import { PipelineBoard } from "@/components/PipelineBoard";
import { CarRentalPage } from "@/components/CarRentalPage";
import { WorkOrdersPage } from "@/components/WorkOrdersPage";
import { MatTrackPage } from "@/components/MatTrackPage";
import { CrewControlPage } from "@/components/CrewControlPage";
import { EarnSyncPage } from "@/components/EarnSyncPage";
import { AfterCarePage } from "@/components/AfterCarePage";
import { FeatherTaxPage } from "@/components/FeatherTaxPage";
import { MeetingsPage } from "@/components/MeetingsPage";
import { TodoListPage } from "@/components/TodoListPage";
import { NotesPage } from "@/components/NotesPage";
import { QuotesPage } from "@/components/QuotesPage";
import { EstimatesPage } from "@/components/EstimatesPage";
import { AccountingPage } from "@/components/AccountingPage";
import { SalesOrdersPage } from "@/components/SalesOrdersPage";
import { ServiceOrdersPage } from "@/components/ServiceOrdersPage";
import { BusinessProposalsPage } from "@/components/BusinessProposalsPage";
import { BidsPage } from "@/components/BidsPage";
import { ContractsPage } from "@/components/ContractsPage";
import { Analytics } from "@/components/Analytics";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { MessagesPage } from "@/components/MessagesPage";
import { AppointmentsPage } from "@/components/AppointmentsPage";
import { PaymentsPage } from "@/components/PaymentsPage";
import { IntegrationsHub } from "@/components/IntegrationsHub";
import { SmartSchedulePage } from "@/components/SmartSchedulePage";
import { SettingsPage } from "@/components/SettingsPage";
import { CompanySettings } from "@/components/CompanySettings";
import { FeatherBudgetPage } from "@/components/feather-budget/FeatherBudgetPage";
import { AuthGuard } from "@/components/AuthGuard";

export type ViewType = 
  | "dashboard" 
  | "improved-dashboard" 
  | "customer-management" 
  | "invoice-creator" 
  | "e-signatures" 
  | "projects" 
  | "ai-voice"
  | "feather-forms"
  | "feather-budget"
  | "pipeline"
  | "car-rental"
  | "work-orders"
  | "mat-track"
  | "crew-control"
  | "earnsync"
  | "aftercare"
  | "feather-tax"
  | "meetings"
  | "todo-list"
  | "notes"
  | "quotes"
  | "estimates"
  | "accounting"
  | "sales-orders"
  | "service-orders"
  | "business-proposals"
  | "bids"
  | "contracts"
  | "analytics"
  | "analytics-dashboard"
  | "messages"
  | "appointments"
  | "payments"
  | "integrations"
  | "smart-schedule"
  | "settings"
  | "company-settings";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>("improved-dashboard");

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <BusinessDashboard onNavigate={setCurrentView} />;
      case "improved-dashboard":
        return <ImprovedDashboard />;
      case "customer-management":
        return <CustomerManagement />;
      case "invoice-creator":
        return <CreateInvoice />;
      case "e-signatures":
        return <ESignaturesPage />;
      case "projects":
        return <ProjectsPage />;
      case "ai-voice":
        return <AIVoice />;
      case "feather-forms":
        return <FeatherFormsPage />;
      case "feather-budget":
        return <FeatherBudgetPage />;
      case "pipeline":
        return <PipelineBoard />;
      case "car-rental":
        return <CarRentalPage />;
      case "work-orders":
        return <WorkOrdersPage />;
      case "mat-track":
        return <MatTrackPage />;
      case "crew-control":
        return <CrewControlPage />;
      case "earnsync":
        return <EarnSyncPage />;
      case "aftercare":
        return <AfterCarePage />;
      case "feather-tax":
        return <FeatherTaxPage />;
      case "meetings":
        return <MeetingsPage />;
      case "todo-list":
        return <TodoListPage />;
      case "notes":
        return <NotesPage />;
      case "quotes":
        return <QuotesPage />;
      case "estimates":
        return <EstimatesPage />;
      case "accounting":
        return <AccountingPage />;
      case "sales-orders":
        return <SalesOrdersPage />;
      case "service-orders":
        return <ServiceOrdersPage />;
      case "business-proposals":
        return <BusinessProposalsPage />;
      case "bids":
        return <BidsPage />;
      case "contracts":
        return <ContractsPage />;
      case "analytics":
        return <Analytics />;
      case "analytics-dashboard":
        return <AnalyticsDashboard />;
      case "messages":
        return <MessagesPage />;
      case "appointments":
        return <AppointmentsPage />;
      case "payments":
        return <PaymentsPage />;
      case "integrations":
        return <IntegrationsHub />;
      case "smart-schedule":
        return <SmartSchedulePage />;
      case "settings":
        return <SettingsPage />;
      case "company-settings":
        return <CompanySettings />;
      default:
        return <ImprovedDashboard />;
    }
  };

  return (
    <AuthGuard>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar onViewChange={setCurrentView} />
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </SidebarProvider>
    </AuthGuard>
  );
};

export default Index;

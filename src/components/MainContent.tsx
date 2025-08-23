import { ImprovedDashboard } from "@/components/ImprovedDashboard"
import { CleanPageLayout } from "@/components/layouts/CleanPageLayout"
import { Users, Calendar, Briefcase, Car, FileText, Calculator, Settings, BarChart3, PiggyBank, Package, UserCheck, Target, MessageSquare, Mail, Zap, Video, CheckSquare, StickyNote, FileSpreadsheet, Receipt, TrendingUp, Clipboard, DollarSign, PenTool, Clock, Heart } from "lucide-react"

interface MainContentProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function MainContent({ activeView, setActiveView }: MainContentProps) {
  const handleNavigation = (view: string) => {
    console.log('MainContent: Navigating to', view)
    setActiveView(view)
  }

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <ImprovedDashboard onNavigate={handleNavigation} />
      
      case "customers":
        return (
          <CleanPageLayout
            title="Customers"
            subtitle="Manage your customer relationships and contact information"
            actionLabel="Add Customer"
            onActionClick={() => console.log('Add customer')}
            metrics={[
              { title: "Total Customers", value: "0", subtitle: "Active customers", icon: Users },
              { title: "New This Month", value: "0", subtitle: "Recent additions", icon: Users },
              { title: "Response Rate", value: "0%", subtitle: "Customer engagement", icon: MessageSquare },
              { title: "Satisfaction", value: "0%", subtitle: "Average rating", icon: Heart }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Customer management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "projects":
        return (
          <CleanPageLayout
            title="Projects"
            subtitle="Track and manage your ongoing projects"
            actionLabel="Create Project"
            onActionClick={() => console.log('Create project')}
            metrics={[
              { title: "Active Projects", value: "0", subtitle: "Currently running", icon: Briefcase },
              { title: "Upcoming Deadlines", value: "0", subtitle: "This month", icon: Calendar },
              { title: "Budget Spent", value: "$0", subtitle: "Out of total budget", icon: DollarSign },
              { title: "Client Satisfaction", value: "0%", subtitle: "Average rating", icon: Heart }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Project management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "project-timeline":
        return (
          <CleanPageLayout
            title="Project Timeline"
            subtitle="Visualize project milestones and deadlines"
            actionLabel="Add Milestone"
            onActionClick={() => console.log('Add milestone')}
            metrics={[
              { title: "Total Milestones", value: "0", subtitle: "Across all projects", icon: Calendar },
              { title: "Completed", value: "0", subtitle: "Finished milestones", icon: CheckSquare },
              { title: "On Track", value: "0", subtitle: "Milestones in progress", icon: Clock },
              { title: "At Risk", value: "0", subtitle: "Approaching deadlines", icon: Target }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Project timeline features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "growth":
        return (
          <CleanPageLayout
            title="Growth"
            subtitle="Analyze your business growth and identify opportunities"
            actionLabel="Add Goal"
            onActionClick={() => console.log('Add goal')}
            metrics={[
              { title: "Monthly Revenue", value: "$0", subtitle: "Current month", icon: DollarSign },
              { title: "New Customers", value: "0", subtitle: "This month", icon: Users },
              { title: "Conversion Rate", value: "0%", subtitle: "Website conversions", icon: TrendingUp },
              { title: "Customer Acquisition Cost", value: "$0", subtitle: "Average cost", icon: PiggyBank }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Growth analysis features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "automations":
        return (
          <CleanPageLayout
            title="Automations"
            subtitle="Automate repetitive tasks and streamline your workflow"
            actionLabel="Create Automation"
            onActionClick={() => console.log('Create automation')}
            metrics={[
              { title: "Active Automations", value: "0", subtitle: "Currently running", icon: Zap },
              { title: "Tasks Automated", value: "0", subtitle: "This month", icon: CheckSquare },
              { title: "Time Saved", value: "0 hours", subtitle: "Through automation", icon: Clock },
              { title: "Error Reduction", value: "0%", subtitle: "Improved accuracy", icon: CheckSquare }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Automation features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "pipeline":
        return (
          <CleanPageLayout
            title="Pipeline"
            subtitle="Manage your sales pipeline and track opportunities"
            actionLabel="Add Opportunity"
            onActionClick={() => console.log('Add opportunity')}
            metrics={[
              { title: "Total Opportunities", value: "0", subtitle: "In the pipeline", icon: Target },
              { title: "Qualified Leads", value: "0", subtitle: "Potential customers", icon: UserCheck },
              { title: "Conversion Rate", value: "0%", subtitle: "Lead to customer", icon: TrendingUp },
              { title: "Average Deal Size", value: "$0", subtitle: "Per customer", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Pipeline management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "smart-schedule":
        return (
          <CleanPageLayout
            title="Smart Schedule"
            subtitle="Optimize your schedule and manage appointments"
            actionLabel="Add Appointment"
            onActionClick={() => console.log('Add appointment')}
            metrics={[
              { title: "Total Appointments", value: "0", subtitle: "Scheduled this month", icon: Calendar },
              { title: "Confirmed", value: "0", subtitle: "Appointments confirmed", icon: CheckSquare },
              { title: "No-Shows", value: "0", subtitle: "Missed appointments", icon: UserCheck },
              { title: "Customer Satisfaction", value: "0%", subtitle: "Appointment feedback", icon: Heart }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Smart scheduling features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "finance":
        return (
          <CleanPageLayout
            title="Finance"
            subtitle="Manage your finances and track expenses"
            actionLabel="Add Transaction"
            onActionClick={() => console.log('Add transaction')}
            metrics={[
              { title: "Total Revenue", value: "$0", subtitle: "This month", icon: DollarSign },
              { title: "Total Expenses", value: "$0", subtitle: "This month", icon: Calculator },
              { title: "Net Profit", value: "$0", subtitle: "After expenses", icon: PiggyBank },
              { title: "Outstanding Invoices", value: "$0", subtitle: "Awaiting payment", icon: FileText }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Financial management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "feather-budget":
        return (
          <CleanPageLayout
            title="FeatherBudget AI"
            subtitle="AI-powered budgeting and financial planning"
            actionLabel="Create Budget"
            onActionClick={() => console.log('Create budget')}
            metrics={[
              { title: "Budgeted Amount", value: "$0", subtitle: "Total budget", icon: PiggyBank },
              { title: "Spent", value: "$0", subtitle: "Amount spent", icon: Calculator },
              { title: "Remaining", value: "$0", subtitle: "Budget balance", icon: DollarSign },
              { title: "Savings Rate", value: "0%", subtitle: "Compared to income", icon: TrendingUp }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">AI-powered budgeting features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "feather-tax":
        return (
          <CleanPageLayout
            title="FeatherTax"
            subtitle="Tax management and compliance tools"
            actionLabel="File Taxes"
            onActionClick={() => console.log('File taxes')}
            metrics={[
              { title: "Tax Due", value: "$0", subtitle: "Upcoming payment", icon: DollarSign },
              { title: "Tax Savings", value: "$0", subtitle: "This year", icon: PiggyBank },
              { title: "Tax Rate", value: "0%", subtitle: "Effective rate", icon: TrendingUp },
              { title: "Deductions", value: "$0", subtitle: "Claimed deductions", icon: FileText }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tax management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "easy-calc":
        return (
          <CleanPageLayout
            title="EasyCalc"
            subtitle="Simple and intuitive calculator for quick calculations"
            actionLabel="Open Calculator"
            onActionClick={() => console.log('Open calculator')}
            metrics={[
              { title: "Calculations", value: "0", subtitle: "Performed this month", icon: Calculator },
              { title: "Saved Formulas", value: "0", subtitle: "Custom formulas", icon: FileText },
              { title: "Error Rate", value: "0%", subtitle: "Calculation accuracy", icon: CheckSquare },
              { title: "Time Saved", value: "0 minutes", subtitle: "Using EasyCalc", icon: Clock }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">EasyCalc features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "receipts":
        return (
          <CleanPageLayout
            title="Receipts"
            subtitle="Manage and organize your receipts"
            actionLabel="Add Receipt"
            onActionClick={() => console.log('Add receipt')}
            metrics={[
              { title: "Total Receipts", value: "0", subtitle: "Uploaded receipts", icon: Receipt },
              { title: "Categorized", value: "0", subtitle: "Receipts categorized", icon: FileText },
              { title: "Expense Total", value: "$0", subtitle: "Total expenses", icon: DollarSign },
              { title: "Tax Deductible", value: "$0", subtitle: "Potential deductions", icon: PiggyBank }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Receipt management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "accounting":
        return (
          <CleanPageLayout
            title="Accounting"
            subtitle="Manage your accounting and financial statements"
            actionLabel="Create Statement"
            onActionClick={() => console.log('Create statement')}
            metrics={[
              { title: "Balance Sheet", value: "$0", subtitle: "Total assets", icon: FileSpreadsheet },
              { title: "Income Statement", value: "$0", subtitle: "Net income", icon: TrendingUp },
              { title: "Cash Flow", value: "$0", subtitle: "Cash flow", icon: DollarSign },
              { title: "Equity", value: "$0", subtitle: "Total equity", icon: PiggyBank }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Accounting features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "quotes":
        return (
          <CleanPageLayout
            title="Quotes"
            subtitle="Create and manage your business quotes"
            actionLabel="Create Quote"
            onActionClick={() => console.log('Create quote')}
            metrics={[
              { title: "Total Quotes", value: "0", subtitle: "Created quotes", icon: Clipboard },
              { title: "Accepted", value: "0", subtitle: "Quotes accepted", icon: CheckSquare },
              { title: "Pending", value: "0", subtitle: "Quotes pending", icon: Clock },
              { title: "Revenue Quoted", value: "$0", subtitle: "Potential revenue", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Quote management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "car-rental":
        return (
          <CleanPageLayout
            title="Car Rental"
            subtitle="Manage your car rental fleet and reservations"
            actionLabel="Add Car"
            onActionClick={() => console.log('Add car')}
            metrics={[
              { title: "Total Cars", value: "0", subtitle: "Cars in fleet", icon: Car },
              { title: "Available", value: "0", subtitle: "Cars available", icon: CheckSquare },
              { title: "Rented", value: "0", subtitle: "Cars rented", icon: Car },
              { title: "Revenue", value: "$0", subtitle: "Rental revenue", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Car rental features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "work-orders":
        return (
          <CleanPageLayout
            title="Work Orders"
            subtitle="Manage your work orders and service requests"
            actionLabel="Create Work Order"
            onActionClick={() => console.log('Create work order')}
            metrics={[
              { title: "Total Orders", value: "0", subtitle: "Work orders created", icon: Package },
              { title: "Open", value: "0", subtitle: "Orders open", icon: Clock },
              { title: "Completed", value: "0", subtitle: "Orders completed", icon: CheckSquare },
              { title: "Revenue", value: "$0", subtitle: "Order revenue", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Work order features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "mat-track":
        return (
          <CleanPageLayout
            title="MatTrack"
            subtitle="Track your materials and inventory"
            actionLabel="Add Material"
            onActionClick={() => console.log('Add material')}
            metrics={[
              { title: "Total Materials", value: "0", subtitle: "Materials tracked", icon: Package },
              { title: "In Stock", value: "0", subtitle: "Materials in stock", icon: CheckSquare },
              { title: "Out of Stock", value: "0", subtitle: "Materials out of stock", icon: Package },
              { title: "Value", value: "$0", subtitle: "Inventory value", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Material tracking features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "crew-control":
        return (
          <CleanPageLayout
            title="CrewControl"
            subtitle="Manage your crew and employee schedules"
            actionLabel="Add Employee"
            onActionClick={() => console.log('Add employee')}
            metrics={[
              { title: "Total Employees", value: "0", subtitle: "Employees managed", icon: UserCheck },
              { title: "Scheduled", value: "0", subtitle: "Employees scheduled", icon: Calendar },
              { title: "Available", value: "0", subtitle: "Employees available", icon: CheckSquare },
              { title: "Absent", value: "0", subtitle: "Employees absent", icon: UserCheck }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Crew control features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "earnsync":
        return (
          <CleanPageLayout
            title="EarnSync"
            subtitle="Synchronize your earnings and payments"
            actionLabel="Add Payment"
            onActionClick={() => console.log('Add payment')}
            metrics={[
              { title: "Total Earnings", value: "$0", subtitle: "Earnings synced", icon: DollarSign },
              { title: "Payments Received", value: "$0", subtitle: "Payments received", icon: CheckSquare },
              { title: "Payments Due", value: "$0", subtitle: "Payments due", icon: Clock },
              { title: "Outstanding", value: "$0", subtitle: "Outstanding balance", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Earnings synchronization features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "aftercare":
        return (
          <CleanPageLayout
            title="AfterCare"
            subtitle="Manage your aftercare services and customer follow-ups"
            actionLabel="Add Follow-Up"
            onActionClick={() => console.log('Add follow-up')}
            metrics={[
              { title: "Total Follow-Ups", value: "0", subtitle: "Follow-ups scheduled", icon: Heart },
              { title: "Completed", value: "0", subtitle: "Follow-ups completed", icon: CheckSquare },
              { title: "Pending", value: "0", subtitle: "Follow-ups pending", icon: Clock },
              { title: "Customer Satisfaction", value: "0%", subtitle: "Follow-up feedback", icon: Heart }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aftercare features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "feather-forms":
        return (
          <CleanPageLayout
            title="FeatherForms"
            subtitle="Create and manage your business forms"
            actionLabel="Create Form"
            onActionClick={() => console.log('Create form')}
            metrics={[
              { title: "Total Forms", value: "0", subtitle: "Forms created", icon: FileText },
              { title: "Completed", value: "0", subtitle: "Forms completed", icon: CheckSquare },
              { title: "Pending", value: "0", subtitle: "Forms pending", icon: Clock },
              { title: "Responses", value: "0", subtitle: "Form responses", icon: MessageSquare }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Form management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "sales-orders":
        return (
          <CleanPageLayout
            title="Sales Orders"
            subtitle="Manage your sales orders and track revenue"
            actionLabel="Create Order"
            onActionClick={() => console.log('Create order')}
            metrics={[
              { title: "Total Orders", value: "0", subtitle: "Orders created", icon: TrendingUp },
              { title: "Pending", value: "0", subtitle: "Orders pending", icon: Clock },
              { title: "Shipped", value: "0", subtitle: "Orders shipped", icon: Package },
              { title: "Revenue", value: "$0", subtitle: "Order revenue", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Sales order features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "business-proposals":
        return (
          <CleanPageLayout
            title="Business Proposals"
            subtitle="Create and manage your business proposals"
            actionLabel="Create Proposal"
            onActionClick={() => console.log('Create proposal')}
            metrics={[
              { title: "Total Proposals", value: "0", subtitle: "Proposals created", icon: Clipboard },
              { title: "Sent", value: "0", subtitle: "Proposals sent", icon: Mail },
              { title: "Accepted", value: "0", subtitle: "Proposals accepted", icon: CheckSquare },
              { title: "Revenue", value: "$0", subtitle: "Potential revenue", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Proposal management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "bids":
        return (
          <CleanPageLayout
            title="Bids"
            subtitle="Manage your bids and track opportunities"
            actionLabel="Create Bid"
            onActionClick={() => console.log('Create bid')}
            metrics={[
              { title: "Total Bids", value: "0", subtitle: "Bids created", icon: DollarSign },
              { title: "Submitted", value: "0", subtitle: "Bids submitted", icon: Mail },
              { title: "Won", value: "0", subtitle: "Bids won", icon: CheckSquare },
              { title: "Revenue", value: "$0", subtitle: "Potential revenue", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Bid management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "contracts":
        return (
          <CleanPageLayout
            title="Contracts"
            subtitle="Manage your contracts and legal agreements"
            actionLabel="Create Contract"
            onActionClick={() => console.log('Create contract')}
            metrics={[
              { title: "Total Contracts", value: "0", subtitle: "Contracts created", icon: PenTool },
              { title: "Active", value: "0", subtitle: "Contracts active", icon: CheckSquare },
              { title: "Expired", value: "0", subtitle: "Contracts expired", icon: Clock },
              { title: "Value", value: "$0", subtitle: "Contract value", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Contract management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "meetings":
        return (
          <CleanPageLayout
            title="Meetings"
            subtitle="Schedule and manage your meetings"
            actionLabel="Schedule Meeting"
            onActionClick={() => console.log('Schedule meeting')}
            metrics={[
              { title: "Total Meetings", value: "0", subtitle: "Meetings scheduled", icon: Video },
              { title: "Upcoming", value: "0", subtitle: "Meetings upcoming", icon: Clock },
              { title: "Completed", value: "0", subtitle: "Meetings completed", icon: CheckSquare },
              { title: "Attendees", value: "0", subtitle: "Meeting attendees", icon: Users }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Meeting management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "todo-list":
        return (
          <CleanPageLayout
            title="Todo List"
            subtitle="Manage your tasks and stay organized"
            actionLabel="Add Task"
            onActionClick={() => console.log('Add task')}
            metrics={[
              { title: "Total Tasks", value: "0", subtitle: "Tasks created", icon: CheckSquare },
              { title: "Pending", value: "0", subtitle: "Tasks pending", icon: Clock },
              { title: "Completed", value: "0", subtitle: "Tasks completed", icon: CheckSquare },
              { title: "Priority", value: "0", subtitle: "High priority tasks", icon: Target }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Todo list features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "notes":
        return (
          <CleanPageLayout
            title="Notes"
            subtitle="Create and manage your notes"
            actionLabel="Add Note"
            onActionClick={() => console.log('Add note')}
            metrics={[
              { title: "Total Notes", value: "0", subtitle: "Notes created", icon: StickyNote },
              { title: "Categories", value: "0", subtitle: "Note categories", icon: FileText },
              { title: "Tags", value: "0", subtitle: "Note tags", icon: Target },
              { title: "Last Updated", value: "N/A", subtitle: "Most recent note", icon: Clock }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Note management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "appointments":
        return (
          <CleanPageLayout
            title="Appointments"
            subtitle="Schedule and manage your appointments"
            actionLabel="Add Appointment"
            onActionClick={() => console.log('Add appointment')}
            metrics={[
              { title: "Total Appointments", value: "0", subtitle: "Appointments scheduled", icon: Calendar },
              { title: "Upcoming", value: "0", subtitle: "Appointments upcoming", icon: Clock },
              { title: "Completed", value: "0", subtitle: "Appointments completed", icon: CheckSquare },
              { title: "Attendees", value: "0", subtitle: "Appointment attendees", icon: Users }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Appointment management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "messages":
        return (
          <CleanPageLayout
            title="Messages"
            subtitle="Manage your messages and communications"
            actionLabel="Send Message"
            onActionClick={() => console.log('Send message')}
            metrics={[
              { title: "Total Messages", value: "0", subtitle: "Messages sent", icon: MessageSquare },
              { title: "Unread", value: "0", subtitle: "Unread messages", icon: Mail },
              { title: "Sent", value: "0", subtitle: "Messages sent", icon: MessageSquare },
              { title: "Received", value: "0", subtitle: "Messages received", icon: Mail }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Message management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "email-center":
        return (
          <CleanPageLayout
            title="Email Center"
            subtitle="Manage your emails and communications"
            actionLabel="Send Email"
            onActionClick={() => console.log('Send email')}
            metrics={[
              { title: "Total Emails", value: "0", subtitle: "Emails sent", icon: Mail },
              { title: "Unread", value: "0", subtitle: "Unread emails", icon: Mail },
              { title: "Sent", value: "0", subtitle: "Emails sent", icon: Mail },
              { title: "Received", value: "0", subtitle: "Emails received", icon: Mail }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Email management features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "analytics":
        return (
          <CleanPageLayout
            title="Analytics"
            subtitle="Analyze your business data and performance"
            actionLabel="Generate Report"
            onActionClick={() => console.log('Generate report')}
            metrics={[
              { title: "Website Traffic", value: "0", subtitle: "Website visits", icon: BarChart3 },
              { title: "Conversion Rate", value: "0%", subtitle: "Website conversions", icon: TrendingUp },
              { title: "Customer Acquisition Cost", value: "$0", subtitle: "Average cost", icon: PiggyBank },
              { title: "Revenue", value: "$0", subtitle: "Total revenue", icon: DollarSign }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Analytics features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "settings":
        return (
          <CleanPageLayout
            title="Settings"
            subtitle="Manage your account settings and preferences"
            actionLabel="Edit Profile"
            onActionClick={() => console.log('Edit profile')}
            metrics={[
              { title: "Account Type", value: "Free", subtitle: "Subscription plan", icon: Settings },
              { title: "Storage Used", value: "0 GB", subtitle: "Storage usage", icon: FileText },
              { title: "Users", value: "0", subtitle: "Active users", icon: Users },
              { title: "Security", value: "Secure", subtitle: "Account security", icon: CheckSquare }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Settings features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      case "admin-panel":
        return (
          <CleanPageLayout
            title="Admin Panel"
            subtitle="Manage your system settings and configurations"
            actionLabel="Add User"
            onActionClick={() => console.log('Add user')}
            metrics={[
              { title: "Total Users", value: "0", subtitle: "System users", icon: Users },
              { title: "Active Users", value: "0", subtitle: "Users online", icon: UserCheck },
              { title: "Storage Used", value: "0 GB", subtitle: "System storage", icon: FileText },
              { title: "System Health", value: "Good", subtitle: "System status", icon: CheckSquare }
            ]}
          >
            <div className="text-center py-12">
              <p className="text-muted-foreground">Admin panel features coming soon.</p>
            </div>
          </CleanPageLayout>
        )

      default:
        return (
          <div className="w-full h-full min-h-screen bg-background">
            <div className="w-full h-full">
              <div className="w-full max-w-none px-6 py-6">
                <div className="text-center py-12">
                  <h1 className="text-2xl font-bold mb-4">Feature Coming Soon</h1>
                  <p className="text-muted-foreground mb-6">
                    This feature is currently under development and will be available soon.
                  </p>
                  <button
                    onClick={() => setActiveView("dashboard")}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return renderContent()
}

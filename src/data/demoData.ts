
export const demoData = {
  aiVoice: {
    transcript: [
      { speaker: "Client", text: "We need the kitchen renovation completed by March 15th" },
      { speaker: "You", text: "Absolutely, I'll schedule the team and order materials this week" },
      { speaker: "Client", text: "Great! Also, can you send me an updated timeline?" },
      { speaker: "You", text: "I'll have that to you by tomorrow morning" }
    ],
    actionItems: [
      "Schedule renovation team for March project",
      "Order kitchen materials by Friday",
      "Send updated timeline to client by tomorrow",
      "Follow up on permit status"
    ],
    callMetrics: {
      duration: "12:34"
    }
  },
  
  invoices: {
    recentInvoices: [
      { id: "INV-2024-001", client: "Johnson Construction", amount: 12500, status: "paid" },
      { id: "INV-2024-002", client: "Smith Remodeling", amount: 8750, status: "pending" },
      { id: "INV-2024-003", client: "Davis Builders", amount: 15200, status: "overdue" },
      { id: "INV-2024-004", client: "Wilson Contractors", amount: 9800, status: "draft" }
    ],
    monthlyRevenue: 156750,
    mrr: 45600
  },
  
  estimates: {
    activeEstimates: [
      {
        id: "EST-2024-001",
        client: "Anderson Family",
        packages: [
          {
            name: "Basic Package",
            price: 15000,
            features: ["12x16 deck", "Pressure-treated lumber", "Basic railing", "Standard stain"],
            status: "under_review"
          },
          {
            name: "Premium Package", 
            price: 22000,
            features: ["12x16 deck", "Cedar lumber", "Custom railing", "Premium stain", "Built-in seating"],
            status: "approved"
          },
          {
            name: "Luxury Package",
            price: 35000,
            features: ["12x16 deck", "Composite decking", "Glass railing", "LED lighting", "Built-in bar"],
            status: "under_review"
          }
        ]
      }
    ],
    conversionRate: 68,
    avgValue: 24500
  },
  
  pipeline: {
    stages: [
      { name: "Lead", deals: 12, value: 145000, color: "blue" },
      { name: "Qualified", deals: 8, value: 98000, color: "yellow" },
      { name: "Proposal", deals: 5, value: 75000, color: "orange" },
      { name: "Closed", deals: 3, value: 45000, color: "green" }
    ],
    activeDeals: [
      { name: "Kitchen Remodel - Johnson", stage: "Proposal", value: 25000, probability: 80 },
      { name: "Bathroom Renovation - Smith", stage: "Qualified", value: 15000, probability: 60 },
      { name: "Deck Installation - Davis", stage: "Lead", value: 12000, probability: 30 }
    ],
    conversionRates: {
      leadToQualified: 67,
      qualifiedToProposal: 63,
      proposalToClosed: 60
    }
  },
  
  featherTax: {
    upcomingDates: [
      { task: "Quarterly Tax Payment", date: "Mar 15, 2024", type: "payment" },
      { task: "W-2 Filing Deadline", date: "Jan 31, 2024", type: "filing" },
      { task: "1099 Collection", date: "Feb 28, 2024", type: "document" }
    ],
    documents: [
      { name: "Business Receipts", count: 247, status: "complete" },
      { name: "Mileage Logs", count: 52, status: "in_progress" },
      { name: "Bank Statements", count: 12, status: "pending" }
    ],
    taxSavings: 8750,
    deductionsFound: 23
  },
  
  easyCalc: {
    calculations: [
      {
        cost: 8500,
        markup: 40,
        sellingPrice: 11900,
        margin: 28.5
      }
    ],
    templates: [
      { name: "Standard Markup", type: "margin", value: 35 },
      { name: "Material Cost Plus", type: "markup", value: 45 },
      { name: "Service Rate", type: "hourly", value: 85 }
    ]
  },
  
  workOrders: {
    orders: [
      {
        id: "WO-2024-001",
        client: "Johnson Residence",
        service: "Kitchen Installation",
        status: "in_progress",
        priority: "high",
        assigned: "Mike Chen"
      },
      {
        id: "WO-2024-002", 
        client: "Smith Commercial",
        service: "Bathroom Renovation",
        status: "scheduled",
        priority: "medium",
        assigned: "Sarah Davis"
      },
      {
        id: "WO-2024-003",
        client: "Davis Property",
        service: "Deck Repair",
        status: "completed",
        priority: "low",
        assigned: "Tom Wilson"
      },
      {
        id: "WO-2024-004",
        client: "Wilson Building",
        service: "Flooring Installation", 
        status: "pending",
        priority: "medium",
        assigned: "Lisa Johnson"
      }
    ],
    metrics: {
      completedToday: 4,
      avgCompletionTime: "2.5 hours",
      customerSatisfaction: 4.8
    },
    crew: [
      { name: "Mike Chen", location: "Downtown Site", status: "active" },
      { name: "Sarah Davis", location: "Westside Project", status: "active" },
      { name: "Tom Wilson", location: "Office", status: "break" },
      { name: "Lisa Johnson", location: "Southend Mall", status: "active" }
    ]
  }
}

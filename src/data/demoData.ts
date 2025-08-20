
// Demo data for all product features - single source of truth
export const demoData = {
  aiVoice: {
    transcript: [
      { speaker: "Client", time: "14:32", text: "We need the deck project completed by March 15th for the spring party." },
      { speaker: "You", time: "14:33", text: "Absolutely, I'll send the updated timeline today." },
      { speaker: "Client", time: "14:34", text: "Also, can we add the lighting system we discussed?" },
      { speaker: "You", time: "14:35", text: "Yes, I'll include that in the revised estimate." }
    ],
    actionItems: [
      "Update project timeline for Johnson deck",
      "Set deadline reminder for March 15th", 
      "Send timeline document to client",
      "Add lighting system to estimate"
    ],
    callMetrics: {
      duration: "15:32",
      sentiment: "Positive",
      followUps: 4
    }
  },

  invoices: {
    recentInvoices: [
      { id: "INV-2024-001", client: "Johnson Construction", amount: 2450, status: "paid", date: "2024-01-15" },
      { id: "INV-2024-002", client: "Metro Realty", amount: 1890, status: "pending", date: "2024-01-18" },
      { id: "INV-2024-003", client: "Green Valley HOA", amount: 3200, status: "overdue", date: "2024-01-10" },
      { id: "INV-2024-004", client: "Sunrise Apartments", amount: 1650, status: "draft", date: "2024-01-20" }
    ],
    monthlyRevenue: [
      { month: "Oct", amount: 12500 },
      { month: "Nov", amount: 15200 },
      { month: "Dec", amount: 18900 },
      { month: "Jan", amount: 21300 }
    ],
    mrr: 12450
  },

  estimates: {
    activeEstimates: [
      {
        id: "EST-2024-001",
        client: "Johnson Construction",
        title: "Deck Construction",
        packages: [
          { name: "Basic Package", price: 8500, status: "under_review", features: ["12x16 pressure-treated deck", "Basic railing system", "Standard hardware"] },
          { name: "Premium Package", price: 12800, status: "approved", features: ["12x16 composite decking", "Designer railing with glass panels", "LED lighting system", "Built-in bench seating"] }
        ]
      }
    ],
    conversionRate: 68,
    avgValue: 9850
  },

  easyCalc: {
    calculations: [
      { type: "Markup Calculator", cost: 2500, markup: 45, sellingPrice: 3625, margin: 31.0 },
      { type: "Project Costing", materials: 1800, labor: 2400, overhead: 420, total: 4620 }
    ],
    templates: ["Standard Markup", "Service Pricing", "Material + Labor", "Hourly Rates"]
  },

  pipeline: {
    stages: [
      { name: "Leads", deals: 8, value: 45000, color: "blue" },
      { name: "Qualified", deals: 5, value: 32000, color: "yellow" },
      { name: "Proposal", deals: 3, value: 28000, color: "orange" },
      { name: "Closed", deals: 2, value: 18000, color: "green" }
    ],
    activeDeals: [
      { name: "Downtown Office Complex", value: 15000, stage: "Proposal", probability: 75 },
      { name: "Residential Renovation", value: 8000, stage: "Qualified", probability: 60 },
      { name: "Shopping Center Repair", value: 5000, stage: "Leads", probability: 25 }
    ],
    conversionRates: {
      leadsToQualified: 62,
      qualifiedToProposal: 60,
      proposalToClosed: 67
    }
  },

  featherTax: {
    upcomingDates: [
      { date: "2024-02-15", task: "Quarterly estimated taxes due", type: "payment" },
      { date: "2024-03-01", task: "Collect Q4 receipts", type: "document" },
      { date: "2024-03-15", task: "File annual tax return", type: "filing" },
      { date: "2024-04-15", task: "Final tax payment due", type: "payment" }
    ],
    documents: [
      { name: "Q4 2023 Receipts", count: 127, status: "complete" },
      { name: "1099 Forms", count: 3, status: "pending" },
      { name: "Expense Categories", count: 89, status: "complete" },
      { name: "Mileage Log", count: 45, status: "in_progress" }
    ],
    taxSavings: 3250,
    deductionsFound: 18
  },

  workOrders: {
    orders: [
      { id: "WO-2024-001", client: "Metro Properties", service: "HVAC Maintenance", status: "in_progress", assigned: "Mike Johnson", priority: "high" },
      { id: "WO-2024-002", client: "Sunrise Mall", service: "Electrical Repair", status: "scheduled", assigned: "Sarah Chen", priority: "medium" },
      { id: "WO-2024-003", client: "Green Valley HOA", service: "Plumbing Inspection", status: "completed", assigned: "David Wilson", priority: "low" },
      { id: "WO-2024-004", client: "Tech Campus", service: "Security System", status: "pending", assigned: "Lisa Garcia", priority: "high" }
    ],
    metrics: {
      totalOrders: 156,
      completedToday: 8,
      averageTime: "2.4 hours",
      satisfaction: 4.8
    },
    crew: [
      { name: "Mike Johnson", status: "active", location: "Downtown District" },
      { name: "Sarah Chen", status: "active", location: "North Side" },
      { name: "David Wilson", status: "break", location: "South Plaza" },
      { name: "Lisa Garcia", status: "active", location: "Tech District" }
    ]
  }
};

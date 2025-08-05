
// Document type display names
export const documentDisplayNames: Record<string, string> = {
  invoice: "Invoice",
  estimate: "Estimate", 
  quote: "Quote",
  proposal: "Business Proposal",
  contract: "Contract",
  workorder: "Work Order",
  salesorder: "Sales Order",
  bid: "Bid"
}

// Document-specific terms
export const documentTerms: Record<string, string> = {
  invoice: "Payment is due within 30 days from the date of this invoice.",
  estimate: "This estimate is valid for 30 days from the date issued.",
  quote: "This quote is valid for 30 days from the date issued.",
  proposal: "This proposal is valid for 30 days from the date issued.",
  contract: "This contract is subject to the terms and conditions outlined herein.",
  workorder: "Work to be completed as specified in this order.",
  salesorder: "Delivery terms and conditions apply as specified.",
  bid: "This bid is valid for 30 days from the submission date."
}

// Function name mapping for document types
export const functionNameMapping: Record<string, string> = {
  invoice: "generate_invoice_number",
  estimate: "generate_estimate_number",
  quote: "generate_quote_number",
  proposal: "generate_proposal_number",
  contract: "generate_contract_number",
  workorder: "generate_work_order_number",
  salesorder: "generate_salesorder_number",
  bid: "generate_bid_number",
  meeting: "generate_meeting_number",
  receipt: "generate_receipt_number"
}

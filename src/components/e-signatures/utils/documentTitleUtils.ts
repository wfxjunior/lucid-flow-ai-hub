
export const getDocumentTitle = (document: any, documentType: string) => {
  switch (documentType) {
    case 'invoice':
      return document.title || `Invoice #${document.invoice_number || document.number || document.id?.slice(0, 8)}`
    case 'estimate':
      return document.title || `Estimate #${document.estimate_number || document.number || document.id?.slice(0, 8)}`
    case 'quote':
      return document.title || `Quote #${document.quote_number || document.number || document.id?.slice(0, 8)}`
    case 'contract':
      return document.title || `Contract #${document.contract_number || document.number || document.id?.slice(0, 8)}`
    case 'workorder':
      return document.title || `Work Order #${document.work_order_number || document.number || document.id?.slice(0, 8)}`
    default:
      return document.title || document.name || 'Document'
  }
}

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export interface PDFGenerationOptions {
  filename?: string
  format?: 'a4' | 'letter'
  orientation?: 'portrait' | 'landscape'
  scale?: number
}

export interface BusinessData {
  companyName?: string
  companyAddress?: string
  companyPhone?: string
  companyEmail?: string
  companyLogo?: string
}

export class PDFService {
  private static defaultOptions: PDFGenerationOptions = {
    format: 'a4',
    orientation: 'portrait',
    scale: 2
  }

  static async generateFromElement(
    element: HTMLElement,
    options: PDFGenerationOptions = {}
  ): Promise<void> {
    const config = { ...this.defaultOptions, ...options }
    
    try {
      const canvas = await html2canvas(element, {
        scale: config.scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF(config.orientation, 'mm', config.format)
      
      const imgWidth = config.orientation === 'portrait' ? 210 : 297
      const pageHeight = config.orientation === 'portrait' ? 295 : 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      const filename = config.filename || `document_${Date.now()}.pdf`
      pdf.save(filename)
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw new Error('Failed to generate PDF')
    }
  }

  static async generateContractPDF(contract: any, businessData: BusinessData): Promise<void> {
    const element = this.createContractElement(contract, businessData)
    document.body.appendChild(element)
    
    try {
      await this.generateFromElement(element, {
        filename: `contract_${contract.title || 'document'}_${Date.now()}.pdf`
      })
    } finally {
      document.body.removeChild(element)
    }
  }

  static async generateWorkOrderPDF(workOrder: any, businessData: BusinessData): Promise<void> {
    const element = this.createWorkOrderElement(workOrder, businessData)
    document.body.appendChild(element)
    
    try {
      await this.generateFromElement(element, {
        filename: `work_order_${workOrder.work_order_number || workOrder.id}_${Date.now()}.pdf`
      })
    } finally {
      document.body.removeChild(element)
    }
  }

  static async generateEstimatePDF(estimate: any, businessData: BusinessData): Promise<void> {
    const element = this.createEstimateElement(estimate, businessData, 'ESTIMATE')
    document.body.appendChild(element)
    
    try {
      await this.generateFromElement(element, {
        filename: `estimate_${estimate.estimate_number || estimate.id}_${Date.now()}.pdf`
      })
    } finally {
      document.body.removeChild(element)
    }
  }

  static async generateQuotePDF(quote: any, businessData: BusinessData): Promise<void> {
    const element = this.createEstimateElement(quote, businessData, 'QUOTE')
    document.body.appendChild(element)
    
    try {
      await this.generateFromElement(element, {
        filename: `quote_${quote.quote_number || quote.id}_${Date.now()}.pdf`
      })
    } finally {
      document.body.removeChild(element)
    }
  }

  static async generateReceiptPDF(receipt: any, businessData: BusinessData): Promise<void> {
    const element = this.createReceiptElement(receipt, businessData)
    document.body.appendChild(element)
    
    try {
      await this.generateFromElement(element, {
        filename: `receipt_${receipt.receipt_number || receipt.id}_${Date.now()}.pdf`
      })
    } finally {
      document.body.removeChild(element)
    }
  }

  static async generateAnalyticsReportPDF(data: any, businessData: BusinessData): Promise<void> {
    const element = this.createAnalyticsElement(data, businessData)
    document.body.appendChild(element)
    
    try {
      await this.generateFromElement(element, {
        filename: `analytics_report_${Date.now()}.pdf`,
        orientation: 'landscape'
      })
    } finally {
      document.body.removeChild(element)
    }
  }

  private static createContractElement(contract: any, businessData: BusinessData): HTMLElement {
    const element = document.createElement('div')
    element.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      font-family: Arial, sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #333;
    `
    
    element.innerHTML = `
      <div style="border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0; font-size: 24pt; color: #2563eb;">${businessData.companyName || 'Company Name'}</h1>
            <p style="margin: 5px 0; color: #666;">${businessData.companyAddress || ''}</p>
            <p style="margin: 5px 0; color: #666;">${businessData.companyPhone || ''} | ${businessData.companyEmail || ''}</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 20pt;">CONTRACT</h2>
            <p style="margin: 5px 0; color: #666;">Date: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">${contract.title}</h3>
        <p style="margin: 10px 0;"><strong>Type:</strong> ${contract.contract_type}</p>
        <p style="margin: 10px 0;"><strong>Status:</strong> ${contract.status}</p>
        <p style="margin: 10px 0;"><strong>Created:</strong> ${new Date(contract.created_at).toLocaleDateString()}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h4 style="color: #333; margin-bottom: 15px;">Contract Terms</h4>
        <div style="white-space: pre-wrap; line-height: 1.8;">${contract.content}</div>
      </div>
      
      <div style="margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <p><strong>Client Signature:</strong></p>
            <div style="border-bottom: 1px solid #333; width: 200px; margin: 20px 0;"></div>
            <p>Date: _________________</p>
          </div>
          <div>
            <p><strong>Company Representative:</strong></p>
            <div style="border-bottom: 1px solid #333; width: 200px; margin: 20px 0;"></div>
            <p>Date: _________________</p>
          </div>
        </div>
      </div>
    `
    
    return element
  }

  private static createWorkOrderElement(workOrder: any, businessData: BusinessData): HTMLElement {
    const element = document.createElement('div')
    element.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      font-family: Arial, sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #333;
    `
    
    element.innerHTML = `
      <div style="border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0; font-size: 24pt; color: #2563eb;">${businessData.companyName || 'Company Name'}</h1>
            <p style="margin: 5px 0; color: #666;">${businessData.companyAddress || ''}</p>
            <p style="margin: 5px 0; color: #666;">${businessData.companyPhone || ''} | ${businessData.companyEmail || ''}</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 20pt;">WORK ORDER</h2>
            <p style="margin: 5px 0; color: #666;">#${workOrder.work_order_number || String(workOrder.id).slice(0, 8)}</p>
            <p style="margin: 5px 0; color: #666;">Date: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">${workOrder.title}</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
          <div>
            <p><strong>Client:</strong> ${workOrder.client?.name || 'N/A'}</p>
            <p><strong>Priority:</strong> ${workOrder.priority}</p>
            <p><strong>Status:</strong> ${workOrder.status}</p>
          </div>
          <div>
            <p><strong>Scheduled Date:</strong> ${workOrder.scheduled_date ? new Date(workOrder.scheduled_date).toLocaleDateString() : 'Not scheduled'}</p>
            <p><strong>Assigned To:</strong> ${workOrder.assigned_to || 'Unassigned'}</p>
            <p><strong>Estimated Hours:</strong> ${workOrder.estimated_hours || 'N/A'}</p>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h4 style="color: #333; margin-bottom: 15px;">Description</h4>
        <p style="background: #f9fafb; padding: 15px; border-radius: 5px;">${workOrder.description || 'No description provided'}</p>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h4 style="color: #333; margin-bottom: 15px;">Cost Breakdown</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f3f4f6;">
            <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left;">Item</th>
            <th style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">Amount</th>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;">Labor Cost</td>
            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">$${(workOrder.labor_cost || 0).toFixed(2)}</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;">Materials Cost</td>
            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">$${(workOrder.materials_cost || 0).toFixed(2)}</td>
          </tr>
          <tr style="background: #f3f4f6; font-weight: bold;">
            <td style="border: 1px solid #d1d5db; padding: 10px;">Total Cost</td>
            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">$${(workOrder.total_cost || 0).toFixed(2)}</td>
          </tr>
        </table>
      </div>
      
      ${workOrder.notes ? `
        <div style="margin-bottom: 30px;">
          <h4 style="color: #333; margin-bottom: 15px;">Notes</h4>
          <p style="background: #fef3c7; padding: 15px; border-radius: 5px;">${workOrder.notes}</p>
        </div>
      ` : ''}
    `
    
    return element
  }

  private static createEstimateElement(estimate: any, businessData: BusinessData, documentType: string = 'ESTIMATE'): HTMLElement {
    const element = document.createElement('div')
    element.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      font-family: Arial, sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #333;
    `
    
    const documentNumber = documentType === 'QUOTE' 
      ? (estimate.quote_number || String(estimate.id).slice(0, 8))
      : (estimate.estimate_number || String(estimate.id).slice(0, 8))
    
    element.innerHTML = `
      <div style="border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0; font-size: 24pt; color: #2563eb;">${businessData.companyName || 'Company Name'}</h1>
            <p style="margin: 5px 0; color: #666;">${businessData.companyAddress || ''}</p>
            <p style="margin: 5px 0; color: #666;">${businessData.companyPhone || ''} | ${businessData.companyEmail || ''}</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 20pt;">${documentType}</h2>
            <p style="margin: 5px 0; color: #666;">#${documentNumber}</p>
            <p style="margin: 5px 0; color: #666;">Date: ${estimate.estimate_date ? new Date(estimate.estimate_date).toLocaleDateString() : new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">${estimate.title}</h3>
        <p style="margin: 10px 0;"><strong>Status:</strong> ${estimate.status}</p>
        <p style="margin: 10px 0;"><strong>Amount:</strong> $${estimate.amount.toFixed(2)}</p>
        ${estimate.description ? `<p style="margin: 15px 0; background: #f9fafb; padding: 15px; border-radius: 5px;">${estimate.description}</p>` : ''}
      </div>
      
      <div style="margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
        <p style="text-align: center; color: #666; font-style: italic;">
          This ${documentType.toLowerCase()} is valid for 30 days from the date issued.
        </p>
        <div style="margin-top: 30px;">
          <p><strong>Client Acceptance:</strong></p>
          <div style="border-bottom: 1px solid #333; width: 200px; margin: 20px 0;"></div>
          <p>Signature: _________________ Date: _________________</p>
        </div>
      </div>
    `
    
    return element
  }

  private static createReceiptElement(receipt: any, businessData: BusinessData): HTMLElement {
    const element = document.createElement('div')
    element.style.cssText = `
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: white;
      font-family: Arial, sans-serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #333;
    `
    
    element.innerHTML = `
      <div style="border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0; font-size: 24pt; color: #2563eb;">${businessData.companyName || 'Company Name'}</h1>
            <p style="margin: 5px 0; color: #666;">${businessData.companyAddress || ''}</p>
            <p style="margin: 5px 0; color: #666;">${businessData.companyPhone || ''} | ${businessData.companyEmail || ''}</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 20pt;">RECEIPT</h2>
            <p style="margin: 5px 0; color: #666;">#${receipt.receipt_number}</p>
            <p style="margin: 5px 0; color: #666;">Date: ${new Date(receipt.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h3 style="color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Payment Receipt</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
          <div>
            <p><strong>Client:</strong> ${receipt.client?.name || 'N/A'}</p>
            <p><strong>Email:</strong> ${receipt.client?.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${receipt.client?.phone || 'N/A'}</p>
          </div>
          <div>
            <p><strong>Payment Method:</strong> ${receipt.payment_method}</p>
            <p><strong>Status:</strong> ${receipt.status || 'Paid'}</p>
            <p><strong>Amount:</strong> <span style="font-size: 16pt; font-weight: bold; color: #16a34a;">$${receipt.amount.toFixed(2)}</span></p>
          </div>
        </div>
      </div>
      
      ${receipt.client?.address ? `
        <div style="margin-bottom: 30px;">
          <h4 style="color: #333; margin-bottom: 15px;">Billing Address</h4>
          <p style="background: #f9fafb; padding: 15px; border-radius: 5px;">${receipt.client.address}</p>
        </div>
      ` : ''}
      
      <div style="margin-bottom: 30px;">
        <h4 style="color: #333; margin-bottom: 15px;">Payment Details</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f3f4f6;">
            <th style="border: 1px solid #d1d5db; padding: 10px; text-align: left;">Description</th>
            <th style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">Amount</th>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 10px;">${receipt.notes || 'Payment Received'}</td>
            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right;">$${receipt.amount.toFixed(2)}</td>
          </tr>
          <tr style="background: #dcfce7; font-weight: bold;">
            <td style="border: 1px solid #d1d5db; padding: 10px;">Total Paid</td>
            <td style="border: 1px solid #d1d5db; padding: 10px; text-align: right; color: #16a34a;">$${receipt.amount.toFixed(2)}</td>
          </tr>
        </table>
      </div>
      
      <div style="margin-bottom: 30px;">
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
          <h4 style="margin: 0 0 10px 0; color: #1e40af;">Payment Confirmation</h4>
          <p style="margin: 0; color: #374151;">
            This receipt confirms that payment has been ${receipt.status === 'paid' ? 'successfully received' : 'recorded as pending'} 
            for the amount of $${receipt.amount.toFixed(2)} via ${receipt.payment_method}.
          </p>
        </div>
      </div>
      
      <div style="margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
        <p style="margin: 0; color: #666; font-style: italic;">
          Thank you for your business!
        </p>
        <p style="margin: 5px 0; color: #666; font-size: 10pt;">
          This is an official receipt for your records.
        </p>
      </div>
    `
    
    return element
  }

  private static createAnalyticsElement(data: any, businessData: BusinessData): HTMLElement {
    const element = document.createElement('div')
    element.style.cssText = `
      width: 297mm;
      min-height: 210mm;
      padding: 20mm;
      background: white;
      font-family: Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #333;
    `
    
    const currentDate = new Date().toLocaleDateString()
    
    element.innerHTML = `
      <div style="border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 25px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="margin: 0; font-size: 20pt; color: #2563eb;">${businessData.companyName || 'Company Name'}</h1>
            <p style="margin: 5px 0; color: #666;">Business Analytics Report</p>
          </div>
          <div style="text-align: right;">
            <h2 style="margin: 0; font-size: 16pt;">ANALYTICS REPORT</h2>
            <p style="margin: 5px 0; color: #666;">Generated: ${currentDate}</p>
          </div>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 15px; margin-bottom: 25px;">
        <div style="background: #f0f9ff; padding: 15px; border-radius: 5px; text-align: center;">
          <h4 style="margin: 0; color: #0369a1;">Total Revenue</h4>
          <p style="margin: 5px 0; font-size: 18pt; font-weight: bold;">$${data.totalRevenue || '0'}</p>
        </div>
        <div style="background: #f0fdf4; padding: 15px; border-radius: 5px; text-align: center;">
          <h4 style="margin: 0; color: #15803d;">Active Clients</h4>
          <p style="margin: 5px 0; font-size: 18pt; font-weight: bold;">${data.activeClients || '0'}</p>
        </div>
        <div style="background: #fefce8; padding: 15px; border-radius: 5px; text-align: center;">
          <h4 style="margin: 0; color: #a16207;">Pending Projects</h4>
          <p style="margin: 5px 0; font-size: 18pt; font-weight: bold;">${data.pendingProjects || '0'}</p>
        </div>
        <div style="background: #fdf2f8; padding: 15px; border-radius: 5px; text-align: center;">
          <h4 style="margin: 0; color: #be185d;">Growth Rate</h4>
          <p style="margin: 5px 0; font-size: 18pt; font-weight: bold;">${data.growthRate || '0'}%</p>
        </div>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h3 style="color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Performance Summary</h3>
        <div style="background: #f9fafb; padding: 15px; border-radius: 5px; margin: 10px 0;">
          <p>This report provides an overview of your business performance metrics and key indicators.</p>
          <p>Data compiled from all business activities including work orders, estimates, contracts, and client interactions.</p>
        </div>
      </div>
      
      <div style="margin-bottom: 25px;">
        <h3 style="color: #2563eb; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px;">Key Metrics</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <tr style="background: #f3f4f6;">
            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">Metric</th>
            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">Current Period</th>
            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">Previous Period</th>
            <th style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">Change</th>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 8px;">Work Orders Completed</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">${data.completedWorkOrders || '0'}</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">${data.previousCompletedWorkOrders || '0'}</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right; color: #059669;">+${data.workOrdersChange || '0'}%</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 8px;">Estimates Sent</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">${data.estimatesSent || '0'}</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">${data.previousEstimatesSent || '0'}</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right; color: #059669;">+${data.estimatesChange || '0'}%</td>
          </tr>
          <tr>
            <td style="border: 1px solid #d1d5db; padding: 8px;">Contracts Signed</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">${data.contractsSigned || '0'}</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right;">${data.previousContractsSigned || '0'}</td>
            <td style="border: 1px solid #d1d5db; padding: 8px; text-align: right; color: #059669;">+${data.contractsChange || '0'}%</td>
          </tr>
        </table>
      </div>
      
      <div style="margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px; text-align: center; color: #666; font-size: 9pt;">
        <p>Generated by FeatherBiz Analytics • ${currentDate}</p>
        <p>This report contains confidential business information</p>
      </div>
    `
    
    return element
  }
}

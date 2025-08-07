
import React from 'react'
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer'

// Professional invoice template styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingBottom: 20,
    borderBottom: '3px solid #3b82f6'
  },
  companySection: {
    flexDirection: 'column',
    maxWidth: '50%'
  },
  companyLogo: {
    width: 80,
    height: 80,
    marginBottom: 8
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8
  },
  companyDetails: {
    fontSize: 11,
    color: '#6b7280',
    lineHeight: 1.5,
    marginBottom: 2
  },
  invoiceSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: '50%'
  },
  invoiceTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8
  },
  invoiceNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4
  },
  invoiceDate: {
    fontSize: 11,
    color: '#6b7280'
  },
  billToSection: {
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  clientInfo: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    borderLeft: '4px solid #3b82f6'
  },
  clientName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4
  },
  clientDetails: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 2
  },
  invoiceDetailsSection: {
    marginBottom: 30
  },
  invoiceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 8
  },
  metaItem: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  metaLabel: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  metaValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#334155'
  },
  itemsTable: {
    marginBottom: 30
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    padding: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  tableHeaderText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #e2e8f0',
    padding: 12,
    minHeight: 40,
    alignItems: 'center'
  },
  tableRowAlt: {
    backgroundColor: '#f8fafc'
  },
  tableCell: {
    fontSize: 11,
    color: '#374151'
  },
  tableCellBold: {
    fontSize: 11,
    color: '#1f2937',
    fontWeight: 'bold'
  },
  // Column widths
  descCol: { width: '45%' },
  qtyCol: { width: '15%', textAlign: 'center' },
  rateCol: { width: '20%', textAlign: 'right' },
  amountCol: { width: '20%', textAlign: 'right' },
  totalsSection: {
    marginTop: 20,
    marginLeft: '60%'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottom: '1px solid #e2e8f0'
  },
  totalRowFinal: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    marginTop: 8
  },
  totalLabel: {
    fontSize: 12,
    color: '#374151'
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  totalLabelFinal: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  totalValueFinal: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  notesSection: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#fefce8',
    borderRadius: 8,
    borderLeft: '4px solid #eab308'
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 8,
    textTransform: 'uppercase'
  },
  notesText: {
    fontSize: 11,
    color: '#451a03',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTop: '1px solid #e2e8f0',
    paddingTop: 16
  },
  footerText: {
    fontSize: 9,
    color: '#9ca3af'
  }
})

interface InvoiceData {
  invoiceNumber: string
  invoiceDate: string
  dueDate?: string
  title: string
  documentTitle?: string
  companyInfo: {
    name: string
    address: string
    phone: string
    email: string
    logo?: string
  }
  clientInfo: {
    name: string
    email: string
    phone?: string
    address?: string
  }
  lineItems: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
  totals: {
    subtotal: number
    discount: number
    tax: number
    total: number
  }
  notes?: string
  status: string
}

export const InvoicePDFTemplate = ({ invoiceData }: { invoiceData: InvoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companySection}>
          {invoiceData.companyInfo.logo && (
            <Image src={invoiceData.companyInfo.logo} style={styles.companyLogo} />
          )}
          <Text style={styles.companyName}>{invoiceData.companyInfo.name}</Text>
          <Text style={styles.companyDetails}>{invoiceData.companyInfo.address}</Text>
          <Text style={styles.companyDetails}>{invoiceData.companyInfo.phone}</Text>
          <Text style={styles.companyDetails}>{invoiceData.companyInfo.email}</Text>
        </View>
        <View style={styles.invoiceSection}>
          <Text style={styles.invoiceTitle}>{invoiceData.documentTitle || 'INVOICE'}</Text>
          <Text style={styles.invoiceNumber}>#{invoiceData.invoiceNumber}</Text>
          <Text style={styles.invoiceDate}>Date: {invoiceData.invoiceDate}</Text>
          {invoiceData.dueDate && (
            <Text style={styles.invoiceDate}>Due: {invoiceData.dueDate}</Text>
          )}
        </View>
      </View>

      {/* Bill To Section */}
      <View style={styles.billToSection}>
        <Text style={styles.sectionTitle}>Bill To</Text>
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{invoiceData.clientInfo.name}</Text>
          <Text style={styles.clientDetails}>{invoiceData.clientInfo.email}</Text>
          {invoiceData.clientInfo.phone && (
            <Text style={styles.clientDetails}>{invoiceData.clientInfo.phone}</Text>
          )}
          {invoiceData.clientInfo.address && (
            <Text style={styles.clientDetails}>{invoiceData.clientInfo.address}</Text>
          )}
        </View>
      </View>

      {/* Invoice Details */}
      <View style={styles.invoiceDetailsSection}>
        <Text style={styles.sectionTitle}>Invoice Details</Text>
        <View style={styles.invoiceMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Project</Text>
            <Text style={styles.metaValue}>{invoiceData.title}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Status</Text>
            <Text style={styles.metaValue}>{invoiceData.status.toUpperCase()}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Amount Due</Text>
            <Text style={styles.metaValue}>${invoiceData.totals.total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Line Items Table */}
      <View style={styles.itemsTable}>
        <View style={styles.tableHeader}>
          <View style={[styles.descCol]}>
            <Text style={styles.tableHeaderText}>Description</Text>
          </View>
          <View style={[styles.qtyCol]}>
            <Text style={styles.tableHeaderText}>Qty</Text>
          </View>
          <View style={[styles.rateCol]}>
            <Text style={styles.tableHeaderText}>Rate</Text>
          </View>
          <View style={[styles.amountCol]}>
            <Text style={styles.tableHeaderText}>Amount</Text>
          </View>
        </View>

        {invoiceData.lineItems.map((item, index) => (
          <View 
            key={index} 
            style={[
              styles.tableRow, 
              index % 2 === 1 ? styles.tableRowAlt : {}
            ]}
          >
            <View style={[styles.descCol]}>
              <Text style={styles.tableCellBold}>{item.description}</Text>
            </View>
            <View style={[styles.qtyCol]}>
              <Text style={styles.tableCell}>{item.quantity}</Text>
            </View>
            <View style={[styles.rateCol]}>
              <Text style={styles.tableCell}>${item.rate.toFixed(2)}</Text>
            </View>
            <View style={[styles.amountCol]}>
              <Text style={styles.tableCellBold}>${item.amount.toFixed(2)}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Totals Section */}
      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>${invoiceData.totals.subtotal.toFixed(2)}</Text>
        </View>
        {invoiceData.totals.discount > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount:</Text>
            <Text style={styles.totalValue}>-${invoiceData.totals.discount.toFixed(2)}</Text>
          </View>
        )}
        {invoiceData.totals.tax > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax:</Text>
            <Text style={styles.totalValue}>${invoiceData.totals.tax.toFixed(2)}</Text>
          </View>
        )}
        <View style={[styles.totalRow, styles.totalRowFinal]}>
          <Text style={styles.totalLabelFinal}>Total:</Text>
          <Text style={styles.totalValueFinal}>${invoiceData.totals.total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Notes Section */}
      {invoiceData.notes && (
        <View style={styles.notesSection}>
          <Text style={styles.notesTitle}>Notes & Terms</Text>
          <Text style={styles.notesText}>{invoiceData.notes}</Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Thank you for your business! • Generated on {new Date().toLocaleDateString()}
        </Text>
      </View>
    </Page>
  </Document>
)

export const generateInvoicePDF = async (invoiceData: InvoiceData) => {
  const doc = <InvoicePDFTemplate invoiceData={invoiceData} />
  const blob = await pdf(doc).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `invoice_${invoiceData.invoiceNumber}_${Date.now()}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}


import React from 'react'
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer'
import { BusinessData } from './pdfService'

// Estilos otimizados para React-PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
    fontFamily: 'Helvetica'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '2px solid #333333',
    paddingBottom: 15,
    marginBottom: 20
  },
  companyInfo: {
    flexDirection: 'column'
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 5
  },
  companyDetails: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  documentDate: {
    fontSize: 10,
    color: '#666666',
    textAlign: 'right',
    marginTop: 5
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 8,
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    width: '30%'
  },
  value: {
    fontSize: 11,
    width: '70%'
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d1d5db'
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f3f4f6',
    padding: 8
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 8
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  tableCell: {
    fontSize: 10
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#666666',
    borderTop: '1px solid #e5e7eb',
    paddingTop: 10
  }
})

// Componente de Contrato
const ContractPDF = ({ contract, businessData }: { contract: any, businessData: BusinessData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{businessData.companyName || 'Company Name'}</Text>
          <Text style={styles.companyDetails}>{businessData.companyAddress}</Text>
          <Text style={styles.companyDetails}>{businessData.companyPhone} | {businessData.companyEmail}</Text>
        </View>
        <View>
          <Text style={styles.documentTitle}>CONTRATO</Text>
          <Text style={styles.documentDate}>Data: {new Date().toLocaleDateString('pt-BR')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{contract.title}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{contract.contract_type}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{contract.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Criado em:</Text>
          <Text style={styles.value}>{new Date(contract.created_at).toLocaleDateString('pt-BR')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Termos do Contrato</Text>
        <Text style={{ fontSize: 11, lineHeight: 1.5 }}>{contract.content}</Text>
      </View>

      <View style={styles.footer}>
        <Text>Documento gerado automaticamente pelo FeatherBiz • {new Date().toLocaleDateString('pt-BR')}</Text>
      </View>
    </Page>
  </Document>
)

// Componente de Orçamento
const EstimatePDF = ({ estimate, businessData }: { estimate: any, businessData: BusinessData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{businessData.companyName || 'Company Name'}</Text>
          <Text style={styles.companyDetails}>{businessData.companyAddress}</Text>
          <Text style={styles.companyDetails}>{businessData.companyPhone} | {businessData.companyEmail}</Text>
        </View>
        <View>
          <Text style={styles.documentTitle}>ORÇAMENTO</Text>
          <Text style={styles.documentDate}>#{estimate.estimate_number || estimate.id.slice(0, 8)}</Text>
          <Text style={styles.documentDate}>Data: {estimate.estimate_date ? new Date(estimate.estimate_date).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{estimate.title}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{estimate.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Valor:</Text>
          <Text style={styles.value}>R$ {estimate.amount.toFixed(2)}</Text>
        </View>
        {estimate.description && (
          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 11, backgroundColor: '#f9fafb', padding: 10 }}>{estimate.description}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text>Este orçamento é válido por 30 dias a partir da data de emissão.</Text>
        <Text>Documento gerado pelo FeatherBiz • {new Date().toLocaleDateString('pt-BR')}</Text>
      </View>
    </Page>
  </Document>
)

// Componente de Ordem de Serviço
const WorkOrderPDF = ({ workOrder, businessData }: { workOrder: any, businessData: BusinessData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{businessData.companyName || 'Company Name'}</Text>
          <Text style={styles.companyDetails}>{businessData.companyAddress}</Text>
          <Text style={styles.companyDetails}>{businessData.companyPhone} | {businessData.companyEmail}</Text>
        </View>
        <View>
          <Text style={styles.documentTitle}>ORDEM DE SERVIÇO</Text>
          <Text style={styles.documentDate}>#{workOrder.work_order_number || workOrder.id.slice(0, 8)}</Text>
          <Text style={styles.documentDate}>Data: {new Date().toLocaleDateString('pt-BR')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{workOrder.title}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Cliente:</Text>
          <Text style={styles.value}>{workOrder.client?.name || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Prioridade:</Text>
          <Text style={styles.value}>{workOrder.priority}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{workOrder.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Data Agendada:</Text>
          <Text style={styles.value}>{workOrder.scheduled_date ? new Date(workOrder.scheduled_date).toLocaleDateString('pt-BR') : 'Não agendado'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descrição</Text>
        <Text style={{ fontSize: 11, backgroundColor: '#f9fafb', padding: 10 }}>{workOrder.description || 'Nenhuma descrição fornecida'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo de Custos</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Item</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Valor</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Custo de Mão de Obra</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>R$ {(workOrder.labor_cost || 0).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Custo de Materiais</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>R$ {(workOrder.materials_cost || 0).toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={[styles.tableCol, { backgroundColor: '#f3f4f6' }]}>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Custo Total</Text>
            </View>
            <View style={[styles.tableCol, { backgroundColor: '#f3f4f6' }]}>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>R$ {(workOrder.total_cost || 0).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text>Documento gerado pelo FeatherBiz • {new Date().toLocaleDateString('pt-BR')}</Text>
      </View>
    </Page>
  </Document>
)

// Serviço principal React-PDF
export class ReactPDFService {
  private static businessData: BusinessData = {
    companyName: "FeatherBiz",
    companyAddress: "123 Business St, Suite 100, Business City, BC 12345",
    companyPhone: "(555) 123-4567",
    companyEmail: "info@featherbiz.com"
  }

  static async generateContractPDF(contract: any): Promise<void> {
    const doc = <ContractPDF contract={contract} businessData={this.businessData} />
    const blob = await pdf(doc).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `contrato_${contract.title || 'documento'}_${Date.now()}.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }

  static async generateEstimatePDF(estimate: any): Promise<void> {
    const doc = <EstimatePDF estimate={estimate} businessData={this.businessData} />
    const blob = await pdf(doc).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `orcamento_${estimate.estimate_number || estimate.id}_${Date.now()}.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }

  static async generateWorkOrderPDF(workOrder: any): Promise<void> {
    const doc = <WorkOrderPDF workOrder={workOrder} businessData={this.businessData} />
    const blob = await pdf(doc).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `ordem_servico_${workOrder.work_order_number || workOrder.id}_${Date.now()}.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }

  static async generateAnalyticsReportPDF(data: any): Promise<void> {
    const doc = (
      <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.header}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{this.businessData.companyName}</Text>
              <Text style={styles.companyDetails}>Relatório de Analytics</Text>
            </View>
            <View>
              <Text style={styles.documentTitle}>RELATÓRIO DE ANALYTICS</Text>
              <Text style={styles.documentDate}>Gerado: {new Date().toLocaleDateString('pt-BR')}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumo de Performance</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Receita Total:</Text>
              <Text style={styles.value}>R$ {data.totalRevenue || '0'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Clientes Ativos:</Text>
              <Text style={styles.value}>{data.activeClients || '0'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Projetos Pendentes:</Text>
              <Text style={styles.value}>{data.pendingProjects || '0'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Taxa de Crescimento:</Text>
              <Text style={styles.value}>{data.growthRate || '0'}%</Text>
            </View>
          </View>

          <View style={styles.footer}>
            <Text>Gerado pelo FeatherBiz Analytics • {new Date().toLocaleDateString('pt-BR')}</Text>
            <Text>Este relatório contém informações confidenciais do negócio</Text>
          </View>
        </Page>
      </Document>
    )

    const blob = await pdf(doc).toBlob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `relatorio_analytics_${Date.now()}.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }
}

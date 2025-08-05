
import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { FileText, Download, Upload, Eye } from "lucide-react"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface CompanyData {
  name: string
  address: string
  phone: string
  email: string
  logo?: string
}

interface ClientData {
  name: string
  address: string
  phone: string
  email: string
}

interface DocumentData {
  type: string
  title: string
  description: string
  items: Array<{
    description: string
    quantity: number
    price: number
  }>
  total: number
  date: string
  dueDate?: string
}

export function PDFGenerator() {
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "",
    address: "",
    phone: "",
    email: "",
    logo: ""
  })
  
  const [clientData, setClientData] = useState<ClientData>({
    name: "",
    address: "",
    phone: "",
    email: ""
  })
  
  const [documentData, setDocumentData] = useState<DocumentData>({
    type: "invoice",
    title: "Fatura",
    description: "",
    items: [{ description: "", quantity: 1, price: 0 }],
    total: 0,
    date: new Date().toISOString().split('T')[0],
    dueDate: ""
  })
  
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const pdfPreviewRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setLogoPreview(result)
        setCompanyData(prev => ({ ...prev, logo: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addItem = () => {
    setDocumentData(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, price: 0 }]
    }))
  }

  const removeItem = (index: number) => {
    setDocumentData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  const updateItem = (index: number, field: string, value: any) => {
    setDocumentData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
    calculateTotal()
  }

  const calculateTotal = () => {
    const total = documentData.items.reduce((sum, item) => {
      return sum + (item.quantity * item.price)
    }, 0)
    setDocumentData(prev => ({ ...prev, total }))
  }

  const generatePDF = async () => {
    if (!pdfPreviewRef.current) return

    setIsGenerating(true)
    
    try {
      const canvas = await html2canvas(pdfPreviewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
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

      const fileName = `${documentData.type}_${companyData.name || 'document'}_${Date.now()}.pdf`
      pdf.save(fileName)
      
      toast({
        title: "Success",
        description: "PDF generated and downloaded successfully!"
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast({
        title: "Error",
        description: "Could not generate PDF.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration Form */}
        <div className="space-y-6">
          {/* Company Data */}
          <Card>
            <CardHeader>
              <CardTitle>Company Data</CardTitle>
              <CardDescription>Information that will appear in the document header</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-logo">Company Logo</Label>
                <Input
                  id="company-logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                {logoPreview && (
                  <img src={logoPreview} alt="Logo preview" className="h-24 w-auto" />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={companyData.name}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your Company Ltd"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Address</Label>
                <Textarea
                  id="company-address"
                  value={companyData.address}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Street, number, district, city, ZIP"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Phone</Label>
                  <Input
                    id="company-phone"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={companyData.email}
                    onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contact@company.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Data */}
          <Card>
            <CardHeader>
              <CardTitle>Client Data</CardTitle>
              <CardDescription>Information of the client who will receive the document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client-name">Client Name</Label>
                <Input
                  id="client-name"
                  value={clientData.name}
                  onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Client Name or Company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-address">Address</Label>
                <Textarea
                  id="client-address"
                  value={clientData.address}
                  onChange={(e) => setClientData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Client's complete address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-phone">Phone</Label>
                  <Input
                    id="client-phone"
                    value={clientData.phone}
                    onChange={(e) => setClientData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-email">Email</Label>
                  <Input
                    id="client-email"
                    type="email"
                    value={clientData.email}
                    onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="client@email.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Information */}
          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
              <CardDescription>Configure document type and content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doc-type">Document Type</Label>
                <Select value={documentData.type} onValueChange={(value) => setDocumentData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="quote">Quote</SelectItem>
                    <SelectItem value="receipt">Receipt</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-title">Document Title</Label>
                <Input
                  id="doc-title"
                  value={documentData.title}
                  onChange={(e) => setDocumentData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Fatura #001"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-date">Date</Label>
                  <Input
                    id="doc-date"
                    type="date"
                    value={documentData.date}
                    onChange={(e) => setDocumentData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-due-date">Due Date</Label>
                  <Input
                    id="doc-due-date"
                    type="date"
                    value={documentData.dueDate}
                    onChange={(e) => setDocumentData(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-description">Description</Label>
                <Textarea
                  id="doc-description"
                  value={documentData.description}
                  onChange={(e) => setDocumentData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Additional document description"
                />
              </div>
            </CardContent>
          </Card>

          {/* Itens do Documento */}
          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
              <CardDescription>Add document items/services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {documentData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-6 gap-2 items-end">
                  <div className="col-span-3">
                    <Label>Description</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      placeholder="Item description"
                    />
                  </div>
                  <div>
                    <Label>Qtd</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                      min="1"
                    />
                  </div>
                  <div>
                    <Label>Preço</Label>
                    <Input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                      step="0.01"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(index)}
                    disabled={documentData.items.length === 1}
                  >
                    Remover
                  </Button>
                </div>
              ))}
              <Button onClick={addItem} variant="outline">
                Adicionar Item
              </Button>
              <div className="text-right font-bold">
                Total: R$ {documentData.total.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Button onClick={generatePDF} disabled={isGenerating} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating PDF..." : "Generate and Download PDF"}
          </Button>
        </div>

        {/* Preview do PDF */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Preview do Documento
              </CardTitle>
              <CardDescription>Visualização de como o PDF será gerado</CardDescription>
            </CardHeader>
            <CardContent>
              <div ref={pdfPreviewRef} className="bg-white p-8 border shadow-lg" style={{ minHeight: '800px' }}>
                {/* Cabeçalho */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    {logoPreview && (
                      <img src={logoPreview} alt="Logo" className="h-24 w-auto" />
                    )}
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">{companyData.name || "Nome da Empresa"}</h1>
                      <p className="text-sm text-gray-600">{companyData.address}</p>
                      <p className="text-sm text-gray-600">{companyData.phone} | {companyData.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-xl font-bold text-gray-800">{documentData.title}</h2>
                    <p className="text-sm text-gray-600">Data: {documentData.date}</p>
                    {documentData.dueDate && (
                      <p className="text-sm text-gray-600">Vencimento: {documentData.dueDate}</p>
                    )}
                  </div>
                </div>

                {/* Dados do Cliente */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Para:</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium">{clientData.name || "Nome do Cliente"}</p>
                    <p className="text-sm text-gray-600">{clientData.address}</p>
                    <p className="text-sm text-gray-600">{clientData.phone} | {clientData.email}</p>
                  </div>
                </div>

                {/* Descrição */}
                {documentData.description && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Descrição:</h3>
                    <p className="text-gray-600">{documentData.description}</p>
                  </div>
                )}

                {/* Tabela de Itens */}
                <div className="mb-8">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2 text-left">Descrição</th>
                        <th className="border border-gray-300 p-2 text-center">Qtd</th>
                        <th className="border border-gray-300 p-2 text-right">Preço Unit.</th>
                        <th className="border border-gray-300 p-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentData.items.map((item, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">{item.description || "Item não informado"}</td>
                          <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
                          <td className="border border-gray-300 p-2 text-right">R$ {item.price.toFixed(2)}</td>
                          <td className="border border-gray-300 p-2 text-right">R$ {(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-100 font-bold">
                        <td colSpan={3} className="border border-gray-300 p-2 text-right">Total Geral:</td>
                        <td className="border border-gray-300 p-2 text-right">R$ {documentData.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Rodapé */}
                <div className="text-center text-sm text-gray-500 mt-16">
                  <p>Documento gerado automaticamente pelo FeatherBiz</p>
                  <p>Data de geração: {new Date().toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

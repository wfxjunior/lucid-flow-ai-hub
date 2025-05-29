
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Link, Copy, FileText, Calendar, User, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DocumentView {
  id: string
  documentId: string
  documentName: string
  clientName: string
  secretLink: string
  openedAt: string
  ipAddress: string
  location: string
  userAgent: string
}

export function DocumentTracker() {
  const [documentViews, setDocumentViews] = useState<DocumentView[]>([])
  const { toast } = useToast()

  // Simular dados de visualizações de documentos
  useEffect(() => {
    const mockData: DocumentView[] = [
      {
        id: "1",
        documentId: "DOC-001",
        documentName: "Proposta Comercial - Projeto Website",
        clientName: "João Silva",
        secretLink: "https://docs.businessflow.com/view/a7f3b2c8-e1d9-4f6a-b3c7-8e2f1a9d5c6b",
        openedAt: "2024-01-15T14:30:00Z",
        ipAddress: "192.168.1.100",
        location: "São Paulo, SP",
        userAgent: "Chrome 120.0"
      },
      {
        id: "2", 
        documentId: "DOC-002",
        documentName: "Contrato de Serviços - Marketing Digital",
        clientName: "Maria Santos",
        secretLink: "https://docs.businessflow.com/view/b8e4c3d9-f2e0-5g7b-c4d8-9f3g2b0e6d7c",
        openedAt: "2024-01-15T16:45:00Z",
        ipAddress: "10.0.0.50",
        location: "Rio de Janeiro, RJ",
        userAgent: "Safari 17.0"
      },
      {
        id: "3",
        documentId: "DOC-003", 
        documentName: "Orçamento - Sistema ERP",
        clientName: "Tech Solutions LTDA",
        secretLink: "https://docs.businessflow.com/view/c9f5d4e0-g3f1-6h8c-d5e9-0g4h3c1f7e8d",
        openedAt: "2024-01-14T10:15:00Z",
        ipAddress: "172.16.0.25",
        location: "Belo Horizonte, MG", 
        userAgent: "Firefox 121.0"
      }
    ]
    setDocumentViews(mockData)
  }, [])

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: "Link copiado!",
      description: "O link secreto foi copiado para a área de transferência.",
    })
  }

  const generateNewSecretLink = (documentId: string) => {
    const newSecret = `https://docs.businessflow.com/view/${crypto.randomUUID()}`
    setDocumentViews(prev => 
      prev.map(view => 
        view.documentId === documentId 
          ? { ...view, secretLink: newSecret }
          : view
      )
    )
    toast({
      title: "Novo link gerado!",
      description: "Um novo link secreto foi criado para este documento.",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Tracking de Documentos
          </CardTitle>
          <CardDescription>
            Links secretos gerados quando clientes abrem documentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {documentViews.map((view) => (
              <Card key={view.id} className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {view.documentName}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {view.clientName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(view.openedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {view.location}
                        </span>
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {view.documentId}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Link Secreto Gerado:
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-xs bg-white p-2 rounded border font-mono">
                        {view.secretLink}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(view.secretLink)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">IP do Cliente:</span>
                      <p className="text-muted-foreground">{view.ipAddress}</p>
                    </div>
                    <div>
                      <span className="font-medium">Navegador:</span>
                      <p className="text-muted-foreground">{view.userAgent}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => generateNewSecretLink(view.documentId)}
                    >
                      <Link className="h-3 w-3 mr-1" />
                      Gerar Novo Link
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Ver Histórico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas de Documentos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentos Visualizados</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentViews.length}</div>
            <p className="text-xs text-muted-foreground">
              Últimas 24 horas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Links Ativos</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentViews.length}</div>
            <p className="text-xs text-muted-foreground">
              Links secretos gerados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Abertura</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-green-600">
              +5% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

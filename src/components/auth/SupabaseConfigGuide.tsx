
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, Settings, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SupabaseConfigGuide() {
  const projectId = "tvdromfazjzargvesruq"
  const currentDomain = window.location.origin
  const customDomain = "https://featherbiz.com"
  
  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Configuração do Supabase Necessária
        </CardTitle>
        <CardDescription>
          Para resolver o aviso do Supabase e garantir que a autenticação funcione corretamente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertDescription>
            Você precisa configurar as URLs de redirecionamento no Supabase para que a autenticação funcione nos dois domínios.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-3">
          <h4 className="font-medium">Passos para configurar:</h4>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Acesse o painel do Supabase</li>
            <li>Vá em <strong>Authentication → URL Configuration</strong></li>
            <li>Configure o <strong>Site URL</strong> como: <code className="bg-gray-100 px-2 py-1 rounded">{customDomain}</code></li>
            <li>Adicione as seguintes <strong>Redirect URLs</strong>:</li>
          </ol>
          
          <div className="bg-gray-50 p-3 rounded-lg space-y-1 text-sm font-mono">
            <div>{customDomain}</div>
            <div>{currentDomain}</div>
            <div>{customDomain}/auth</div>
            <div>{currentDomain}/auth</div>
          </div>
        </div>
        
        <Button asChild className="w-full">
          <a 
            href={`https://supabase.com/dashboard/project/${projectId}/auth/providers`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Abrir Configurações do Supabase
          </a>
        </Button>
        
        <div className="text-xs text-gray-600">
          <p><strong>Nota:</strong> Após fazer essas configurações, o aviso do Supabase será resolvido e a autenticação funcionará corretamente em ambos os domínios.</p>
        </div>
      </CardContent>
    </Card>
  )
}

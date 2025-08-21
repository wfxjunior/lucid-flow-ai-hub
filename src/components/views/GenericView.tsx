
import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface GenericViewProps {
  title: string
  description: string
  icon: LucideIcon
}

export function GenericView({ title, description, icon: Icon }: GenericViewProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao {title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Esta funcionalidade está sendo desenvolvida. Em breve você terá acesso a todas as ferramentas necessárias.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Funcionalidades planejadas:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Interface intuitiva e fácil de usar</li>
                <li>• Integração com outras ferramentas</li>
                <li>• Relatórios detalhados</li>
                <li>• Suporte completo</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Status do desenvolvimento:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Interface básica</span>
                  <span className="text-green-600">✓ Concluído</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Funcionalidades core</span>
                  <span className="text-yellow-600">⏳ Em desenvolvimento</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Testes e refinamento</span>
                  <span className="text-gray-400">⏸ Planejado</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, CreditCard, PieChart, BarChart3, Plus, Eye } from 'lucide-react'

interface FinancePageProps {
  onNavigate: (view: string) => void
}

export function FinancePage({ onNavigate }: FinancePageProps) {
  const [financialData] = useState({
    totalReceita: 125000,
    totalDespesas: 85000,
    lucroLiquido: 40000,
    contasReceber: 35000,
    contasPagar: 22000,
    fluxoCaixa: 13000,
    crescimentoMensal: 8.5,
    margemLucro: 32
  })

  const [transacoes] = useState([
    { id: 1, tipo: "Receita", descricao: "Pagamento - Casa Silva", valor: 15000, data: "2024-02-15", status: "Confirmado" },
    { id: 2, tipo: "Despesa", descricao: "Compra de Materiais", valor: -8500, data: "2024-02-14", status: "Pago" },
    { id: 3, tipo: "Receita", descricao: "Sinal - Projeto TechCorp", valor: 25000, data: "2024-02-12", status: "Pendente" },
    { id: 4, tipo: "Despesa", descricao: "Salários da Equipe", valor: -12000, data: "2024-02-10", status: "Pago" },
    { id: 5, tipo: "Receita", descricao: "Consultoria Arquitetônica", valor: 5500, data: "2024-02-08", status: "Confirmado" }
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(value))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Centro Financeiro</h1>
          <p className="text-muted-foreground mt-2">Visão completa das suas finanças empresariais</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onNavigate('feather-budget')}>
            <PieChart className="h-4 w-4 mr-2" />
            Orçamentos
          </Button>
          <Button onClick={() => onNavigate('accounting')}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Transação
          </Button>
        </div>
      </div>

      {/* Cards de Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(financialData.totalReceita)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{financialData.crescimentoMensal}% este mês
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(financialData.totalDespesas)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -2.1% este mês
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(financialData.lucroLiquido)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              Margem: {financialData.margemLucro}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fluxo de Caixa</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {formatCurrency(financialData.fluxoCaixa)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Saldo disponível
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Contas a Receber e Pagar */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Contas a Receber</CardTitle>
            <CardDescription>Valores pendentes de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              {formatCurrency(financialData.contasReceber)}
            </div>
            <Progress value={75} className="mb-2" />
            <p className="text-sm text-muted-foreground">75% previsto para este mês</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => onNavigate('payments')}
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Contas a Pagar</CardTitle>
            <CardDescription>Compromissos financeiros pendentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              {formatCurrency(financialData.contasPagar)}
            </div>
            <Progress value={60} className="mb-2" />
            <p className="text-sm text-muted-foreground">60% vence este mês</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => onNavigate('expenses')}
            >
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Transações Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
          <CardDescription>Últimas movimentações financeiras</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transacoes.map((transacao) => (
              <div key={transacao.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${
                    transacao.tipo === 'Receita' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium">{transacao.descricao}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transacao.data).toLocaleDateString('pt-BR')} • {transacao.status}
                    </p>
                  </div>
                </div>
                <div className={`text-lg font-bold ${
                  transacao.valor > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transacao.valor > 0 ? '+' : ''}{formatCurrency(transacao.valor)}
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={() => onNavigate('accounting')}>
            Ver Todas as Transações
          </Button>
        </CardContent>
      </Card>

      {/* Links Rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" onClick={() => onNavigate('feather-tax')} className="h-20 flex-col">
          <div className="text-2xl mb-1">📊</div>
          <span>FeatherTax</span>
        </Button>
        <Button variant="outline" onClick={() => onNavigate('receipts')} className="h-20 flex-col">
          <div className="text-2xl mb-1">🧾</div>
          <span>Recibos</span>
        </Button>
        <Button variant="outline" onClick={() => onNavigate('easy-calc')} className="h-20 flex-col">
          <div className="text-2xl mb-1">🧮</div>
          <span>EasyCalc</span>
        </Button>
        <Button variant="outline" onClick={() => onNavigate('quotes')} className="h-20 flex-col">
          <div className="text-2xl mb-1">💰</div>
          <span>Cotações</span>
        </Button>
      </div>
    </div>
  )
}


import React from 'react'
import { TestPDFGenerator } from '@/components/TestPDFGenerator'

export default function TestPDF() {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">PDF de Teste</h1>
          <p className="text-gray-600 mt-2">
            Gere um PDF de exemplo com espaço para assinatura digital
          </p>
        </div>
        
        <TestPDFGenerator />
        
        <div className="max-w-2xl text-center space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Recursos do PDF:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
              <div>✓ Design profissional responsivo</div>
              <div>✓ Logo da empresa personalizado</div>
              <div>✓ Informações detalhadas do cliente</div>
              <div>✓ Itens de serviço com cálculos</div>
              <div>✓ Área dedicada para assinatura</div>
              <div>✓ Termos e condições claros</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            Este PDF de teste demonstra como os documentos são gerados no sistema, 
            incluindo o espaço dedicado para assinatura digital que pode ser integrado 
            com serviços como SignNow ou outras soluções de e-signature.
          </p>
        </div>
      </div>
    </div>
  )
}

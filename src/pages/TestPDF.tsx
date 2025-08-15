
import React from 'react'
import { TestPDFGenerator } from '@/components/TestPDFGenerator'

export default function TestPDF() {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Test PDF</h1>
          <p className="text-gray-600 mt-2">
            Generate a sample PDF with space for digital signature
          </p>
        </div>
        
        <TestPDFGenerator />
        
        <div className="max-w-2xl text-center space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">PDF Features:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
              <div>✓ Professional responsive design</div>
              <div>✓ Custom company logo</div>
              <div>✓ Detailed client information</div>
              <div>✓ Service items with calculations</div>
              <div>✓ Dedicated signature area</div>
              <div>✓ Clear terms and conditions</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600">
            This test PDF demonstrates how documents are generated in the system, 
            including the dedicated space for digital signature that can be integrated 
            with services like SignNow or other e-signature solutions.
          </p>
        </div>
      </div>
    </div>
  )
}

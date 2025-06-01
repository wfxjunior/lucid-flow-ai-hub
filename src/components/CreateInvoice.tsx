
import { InvoiceForm } from "./InvoiceForm"

export function CreateInvoice() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8">
      <div className="container mx-auto">
        <InvoiceForm />
      </div>
    </div>
  )
}

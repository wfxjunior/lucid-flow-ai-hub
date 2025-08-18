
import { InvoiceFormProfessional } from "./InvoiceFormProfessional"

export function CreateInvoice() {
  return (
    <div className="w-full overflow-y-auto" style={{ paddingInline: 'var(--content-px)' }}>
      <div className="w-full mx-auto py-4 pb-8" 
           style={{ 
             maxWidth: 'var(--content-max)'
           }}>
        <InvoiceFormProfessional />
      </div>
    </div>
  )
}

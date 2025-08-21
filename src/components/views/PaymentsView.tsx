
import React from 'react'
import { CreditCard } from 'lucide-react'
import { GenericView } from './GenericView'

export function PaymentsView() {
  return (
    <GenericView
      title="Payments"
      description="Track incoming payments"
      icon={CreditCard}
    />
  )
}

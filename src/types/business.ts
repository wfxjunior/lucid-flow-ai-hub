
export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  status: 'active' | 'inactive' | 'archived'
  created_at: string
  updated_at: string
  user_id: string
}

export interface Estimate {
  id: string
  client_id: string
  title: string
  description?: string
  amount: number
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'converted'
  created_at: string
  updated_at: string
  user_id: string
  client?: Client
}

export interface Invoice {
  id: string
  client_id: string
  estimate_id?: string
  invoice_number: string
  title: string
  description?: string
  amount: number
  status: 'pending' | 'paid' | 'archived' | 'overdue'
  due_date?: string
  created_at: string
  updated_at: string
  user_id: string
  client?: Client
  estimate?: Estimate
}

export interface Receipt {
  id: string
  client_id: string
  invoice_id: string
  receipt_number: string
  amount: number
  payment_method?: string
  notes?: string
  created_at: string
  user_id: string
  client?: Client
  invoice?: Invoice
}

export interface Appointment {
  id: string
  client_id: string
  user_id: string
  title: string
  description?: string
  appointment_date: string
  duration_minutes: number
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
  location?: string
  notes?: string
  created_at: string
  updated_at: string
  client?: Client
}

export type FilterStatus = 'all' | 'pending' | 'paid' | 'archived' | 'draft' | 'sent' | 'approved' | 'rejected' | 'converted' | 'active' | 'inactive' | 'overdue' | 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
export type FilterType = 'all' | 'estimates' | 'invoices' | 'receipts' | 'appointments'

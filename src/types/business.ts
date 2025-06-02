
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
  estimate_number?: string
  estimate_date?: string
  viewed_at?: string
  accepted_at?: string
  declined_at?: string
  signed_at?: string
  signature_status?: 'pending' | 'signed' | 'declined'
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

export interface Contract {
  id: string
  user_id: string
  title: string
  content: string
  contract_type: string
  status: 'draft' | 'active' | 'expired' | 'archived'
  created_at: string
  updated_at: string
  tags: string[]
  is_template: boolean
}

export interface Document {
  id: string
  user_id: string
  title: string
  content: string
  document_type: string
  file_url?: string
  status: 'draft' | 'sent' | 'signed' | 'archived'
  created_at: string
  updated_at: string
}

export interface Signature {
  id: string
  document_id: string
  client_id: string
  user_id: string
  signature_data?: string
  signed_at?: string
  status: 'pending' | 'signed' | 'declined'
  signature_url?: string
  created_at: string
  updated_at: string
  client?: Client
  document?: Document
}

export interface UserSettings {
  id: string
  user_id: string
  estimate_number_start: number
  invoice_number_start: number
  created_at: string
  updated_at: string
}

export interface WorkOrder {
  id: string
  user_id: string
  client_id: string
  estimate_id?: string
  project_id?: string
  work_order_number?: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  scheduled_date?: string
  completion_date?: string
  assigned_to?: string
  estimated_hours?: number
  actual_hours?: number
  materials_cost?: number
  labor_cost?: number
  total_cost?: number
  notes?: string
  created_at: string
  updated_at: string
  client?: Client
  estimate?: Estimate
}

export interface AccountingDocument {
  id: string
  user_id: string
  title: string
  description?: string
  document_type: string
  file_url: string
  file_name: string
  file_size: number
  amount?: number
  vendor?: string
  date_of_transaction?: string
  category: string
  tags: string[]
  extracted_data?: any
  status: string
  created_at: string
  updated_at: string
}

export type FilterStatus = 'all' | 'pending' | 'paid' | 'archived' | 'draft' | 'sent' | 'approved' | 'rejected' | 'converted' | 'active' | 'inactive' | 'overdue' | 'scheduled' | 'confirmed' | 'cancelled' | 'completed' | 'signed' | 'declined' | 'expired' | 'in_progress' | 'urgent' | 'low' | 'medium' | 'high'
export type FilterType = 'all' | 'estimates' | 'invoices' | 'receipts' | 'appointments' | 'contracts' | 'documents' | 'signatures' | 'work_orders'

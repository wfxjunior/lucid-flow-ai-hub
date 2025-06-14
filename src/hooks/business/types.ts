
export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  status: string
  created_at: string
  updated_at: string
}

export interface WorkOrderWithClient extends Omit<import('@/types/business').WorkOrder, 'client'> {
  client: Client | null
}

export interface Appointment {
  id: string
  user_id: string
  client_id: string
  title: string
  description?: string
  appointment_date: string
  duration_minutes: number
  location?: string
  notes?: string
  status: string
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
  status: string
  tags: string[]
  is_template: boolean
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  user_id: string
  title: string
  content: string
  document_type: string
  status: string
  file_url?: string
  created_at: string
  updated_at: string
}

export interface Estimate {
  id: string
  user_id: string
  client_id: string
  estimate_number: string
  title: string
  description?: string
  amount: number
  estimate_date: string
  status: string
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  user_id: string
  client_id: string
  invoice_number: string
  title: string
  description?: string
  amount: number
  due_date?: string
  status: string
  created_at: string
  updated_at: string
}

export interface SignatureWithRelations {
  id: string
  user_id: string
  client_id: string
  document_id: string
  signature_data?: string
  signature_url?: string
  status: string
  signed_at?: string
  created_at: string
  updated_at: string
  client?: Client
  document?: Document
}

export interface Meeting {
  id: string
  user_id: string
  title: string
  description?: string
  meeting_date: string
  duration_minutes: number
  meeting_platform: string
  meeting_url?: string
  location?: string
  status: string
  created_at: string
  updated_at: string
}

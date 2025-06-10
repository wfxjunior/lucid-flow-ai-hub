
import { z } from "zod"

export const lineItemSchema = z.object({
  type: z.enum(["service", "product", "hours", "discount", "expenses"]),
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
  rate: z.number().min(0, "Rate must be positive"),
  tax_rate: z.number().min(0).max(100),
  amount: z.number(),
})

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export const invoiceSchema = z.object({
  client_id: z.string().min(1, "Client is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  due_date: z.string().optional(),
  line_items: z.array(lineItemSchema).min(1, "At least one line item is required"),
  total_amount: z.number().min(0.01, "Total amount must be greater than 0"),
})

export type LineItem = z.infer<typeof lineItemSchema>
export type ClientFormData = z.infer<typeof clientSchema>
export type InvoiceFormData = z.infer<typeof invoiceSchema>

export interface InvoiceTotals {
  subtotal: number
  discount: number
  tax: number
  total: number
  amountPaid: number
  balanceDue: number
}

export interface CompanyInfo {
  name: string
  address: string
  phone: string
  email: string
}

export interface ClientInfo {
  name: string
  email: string
  phone?: string
  address?: string
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounting_documents: {
        Row: {
          amount: number | null
          category: string
          created_at: string
          date_of_transaction: string | null
          description: string | null
          document_type: string
          extracted_data: Json | null
          file_name: string
          file_size: number
          file_url: string
          id: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
          vendor: string | null
        }
        Insert: {
          amount?: number | null
          category?: string
          created_at?: string
          date_of_transaction?: string | null
          description?: string | null
          document_type?: string
          extracted_data?: Json | null
          file_name: string
          file_size: number
          file_url: string
          id?: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          vendor?: string | null
        }
        Update: {
          amount?: number | null
          category?: string
          created_at?: string
          date_of_transaction?: string | null
          description?: string | null
          document_type?: string
          extracted_data?: Json | null
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          vendor?: string | null
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          client_id: string
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          location: string | null
          notes: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          appointment_date: string
          client_id: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          appointment_date?: string
          client_id?: string
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contracts: {
        Row: {
          content: string
          contract_type: string | null
          created_at: string
          id: string
          is_template: boolean | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          contract_type?: string | null
          created_at?: string
          id?: string
          is_template?: boolean | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          contract_type?: string | null
          created_at?: string
          id?: string
          is_template?: boolean | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string
          created_at: string
          document_type: string | null
          file_url: string | null
          id: string
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          document_type?: string | null
          file_url?: string | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          document_type?: string | null
          file_url?: string | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      estimates: {
        Row: {
          accepted_at: string | null
          amount: number
          client_id: string
          created_at: string
          declined_at: string | null
          description: string | null
          estimate_date: string | null
          estimate_number: string | null
          id: string
          signature_status: string | null
          signed_at: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          accepted_at?: string | null
          amount: number
          client_id: string
          created_at?: string
          declined_at?: string | null
          description?: string | null
          estimate_date?: string | null
          estimate_number?: string | null
          id?: string
          signature_status?: string | null
          signed_at?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          accepted_at?: string | null
          amount?: number
          client_id?: string
          created_at?: string
          declined_at?: string | null
          description?: string | null
          estimate_date?: string | null
          estimate_number?: string | null
          id?: string
          signature_status?: string | null
          signed_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estimates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      files: {
        Row: {
          created_at: string
          description: string | null
          file_size: number
          file_type: string
          file_url: string
          folder_id: string | null
          id: string
          is_favorite: boolean | null
          name: string
          original_name: string
          tags: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_size: number
          file_type: string
          file_url: string
          folder_id?: string | null
          id?: string
          is_favorite?: boolean | null
          name: string
          original_name: string
          tags?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          file_size?: number
          file_type?: string
          file_url?: string
          folder_id?: string | null
          id?: string
          is_favorite?: boolean | null
          name?: string
          original_name?: string
          tags?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
        ]
      }
      folders: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_folder_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_folder_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_folder_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "folders_parent_folder_id_fkey"
            columns: ["parent_folder_id"]
            isOneToOne: false
            referencedRelation: "folders"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          client_id: string
          created_at: string
          description: string | null
          due_date: string | null
          estimate_id: string | null
          id: string
          invoice_number: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          client_id: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimate_id?: string | null
          id?: string
          invoice_number: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          client_id?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimate_id?: string | null
          id?: string
          invoice_number?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: false
            referencedRelation: "estimates"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_attendees: {
        Row: {
          client_id: string | null
          created_at: string
          email: string
          id: string
          meeting_id: string
          name: string
          response_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          email: string
          id?: string
          meeting_id: string
          name: string
          response_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          email?: string
          id?: string
          meeting_id?: string
          name?: string
          response_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_attendees_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_attendees_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_reminders: {
        Row: {
          created_at: string
          id: string
          meeting_id: string
          reminder_type: string
          sent_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          meeting_id: string
          reminder_type: string
          sent_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          meeting_id?: string
          reminder_type?: string
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_reminders_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          location: string | null
          meeting_date: string
          meeting_id: string | null
          meeting_password: string | null
          meeting_platform: string
          meeting_url: string | null
          notes: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          location?: string | null
          meeting_date: string
          meeting_id?: string | null
          meeting_password?: string | null
          meeting_platform?: string
          meeting_url?: string | null
          notes?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          location?: string | null
          meeting_date?: string
          meeting_id?: string | null
          meeting_password?: string | null
          meeting_platform?: string
          meeting_url?: string | null
          notes?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      receipts: {
        Row: {
          amount: number
          client_id: string
          created_at: string
          id: string
          invoice_id: string
          notes: string | null
          payment_method: string | null
          receipt_number: string
          user_id: string
        }
        Insert: {
          amount: number
          client_id: string
          created_at?: string
          id?: string
          invoice_id: string
          notes?: string | null
          payment_method?: string | null
          receipt_number: string
          user_id: string
        }
        Update: {
          amount?: number
          client_id?: string
          created_at?: string
          id?: string
          invoice_id?: string
          notes?: string | null
          payment_method?: string | null
          receipt_number?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "receipts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "receipts_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      signatures: {
        Row: {
          client_id: string
          created_at: string
          document_id: string
          id: string
          signature_data: string | null
          signature_url: string | null
          signed_at: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string
          document_id: string
          id?: string
          signature_data?: string | null
          signature_url?: string | null
          signed_at?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string
          document_id?: string
          id?: string
          signature_data?: string | null
          signature_url?: string | null
          signed_at?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "signatures_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signatures_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string
          estimate_number_start: number | null
          id: string
          invoice_number_start: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          estimate_number_start?: number | null
          id?: string
          invoice_number_start?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          estimate_number_start?: number | null
          id?: string
          invoice_number_start?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      work_orders: {
        Row: {
          actual_hours: number | null
          assigned_to: string | null
          client_id: string
          completion_date: string | null
          created_at: string
          description: string | null
          estimate_id: string | null
          estimated_hours: number | null
          id: string
          labor_cost: number | null
          materials_cost: number | null
          notes: string | null
          priority: string | null
          project_id: string | null
          scheduled_date: string | null
          status: string | null
          title: string
          total_cost: number | null
          updated_at: string
          user_id: string
          work_order_number: string | null
        }
        Insert: {
          actual_hours?: number | null
          assigned_to?: string | null
          client_id: string
          completion_date?: string | null
          created_at?: string
          description?: string | null
          estimate_id?: string | null
          estimated_hours?: number | null
          id?: string
          labor_cost?: number | null
          materials_cost?: number | null
          notes?: string | null
          priority?: string | null
          project_id?: string | null
          scheduled_date?: string | null
          status?: string | null
          title: string
          total_cost?: number | null
          updated_at?: string
          user_id: string
          work_order_number?: string | null
        }
        Update: {
          actual_hours?: number | null
          assigned_to?: string | null
          client_id?: string
          completion_date?: string | null
          created_at?: string
          description?: string | null
          estimate_id?: string | null
          estimated_hours?: number | null
          id?: string
          labor_cost?: number | null
          materials_cost?: number | null
          notes?: string | null
          priority?: string | null
          project_id?: string | null
          scheduled_date?: string | null
          status?: string | null
          title?: string
          total_cost?: number | null
          updated_at?: string
          user_id?: string
          work_order_number?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_estimate_number: {
        Args: { starting_number?: number }
        Returns: string
      }
      generate_invoice_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_meeting_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_receipt_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_work_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

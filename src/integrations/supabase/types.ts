export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
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
      aftercare_feedback: {
        Row: {
          admin_notes: string | null
          agency_satisfaction: number
          allow_public_display: boolean
          client_name: string
          communication_quality: number
          created_at: string
          feedback_date: string
          id: string
          overall_rating: number
          project_service: string
          show_as_testimonial: boolean
          suggestions: string | null
          updated_at: string
          user_id: string
          would_recommend: boolean
        }
        Insert: {
          admin_notes?: string | null
          agency_satisfaction: number
          allow_public_display?: boolean
          client_name: string
          communication_quality: number
          created_at?: string
          feedback_date?: string
          id?: string
          overall_rating: number
          project_service: string
          show_as_testimonial?: boolean
          suggestions?: string | null
          updated_at?: string
          user_id: string
          would_recommend?: boolean
        }
        Update: {
          admin_notes?: string | null
          agency_satisfaction?: number
          allow_public_display?: boolean
          client_name?: string
          communication_quality?: number
          created_at?: string
          feedback_date?: string
          id?: string
          overall_rating?: number
          project_service?: string
          show_as_testimonial?: boolean
          suggestions?: string | null
          updated_at?: string
          user_id?: string
          would_recommend?: boolean
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
      car_rentals: {
        Row: {
          created_at: string
          final_mileage: number | null
          fuel_level_pickup: number | null
          fuel_level_return: number | null
          id: string
          initial_mileage: number | null
          notes: string | null
          payment_method: string | null
          payment_status: string
          pickup_location: string
          pickup_time: string | null
          rental_end_date: string
          rental_start_date: string
          rental_status: string
          renter_name: string
          return_location: string
          return_time: string | null
          total_price: number
          updated_at: string
          user_id: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          final_mileage?: number | null
          fuel_level_pickup?: number | null
          fuel_level_return?: number | null
          id?: string
          initial_mileage?: number | null
          notes?: string | null
          payment_method?: string | null
          payment_status?: string
          pickup_location: string
          pickup_time?: string | null
          rental_end_date: string
          rental_start_date: string
          rental_status?: string
          renter_name: string
          return_location: string
          return_time?: string | null
          total_price: number
          updated_at?: string
          user_id: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          final_mileage?: number | null
          fuel_level_pickup?: number | null
          fuel_level_return?: number | null
          id?: string
          initial_mileage?: number | null
          notes?: string | null
          payment_method?: string | null
          payment_status?: string
          pickup_location?: string
          pickup_time?: string | null
          rental_end_date?: string
          rental_start_date?: string
          rental_status?: string
          renter_name?: string
          return_location?: string
          return_time?: string | null
          total_price?: number
          updated_at?: string
          user_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "car_rentals_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
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
      company_profiles: {
        Row: {
          address: string | null
          company_name: string
          created_at: string
          email: string | null
          id: string
          logo_url: string | null
          phone: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          company_name: string
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          company_name?: string
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
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
      earnsync_companies: {
        Row: {
          company_name: string
          contact_info: string | null
          created_at: string
          date_of_service: string | null
          id: string
          payment_method: string
          updated_at: string
          user_id: string
          work_type: string | null
        }
        Insert: {
          company_name: string
          contact_info?: string | null
          created_at?: string
          date_of_service?: string | null
          id?: string
          payment_method: string
          updated_at?: string
          user_id: string
          work_type?: string | null
        }
        Update: {
          company_name?: string
          contact_info?: string | null
          created_at?: string
          date_of_service?: string | null
          id?: string
          payment_method?: string
          updated_at?: string
          user_id?: string
          work_type?: string | null
        }
        Relationships: []
      }
      earnsync_earnings: {
        Row: {
          amount: number
          company_id: string | null
          created_at: string
          date: string
          id: string
          payment_status: string
          receipt_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          company_id?: string | null
          created_at?: string
          date: string
          id?: string
          payment_status?: string
          receipt_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          company_id?: string | null
          created_at?: string
          date?: string
          id?: string
          payment_status?: string
          receipt_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "earnsync_earnings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "earnsync_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      earnsync_expenses: {
        Row: {
          amount: number
          category: string
          company_id: string | null
          created_at: string
          date: string
          description: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          company_id?: string | null
          created_at?: string
          date: string
          description?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          company_id?: string | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "earnsync_expenses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "earnsync_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      earnsync_goals: {
        Row: {
          created_at: string
          id: string
          monthly_target: number | null
          updated_at: string
          user_id: string
          weekly_target: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          monthly_target?: number | null
          updated_at?: string
          user_id: string
          weekly_target?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          monthly_target?: number | null
          updated_at?: string
          user_id?: string
          weekly_target?: number | null
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          created_at: string
          email_id: string | null
          email_type: string
          id: string
          order_number: string | null
          recipient: string
          sent_at: string
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email_id?: string | null
          email_type: string
          id?: string
          order_number?: string | null
          recipient: string
          sent_at?: string
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email_id?: string | null
          email_type?: string
          id?: string
          order_number?: string | null
          recipient?: string
          sent_at?: string
          transaction_id?: string | null
          user_id?: string | null
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
      feather_forms: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          thank_you_message: string | null
          title: string
          updated_at: string | null
          user_id: string
          visibility: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          thank_you_message?: string | null
          title: string
          updated_at?: string | null
          user_id: string
          visibility?: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          thank_you_message?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
          visibility?: string
        }
        Relationships: []
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
      form_destinations: {
        Row: {
          created_at: string | null
          destination_config: Json
          destination_type: string
          form_id: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          created_at?: string | null
          destination_config: Json
          destination_type: string
          form_id: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          created_at?: string | null
          destination_config?: Json
          destination_type?: string
          form_id?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "form_destinations_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "feather_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_fields: {
        Row: {
          created_at: string | null
          field_label: string
          field_options: Json | null
          field_order: number
          field_placeholder: string | null
          field_type: string
          form_id: string
          id: string
          is_required: boolean | null
        }
        Insert: {
          created_at?: string | null
          field_label: string
          field_options?: Json | null
          field_order: number
          field_placeholder?: string | null
          field_type: string
          form_id: string
          id?: string
          is_required?: boolean | null
        }
        Update: {
          created_at?: string | null
          field_label?: string
          field_options?: Json | null
          field_order?: number
          field_placeholder?: string | null
          field_type?: string
          form_id?: string
          id?: string
          is_required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "feather_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_responses: {
        Row: {
          form_id: string
          id: string
          ip_address: string | null
          respondent_email: string | null
          respondent_name: string | null
          response_data: Json
          submitted_at: string | null
        }
        Insert: {
          form_id: string
          id?: string
          ip_address?: string | null
          respondent_email?: string | null
          respondent_name?: string | null
          response_data: Json
          submitted_at?: string | null
        }
        Update: {
          form_id?: string
          id?: string
          ip_address?: string | null
          respondent_email?: string | null
          respondent_name?: string | null
          response_data?: Json
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_responses_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "feather_forms"
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
      notes: {
        Row: {
          attachments: string[] | null
          content: string | null
          created_at: string
          created_by: string | null
          id: string
          related_client: string | null
          related_project: string | null
          tags: string | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          attachments?: string[] | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          related_client?: string | null
          related_project?: string | null
          tags?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          attachments?: string[] | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          related_client?: string | null
          related_project?: string | null
          tags?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
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
          status: string | null
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
          status?: string | null
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
          status?: string | null
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
      rental_documents: {
        Row: {
          created_at: string
          document_type: string
          file_name: string
          file_size: number
          file_url: string
          id: string
          rental_id: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          document_type: string
          file_name: string
          file_size: number
          file_url: string
          id?: string
          rental_id: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          document_type?: string
          file_name?: string
          file_size?: number
          file_url?: string
          id?: string
          rental_id?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "rental_documents_rental_id_fkey"
            columns: ["rental_id"]
            isOneToOne: false
            referencedRelation: "car_rentals"
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
      smart_schedule_settings: {
        Row: {
          autofill_client_manager: boolean
          created_at: string
          id: string
          send_aftercare_completion: boolean
          sync_car_rental: boolean
          sync_next_projects: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          autofill_client_manager?: boolean
          created_at?: string
          id?: string
          send_aftercare_completion?: boolean
          sync_car_rental?: boolean
          sync_next_projects?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          autofill_client_manager?: boolean
          created_at?: string
          id?: string
          send_aftercare_completion?: boolean
          sync_car_rental?: boolean
          sync_next_projects?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      smart_schedules: {
        Row: {
          assigned_workers: string[] | null
          client_address: string | null
          client_id: string | null
          client_name: string
          created_at: string
          end_time: string | null
          frequency: string
          id: string
          job_description: string | null
          job_type: string
          service_date: string
          start_time: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_workers?: string[] | null
          client_address?: string | null
          client_id?: string | null
          client_name: string
          created_at?: string
          end_time?: string | null
          frequency?: string
          id?: string
          job_description?: string | null
          job_type?: string
          service_date: string
          start_time?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_workers?: string[] | null
          client_address?: string | null
          client_id?: string | null
          client_name?: string
          created_at?: string
          end_time?: string | null
          frequency?: string
          id?: string
          job_description?: string | null
          job_type?: string
          service_date?: string
          start_time?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "smart_schedules_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      user_email_logs: {
        Row: {
          created_at: string
          email_type: string
          error_message: string | null
          id: string
          provider_response: Json | null
          recipient_email: string
          recipient_name: string | null
          sent_at: string
          status: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_type?: string
          error_message?: string | null
          id?: string
          provider_response?: Json | null
          recipient_email: string
          recipient_name?: string | null
          sent_at?: string
          status?: string
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_type?: string
          error_message?: string | null
          id?: string
          provider_response?: Json | null
          recipient_email?: string
          recipient_name?: string | null
          sent_at?: string
          status?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      user_email_settings: {
        Row: {
          api_key: string
          created_at: string
          from_email: string
          from_name: string
          id: string
          is_active: boolean
          provider: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string
          from_email: string
          from_name: string
          id?: string
          is_active?: boolean
          provider?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string
          from_email?: string
          from_name?: string
          id?: string
          is_active?: boolean
          provider?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          company_address: string | null
          company_email: string | null
          company_logo: string | null
          company_name: string | null
          company_phone: string | null
          created_at: string
          default_notes: string | null
          default_payment_terms: string | null
          estimate_number_prefix: string | null
          estimate_number_start: number | null
          id: string
          invoice_number_start: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_address?: string | null
          company_email?: string | null
          company_logo?: string | null
          company_name?: string | null
          company_phone?: string | null
          created_at?: string
          default_notes?: string | null
          default_payment_terms?: string | null
          estimate_number_prefix?: string | null
          estimate_number_start?: number | null
          id?: string
          invoice_number_start?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_address?: string | null
          company_email?: string | null
          company_logo?: string | null
          company_name?: string | null
          company_phone?: string | null
          created_at?: string
          default_notes?: string | null
          default_payment_terms?: string | null
          estimate_number_prefix?: string | null
          estimate_number_start?: number | null
          id?: string
          invoice_number_start?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string
          plan_name: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id: string
          plan_name: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          brand: string
          color: string | null
          created_at: string
          id: string
          model: string
          photo_url: string | null
          plate_number: string
          status: string
          updated_at: string
          user_id: string
          vehicle_type: string
          year: number
        }
        Insert: {
          brand: string
          color?: string | null
          created_at?: string
          id?: string
          model: string
          photo_url?: string | null
          plate_number: string
          status?: string
          updated_at?: string
          user_id: string
          vehicle_type: string
          year: number
        }
        Update: {
          brand?: string
          color?: string | null
          created_at?: string
          id?: string
          model?: string
          photo_url?: string | null
          plate_number?: string
          status?: string
          updated_at?: string
          user_id?: string
          vehicle_type?: string
          year?: number
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

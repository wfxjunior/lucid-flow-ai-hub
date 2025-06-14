
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

interface AppointmentData {
  client_id: string
  title: string
  description?: string
  appointment_date: string
  duration_minutes?: number
  location?: string
  notes?: string
  status?: string
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get user from Authorization header
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authorization token' }),
        { 
          status: 401, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    const url = new URL(req.url)
    const pathParts = url.pathname.split('/').filter(Boolean)
    const appointmentId = pathParts[pathParts.length - 1]

    switch (req.method) {
      case 'GET':
        return await handleGet(supabase, user.id, appointmentId, url, corsHeaders)
      case 'POST':
        return await handlePost(supabase, user.id, req, corsHeaders)
      case 'PUT':
        return await handlePut(supabase, user.id, appointmentId, req, corsHeaders)
      case 'DELETE':
        return await handleDelete(supabase, user.id, appointmentId, corsHeaders)
      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          { 
            status: 405, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
          }
        )
    }
  } catch (error: any) {
    console.error('API Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  }
}

// GET /appointments or /appointments/:id
async function handleGet(supabase: any, userId: string, appointmentId: string, url: URL, corsHeaders: any) {
  try {
    if (appointmentId && appointmentId !== 'appointments-api') {
      // Get single appointment
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          client:clients(*)
        `)
        .eq('id', appointmentId)
        .eq('user_id', userId)
        .single()

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { 
            status: 404, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
          }
        )
      }

      return new Response(
        JSON.stringify({ data }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    } else {
      // Get all appointments with optional filters
      const page = parseInt(url.searchParams.get('page') || '1')
      const limit = parseInt(url.searchParams.get('limit') || '10')
      const status = url.searchParams.get('status')
      const clientId = url.searchParams.get('client_id')
      const from = url.searchParams.get('from')
      const to = url.searchParams.get('to')

      let query = supabase
        .from('appointments')
        .select(`
          *,
          client:clients(*)
        `, { count: 'exact' })
        .eq('user_id', userId)
        .order('appointment_date', { ascending: true })

      // Apply filters
      if (status) {
        query = query.eq('status', status)
      }
      if (clientId) {
        query = query.eq('client_id', clientId)
      }
      if (from) {
        query = query.gte('appointment_date', from)
      }
      if (to) {
        query = query.lte('appointment_date', to)
      }

      // Apply pagination
      const startIndex = (page - 1) * limit
      query = query.range(startIndex, startIndex + limit - 1)

      const { data, error, count } = await query

      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
          }
        )
      }

      return new Response(
        JSON.stringify({ 
          data, 
          pagination: {
            page,
            limit,
            total: count,
            pages: Math.ceil((count || 0) / limit)
          }
        }),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  }
}

// POST /appointments
async function handlePost(supabase: any, userId: string, req: Request, corsHeaders: any) {
  try {
    const appointmentData: AppointmentData = await req.json()

    // Validate required fields
    if (!appointmentData.client_id || !appointmentData.title || !appointmentData.appointment_date) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: client_id, title, appointment_date' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    // Verify client belongs to user
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('id', appointmentData.client_id)
      .eq('user_id', userId)
      .single()

    if (clientError || !client) {
      return new Response(
        JSON.stringify({ error: 'Client not found or not accessible' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        ...appointmentData,
        user_id: userId,
        status: appointmentData.status || 'scheduled'
      }])
      .select(`
        *,
        client:clients(*)
      `)
      .single()

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    return new Response(
      JSON.stringify({ data, message: 'Appointment created successfully' }),
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  }
}

// PUT /appointments/:id
async function handlePut(supabase: any, userId: string, appointmentId: string, req: Request, corsHeaders: any) {
  try {
    if (!appointmentId || appointmentId === 'appointments-api') {
      return new Response(
        JSON.stringify({ error: 'Appointment ID is required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    const appointmentData: Partial<AppointmentData> = await req.json()

    // If client_id is being updated, verify it belongs to user
    if (appointmentData.client_id) {
      const { data: client, error: clientError } = await supabase
        .from('clients')
        .select('id')
        .eq('id', appointmentData.client_id)
        .eq('user_id', userId)
        .single()

      if (clientError || !client) {
        return new Response(
          JSON.stringify({ error: 'Client not found or not accessible' }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
          }
        )
      }
    }

    const { data, error } = await supabase
      .from('appointments')
      .update({
        ...appointmentData,
        updated_at: new Date().toISOString()
      })
      .eq('id', appointmentId)
      .eq('user_id', userId)
      .select(`
        *,
        client:clients(*)
      `)
      .single()

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    if (!data) {
      return new Response(
        JSON.stringify({ error: 'Appointment not found' }),
        { 
          status: 404, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    return new Response(
      JSON.stringify({ data, message: 'Appointment updated successfully' }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  }
}

// DELETE /appointments/:id
async function handleDelete(supabase: any, userId: string, appointmentId: string, corsHeaders: any) {
  try {
    if (!appointmentId || appointmentId === 'appointments-api') {
      return new Response(
        JSON.stringify({ error: 'Appointment ID is required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    const { data, error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', appointmentId)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    if (!data) {
      return new Response(
        JSON.stringify({ error: 'Appointment not found' }),
        { 
          status: 404, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      )
    }

    return new Response(
      JSON.stringify({ message: 'Appointment deleted successfully' }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    )
  }
}

serve(handler)

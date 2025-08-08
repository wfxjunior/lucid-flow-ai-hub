import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

interface LeadCaptureRequest {
  name: string
  email: string
  language: string
  timestamp: string
}

serve(async (req) => {
  console.log('Lead capture function called')
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email, language, timestamp }: LeadCaptureRequest = await req.json()
    console.log('Lead capture request:', { name, email, language, timestamp })

    if (!name || !email) {
      throw new Error('Name and email are required')
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Store lead in database
    const { error: dbError } = await supabase
      .from('featherbot_leads')
      .insert({
        name,
        email,
        language,
        source: 'pricing_chatbot',
        created_at: timestamp
      })

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue with email even if DB fails
    }

    // Prepare email content based on language
    const emailTemplates = {
      en: {
        subject: "Thank you for your interest in FeatherBiz!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">FeatherBiz</h1>
              <p style="color: #bfdbfe; margin: 10px 0 0 0;">Organize. Send. Grow.</p>
            </div>
            
            <div style="padding: 30px; background: white;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${name}!</h2>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                Thank you for your interest in FeatherBiz! We're excited to help you streamline your business operations.
              </p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Quick Plan Overview:</h3>
                
                <div style="margin: 15px 0;">
                  <strong style="color: #2563eb;">Free Plan</strong><br>
                  <span style="color: #6b7280;">Perfect for getting started - includes basic invoicing and client management</span>
                </div>
                
                <div style="margin: 15px 0;">
                  <strong style="color: #2563eb;">Pro Plan - $29/month</strong><br>
                  <span style="color: #6b7280;">Full feature access, unlimited documents, advanced analytics, priority support</span>
                </div>
                
                <div style="margin: 15px 0;">
                  <strong style="color: #2563eb;">Enterprise</strong><br>
                  <span style="color: #6b7280;">Custom solutions for larger teams with dedicated support</span>
                </div>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://featherbiz.io/auth" style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Start Your Free Trial</a>
              </div>
              
              <p style="color: #374151; line-height: 1.6;">
                Need help getting started? Simply reply to this email or visit our help center.
              </p>
              
              <p style="color: #374151; line-height: 1.6;">
                Best regards,<br>
                The FeatherBiz Team
              </p>
            </div>
            
            <div style="background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
              <p>FeatherBiz - Modern Business Management Platform</p>
              <p>© 2025 FeatherBiz. All rights reserved.</p>
            </div>
          </div>
        `
      },
      es: {
        subject: "¡Gracias por tu interés en FeatherBiz!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">FeatherBiz</h1>
              <p style="color: #bfdbfe; margin: 10px 0 0 0;">Organizar. Enviar. Crecer.</p>
            </div>
            
            <div style="padding: 30px; background: white;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">¡Hola ${name}!</h2>
              
              <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
                ¡Gracias por tu interés en FeatherBiz! Estamos emocionados de ayudarte a optimizar las operaciones de tu negocio.
              </p>
              
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Resumen rápido de planes:</h3>
                
                <div style="margin: 15px 0;">
                  <strong style="color: #2563eb;">Plan Gratuito</strong><br>
                  <span style="color: #6b7280;">Perfecto para comenzar - incluye facturación básica y gestión de clientes</span>
                </div>
                
                <div style="margin: 15px 0;">
                  <strong style="color: #2563eb;">Plan Pro - $29/mes</strong><br>
                  <span style="color: #6b7280;">Acceso completo a funciones, documentos ilimitados, análisis avanzados, soporte prioritario</span>
                </div>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://featherbiz.io/auth" style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Iniciar Prueba Gratuita</a>
              </div>
              
              <p style="color: #374151; line-height: 1.6;">
                Saludos cordiales,<br>
                El Equipo de FeatherBiz
              </p>
            </div>
          </div>
        `
      }
      // Add more languages as needed
    }

    const template = emailTemplates[language as keyof typeof emailTemplates] || emailTemplates.en

    // Send email to user
    const userEmailResponse = await resend.emails.send({
      from: 'FeatherBiz <hello@featherbiz.io>',
      to: [email],
      bcc: ['wearefeatherbiz@gmail.com'],
      subject: template.subject,
      html: template.html,
    })

    console.log('User email sent:', userEmailResponse)

    // Send notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: 'FeatherBiz <hello@featherbiz.io>',
      to: ['hello@featherbiz.io'],
      bcc: ['wearefeatherbiz@gmail.com'],
      subject: `New Lead Captured: ${name}`,
      html: `
        <h2>New Lead from Pricing Chatbot</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Language:</strong> ${language}</p>
        <p><strong>Source:</strong> Pricing Chatbot</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
        
        <p>Please follow up with this potential customer!</p>
      `,
    })

    console.log('Admin email sent:', adminEmailResponse)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead captured successfully',
        userEmailId: userEmailResponse.data?.id,
        adminEmailId: adminEmailResponse.data?.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error: any) {
    console.error('Error in lead capture function:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        success: false 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
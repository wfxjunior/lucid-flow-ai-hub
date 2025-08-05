import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// This function handles tracking clicks and redirects
// URL format: /track-redirect/{token}/{eventType}?redirect={url}

serve(async (req) => {
  const url = new URL(req.url);
  const pathParts = url.pathname.split('/');
  
  // Extract token and event type from path
  const token = pathParts[2];
  const eventType = pathParts[3];
  const redirectUrl = url.searchParams.get('redirect');

  if (!token || !eventType) {
    return new Response('Invalid tracking URL', { status: 400 });
  }

  try {
    // Track the event asynchronously
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get client info from request
    const clientInfo = {
      ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown'
    };

    // Invoke the tracking function
    await supabaseClient.functions.invoke('track-document-event', {
      body: {
        token,
        eventType,
        clientInfo
      }
    });

    // Redirect to the target URL if provided
    if (redirectUrl) {
      return Response.redirect(redirectUrl, 302);
    }

    // For pixel tracking (viewed/receipt_viewed), return a 1x1 transparent GIF
    const pixel = new Uint8Array([
      0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x21, 0xF9, 0x04,
      0x01, 0x00, 0x00, 0x00, 0x00, 0x2C, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02,
      0x02, 0x04, 0x01, 0x00, 0x3B
    ]);

    return new Response(pixel, {
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });

  } catch (error) {
    console.error('Tracking error:', error);
    
    // Still redirect even if tracking fails
    if (redirectUrl) {
      return Response.redirect(redirectUrl, 302);
    }
    
    return new Response('Tracking failed', { status: 500 });
  }
});
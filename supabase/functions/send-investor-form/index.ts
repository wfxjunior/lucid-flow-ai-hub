import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface InvestorPayload {
  kind: "investor" | "partner";
  data: Record<string, string>;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    const body: InvestorPayload = await req.json();
    const to = "investors@featherbiz.io";

    const subject = body.kind === "partner" ?
      `New Partner Application — ${body.data.company || body.data.name || "Unknown"}` :
      `New Investor Inquiry — ${body.data.name || body.data.email || "Unknown"}`;

    const rows = Object.entries(body.data)
      .map(([k, v]) => `<tr><td style='padding:6px 10px;border:1px solid #eee;'><b>${k}</b></td><td style='padding:6px 10px;border:1px solid #eee;'>${String(v)}</td></tr>`) 
      .join("");

    const html = `
      <div style='font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#111;'>
        <h2>${subject}</h2>
        <p>You received a new ${body.kind} submission from the website.</p>
        <table style='border-collapse:collapse;'>
          ${rows}
        </table>
      </div>
    `;

    const res = await resend.emails.send({
      from: "FeatherBiz <investors@featherbiz.io>",
      to: [to],
      bcc: ["wearefeatherbiz@gmail.com"],
      subject,
      html,
    });

    return new Response(JSON.stringify({ ok: true, id: (res as any)?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    console.error("send-investor-form error", e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});

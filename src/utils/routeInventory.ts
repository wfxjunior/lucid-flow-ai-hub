
// Route Inventory - Source of Truth
export const ROUTES = [
  // Public marketing
  { path: "/", guard: "public", component: "LandingPage", description: "Home/Landing page" },
  { path: "/pricing", guard: "public", component: "Pricing", description: "Pricing plans" },
  { path: "/about", guard: "public", component: "About", description: "About us" },
  { path: "/contact", guard: "public", component: "Contact", description: "Contact form" },
  { path: "/search", guard: "public", component: "Search", description: "Site search" },

  // Content
  { path: "/blog", guard: "public", component: "BlogIndex", description: "Blog listing" },
  { path: "/blog/:slug", guard: "public", component: "BlogPost", description: "Individual blog post" },
  { path: "/careers", guard: "public", component: "CareersIndex", description: "Careers listing" },
  { path: "/careers/:slug", guard: "public", component: "CareerPost", description: "Individual job posting" },
  { path: "/legal/terms", guard: "public", component: "Terms", description: "Terms of service" },
  { path: "/legal/privacy", guard: "public", component: "Privacy", description: "Privacy policy" },
  { path: "/help", guard: "public", component: "Help", description: "Help documentation" },

  // Features (demos)
  { path: "/features/ai-voice", guard: "public", component: "AIVoiceFeature", description: "AI Voice demo" },
  { path: "/features/invoices", guard: "public", component: "InvoicesFeature", description: "Invoices demo" },
  { path: "/features/estimates", guard: "public", component: "EstimatesFeature", description: "Estimates demo" },
  { path: "/features/easycalc", guard: "public", component: "EasyCalcFeature", description: "EasyCalc demo" },
  { path: "/features/pipeline", guard: "public", component: "PipelineFeature", description: "Pipeline demo" },
  { path: "/features/feathertax", guard: "public", component: "FeatherTaxFeature", description: "FeatherTax demo" },
  { path: "/features/work-orders", guard: "public", component: "WorkOrdersFeature", description: "Work Orders demo" },
  { path: "/guides/getting-started", guard: "public", component: "GettingStarted", description: "Getting started guide" },
  { path: "/changelog", guard: "public", component: "Changelog", description: "Product changelog" },

  // Auth
  { path: "/login", guard: "public-auth", component: "Auth", description: "Login page" },
  { path: "/signup", guard: "public-auth", component: "Auth", description: "Signup page" },
  { path: "/auth", guard: "public-auth", component: "Auth", description: "Unified auth page" },
  { path: "/forgot-password", guard: "public-auth", component: "Auth", description: "Password reset" },
  { path: "/reset-password", guard: "public-auth", component: "Auth", description: "Password reset form" },
  { path: "/verify-email", guard: "public-auth", component: "Auth", description: "Email verification" },

  // Checkout (must stay public)
  { path: "/checkout/success", guard: "public", component: "CheckoutSuccess", description: "Payment success" },
  { path: "/checkout/cancel", guard: "public", component: "CheckoutCancel", description: "Payment canceled" },
  { path: "/payment-success", guard: "public", component: "PaymentSuccess", description: "Payment success alt" },
  { path: "/payment-canceled", guard: "public", component: "PaymentCanceled", description: "Payment canceled alt" },

  // App (auth)
  { path: "/dashboard", guard: "auth-free", component: "Index", description: "Main dashboard" },
  { path: "/dashboard/reports", guard: "auth-free", component: "Reports", description: "Reports page" },
  { path: "/dashboard/billing", guard: "auth-free", component: "Billing", description: "Billing management" },
  { path: "/dashboard/settings", guard: "auth-free", component: "Settings", description: "User settings" },
  { path: "/dashboard/team", guard: "auth-paid", component: "Team", description: "Team management (paid)" },
  { path: "/dashboard/automation", guard: "auth-paid", component: "Automation", description: "Automation (paid)" },
  { path: "/dashboard/workflows", guard: "auth-paid", component: "Workflows", description: "Workflows (paid)" },

  // Health/Debug
  { path: "/health", guard: "public", component: "HealthCheck", description: "Health check endpoint" },
  { path: "/_debug/routes", guard: "public", component: "RouteDebug", description: "Route diagnostics" },

  // Fallbacks
  { path: "/404", guard: "public", component: "NotFound", description: "404 error page" },
] as const;

export type RouteGuard = "public" | "public-auth" | "auth-free" | "auth-paid";

export interface RouteInfo {
  path: string;
  guard: RouteGuard;
  component: string;
  description: string;
  exists?: boolean;
  guardActual?: string;
  statusCode?: number;
  redirects?: string;
  issues?: string[];
}

// Guard descriptions for documentation
export const GUARD_DESCRIPTIONS = {
  "public": "Accessible to everyone (no redirects)",
  "public-auth": "Public pages for auth flows (login/signup)",
  "auth-free": "Requires login (Free or Paid users)",
  "auth-paid": "Requires login AND active paid plan"
} as const;

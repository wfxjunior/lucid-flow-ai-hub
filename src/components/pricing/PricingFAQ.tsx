import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "Which plan is right for me?",
    answer:
      "Free is ideal to try core features. Starter suits small teams needing invoices, customers, and basic appointments. Pro unlocks advanced ops like e‑signatures, projects, AI Voice, analytics, and APIs. Enterprise is for larger orgs with security, scale, and custom needs.",
  },
  {
    question: "Is FeatherBiz free to use?",
    answer:
      "Yes. The Free plan is forever free and includes core tools to get started. You can upgrade anytime and your data stays intact.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes. Starter and Pro include a 7‑day free trial. You won’t be charged until the trial ends and you can cancel anytime.",
  },
  {
    question: "How is pricing billed?",
    answer:
      "You can choose monthly or annual billing. Annual billing provides savings on Starter and Pro. Enterprise is billed annually.",
  },
  {
    question: "Can I switch plans or change billing period?",
    answer:
      "Yes. You can upgrade, downgrade, or switch between monthly and annual at any time. Changes take effect immediately and are prorated when applicable.",
  },
  {
    question: "How are seats counted?",
    answer:
      "Seats are counted by active users in your workspace. Free supports 1 user, Starter up to 5, Pro up to 25, and Enterprise is unlimited.",
  },
  {
    question: "What are storage limits?",
    answer:
      "File Manager storage: Free 100MB, Starter 5GB, Pro 50GB, Enterprise Unlimited.",
  },
  {
    question: "What are my payment options?",
    answer:
      "We accept major debit/credit cards via Stripe. For Enterprise, we support invoicing and flexible billing arrangements.",
  },
  {
    question: "Do you offer invoice billing?",
    answer:
      "Invoice billing is available for Enterprise. Starter and Pro are billed by card through Stripe.",
  },
  {
    question: "Do I need to connect my email?",
    answer:
      "No. You can use FeatherBiz without connecting email. Some features like Email Center work best when connected.",
  },
  {
    question: "Can I import data from other tools?",
    answer:
      "Yes. Import customers, documents, and more via CSV or integrations. Our team can help on Enterprise onboardings.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes. You can export reports and records anytime. Enterprise can request custom exports during onboarding or offboarding.",
  },
  {
    question: "Do you have an API?",
    answer:
      "Yes. Pro includes limited API access and Enterprise includes full API access. Webhooks and custom integrations are available on Enterprise.",
  },
  {
    question: "Which integrations are available?",
    answer:
      "Core integrations are available on Pro and Enterprise via the Integrations Hub. Let us know if you need a specific connector.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We use secure authentication, role‑based access, and follow best practices. Enterprise options include SSO, advanced security controls, and SLA.",
  },
  {
    question: "What support do you provide?",
    answer:
      "Free includes email support. Starter has priority support, Pro has 24/7 support, and Enterprise has dedicated support and onboarding.",
  },
  {
    question: "What is your uptime/SLA?",
    answer:
      "We strive for high availability. Enterprise plans include SLA guarantees and incident response commitments.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "Subscriptions renew automatically. You can cancel anytime to stop future charges. For billing issues, contact support and we’ll help promptly.",
  },
  {
    question: "Do you charge taxes?",
    answer:
      "Taxes may be applied based on your location and local regulations. The final amount is always shown at checkout.",
  },
  {
    question: "Where can I request features or report issues?",
    answer:
      "Use the Feedback page to submit ideas or issues. Enterprise customers can work with our team on roadmap priorities during onboarding.",
  },
]

export function PricingFAQ() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <section aria-labelledby="pricing-faq" className="max-w-5xl mx-auto px-4 mt-16">
      <header className="mb-6 sm:mb-8">
        <h3 id="pricing-faq" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Frequently asked <span className="text-muted-foreground">questions.</span>
        </h3>
      </header>

      <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
        <Accordion type="single" collapsible className="divide-y">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="px-4 sm:px-6 py-4 group [&>svg]:hidden">
                <div className="w-full flex items-center justify-between">
                  <span className="text-base sm:text-lg font-medium text-foreground text-left">
                    {faq.question}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    <span className="group-data-[state=open]:hidden">[+]</span>
                    <span className="hidden group-data-[state=open]:inline">[−]</span>
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 sm:px-6 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  )
}

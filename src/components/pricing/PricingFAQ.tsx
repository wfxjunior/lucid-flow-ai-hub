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
    question: "Do you offer discounts?",
    answer:
      "Annual billing offers built‑in savings on Starter and Pro. We also provide startup and nonprofit discounts on request.",
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
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel recurring plans anytime. Your subscription remains active until the end of the billing period.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We use secure authentication, role‑based access, and follow best practices. Enterprise options include SSO and advanced controls.",
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

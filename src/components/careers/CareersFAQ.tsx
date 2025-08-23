
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is your remote work policy?",
    answer: "We are a fully remote-first company. All positions can be performed remotely, and we have team members across multiple time zones. We provide home office stipends and support flexible working hours."
  },
  {
    question: "Do you sponsor visas or help with relocation?",
    answer: "Yes, we provide visa sponsorship for exceptional candidates and can assist with relocation to countries where we have legal entities. We handle the process and associated costs."
  },
  {
    question: "What is your typical hiring timeline?",
    answer: "Our hiring process typically takes 2-3 weeks from initial application to final decision. We move quickly while ensuring a thorough evaluation for both candidates and our team."
  },
  {
    question: "What does your interview process look like?",
    answer: "Our process includes an initial screening call, technical assessment (coding challenge or system design), and final interviews with team members. We focus on both technical skills and cultural fit."
  },
  {
    question: "Do you provide accommodations for candidates with disabilities?",
    answer: "Absolutely. We are committed to providing reasonable accommodations throughout our hiring process and in the workplace. Please let us know how we can support you during interviews."
  }
]

export function CareersFAQ() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Common questions about working at FeatherBiz and our hiring process
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

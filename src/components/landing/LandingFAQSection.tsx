
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How quickly can I get started with FeatherBiz?",
    answer: "You can start using FeatherBiz in under 2 minutes. Simply sign up, verify your email, and you'll have immediate access to all features in your free plan."
  },
  {
    question: "Do I need a credit card to try FeatherBiz?",
    answer: "No credit card required! Our free plan gives you access to core features permanently. You only pay when you're ready to upgrade for advanced features."
  },
  {
    question: "Can I import my existing data?",
    answer: "Yes, FeatherBiz supports importing data from popular business tools. Our team can also help with data migration to ensure a smooth transition."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade security with end-to-end encryption, regular backups, and comply with industry standards to keep your business data safe."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide 24/7 email support for all users, plus live chat and phone support for paid plans. Our help center also has extensive documentation and tutorials."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period, and you can export your data anytime."
  }
];

export const LandingFAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E9EEF5]">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-md bg-yellow-50 border border-yellow-100 text-yellow-700 text-sm font-medium mb-6">
            FAQ
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Frequently asked
            <br />
            <span className="text-blue-600">questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about FeatherBiz and how it can help your business
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed mt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

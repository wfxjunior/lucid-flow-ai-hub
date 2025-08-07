export interface SignatureTemplate {
  id: string
  name: string
  category: 'contract' | 'estimate' | 'agreement' | 'proposal'
  type: string
  description: string
  defaultTitle: string
  content: string
}

export const signatureTemplates: SignatureTemplate[] = [
  {
    id: 'service-contract',
    name: 'Service Contract',
    category: 'contract',
    type: 'Service Agreement',
    description: 'Standard service agreement template for ongoing business services',
    defaultTitle: 'Service Agreement Contract',
    content: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on {startDate} between the Client and Service Provider.

CLIENT INFORMATION:
Name: {clientName}
Email: {clientEmail}

PROJECT DETAILS:
Description: {projectDescription}
Total Amount: {amount}
Duration: {duration}

TERMS AND CONDITIONS:

1. SCOPE OF WORK
The Service Provider agrees to perform the services described above with professional standards and in accordance with industry best practices.

2. PAYMENT TERMS
Total contract value: {amount}
Payment schedule will be determined based on project milestones.

3. TIMELINE
Project duration: {duration}
Start date: {startDate}

4. RESPONSIBILITIES
Client shall provide necessary information and access required for service delivery.
Service Provider shall deliver services as specified and maintain confidentiality.

5. CANCELLATION
Either party may terminate this agreement with 30 days written notice.

6. ADDITIONAL TERMS
{terms}

By signing below, both parties agree to the terms and conditions outlined in this agreement.`
  },
  {
    id: 'project-estimate',
    name: 'Project Estimate',
    category: 'estimate',
    type: 'Project Estimate',
    description: 'Detailed project estimate template with scope and pricing',
    defaultTitle: 'Project Estimate and Proposal',
    content: `PROJECT ESTIMATE

Prepared for: {clientName}
Contact: {clientEmail}
Date: {startDate}

PROJECT OVERVIEW:
{projectDescription}

ESTIMATED INVESTMENT:
Total Project Cost: {amount}
Timeline: {duration}

SCOPE OF WORK:
This estimate includes all work necessary to complete the project as described above.

WHAT'S INCLUDED:
• Initial consultation and planning
• Project development and implementation
• Testing and quality assurance
• Final delivery and handover

TIMELINE:
Estimated completion: {duration} from project start
Start date: {startDate}

TERMS:
• Estimate valid for 30 days
• 50% deposit required to begin work
• Final payment due upon completion

ADDITIONAL NOTES:
{terms}

This estimate represents our understanding of your project requirements. Please review and sign to proceed.`
  },
  {
    id: 'nda-agreement',
    name: 'Non-Disclosure Agreement',
    category: 'agreement',
    type: 'Confidentiality Agreement',
    description: 'Standard NDA template for protecting confidential business information',
    defaultTitle: 'Non-Disclosure Agreement',
    content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into on {startDate} between the parties.

DISCLOSING PARTY:
Company Representative

RECEIVING PARTY:
Name: {clientName}
Email: {clientEmail}

PURPOSE:
{projectDescription}

CONFIDENTIAL INFORMATION:
Any and all technical and non-technical information disclosed by either party, including but not limited to:
• Business strategies and methods
• Technical data and specifications
• Financial information
• Customer lists and market analysis

OBLIGATIONS:
The Receiving Party agrees to:
1. Hold all Confidential Information in strict confidence
2. Not disclose any Confidential Information to third parties
3. Use Confidential Information solely for the stated purpose
4. Return or destroy all Confidential Information upon request

TERM:
This Agreement shall remain in effect for {duration} from the date of signing.

ADDITIONAL TERMS:
{terms}

By signing below, both parties acknowledge they have read and agree to be bound by this Agreement.`
  },
  {
    id: 'business-proposal',
    name: 'Business Proposal',
    category: 'proposal',
    type: 'Business Proposal',
    description: 'Comprehensive business proposal template for client presentations',
    defaultTitle: 'Business Proposal',
    content: `BUSINESS PROPOSAL

Prepared for: {clientName}
Contact: {clientEmail}
Date: {startDate}

EXECUTIVE SUMMARY:
We are pleased to present this proposal for your consideration. This document outlines our understanding of your needs and our recommended solution.

PROJECT OVERVIEW:
{projectDescription}

PROPOSED SOLUTION:
Our team will deliver a comprehensive solution that meets your specific requirements while ensuring quality and timely delivery.

INVESTMENT:
Total Investment: {amount}
Project Timeline: {duration}
Start Date: {startDate}

WHY CHOOSE US:
• Proven track record of successful project delivery
• Experienced team of professionals
• Commitment to quality and customer satisfaction
• Ongoing support and maintenance

NEXT STEPS:
1. Review and approve this proposal
2. Sign agreement and provide initial payment
3. Begin project kickoff and planning phase
4. Regular progress updates and milestone reviews

TERMS AND CONDITIONS:
{terms}

We look forward to working with you on this exciting project. Please feel free to contact us with any questions.`
  },
  {
    id: 'consulting-agreement',
    name: 'Consulting Agreement',
    category: 'contract',
    type: 'Consulting Services Agreement',
    description: 'Professional consulting services agreement template',
    defaultTitle: 'Consulting Services Agreement',
    content: `CONSULTING SERVICES AGREEMENT

This Consulting Agreement is entered into on {startDate} between the Client and Consultant.

CLIENT:
Name: {clientName}
Email: {clientEmail}

CONSULTING SERVICES:
Scope: {projectDescription}
Duration: {duration}
Compensation: {amount}

CONSULTANT OBLIGATIONS:
1. Provide professional consulting services as described
2. Maintain confidentiality of all client information
3. Deliver work products according to agreed timeline
4. Communicate regularly on project progress

CLIENT OBLIGATIONS:
1. Provide necessary information and access
2. Review and approve deliverables in timely manner
3. Make payments according to agreed schedule
4. Respect consultant's professional recommendations

COMPENSATION:
Total fee: {amount}
Payment terms: Net 30 days from invoice date

INTELLECTUAL PROPERTY:
All work products created during the engagement will belong to the Client upon full payment.

TERMINATION:
Either party may terminate this agreement with 14 days written notice.

ADDITIONAL TERMS:
{terms}

By signing below, both parties agree to the terms of this consulting agreement.`
  },
  {
    id: 'maintenance-contract',
    name: 'Maintenance Contract',
    category: 'contract',
    type: 'Maintenance Agreement',
    description: 'Ongoing maintenance and support services contract template',
    defaultTitle: 'Maintenance and Support Agreement',
    content: `MAINTENANCE AND SUPPORT AGREEMENT

This Maintenance Agreement is effective {startDate} between the Service Provider and Client.

CLIENT INFORMATION:
Name: {clientName}
Email: {clientEmail}

MAINTENANCE SERVICES:
Description: {projectDescription}
Contract Value: {amount}
Service Period: {duration}

INCLUDED SERVICES:
• Regular system monitoring and maintenance
• Software updates and security patches
• Technical support during business hours
• Emergency response within 24 hours

SERVICE LEVEL AGREEMENT:
• 99.9% uptime guarantee
• Response time: 4 hours for critical issues
• Monthly maintenance reports
• Quarterly performance reviews

PAYMENT TERMS:
Annual fee: {amount}
Billing: Quarterly in advance
Late payment fee: 1.5% per month

EXCLUSIONS:
• Hardware replacement costs
• Services outside defined scope
• Issues caused by client modifications
• Third-party software problems

ADDITIONAL TERMS:
{terms}

This agreement automatically renews annually unless terminated with 60 days notice.`
  }
]
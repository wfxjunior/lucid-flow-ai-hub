import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Row,
  Column,
  Img,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface PaymentConfirmationEmailProps {
  customerName: string
  planName: string
  amount: string
  currency: string
  billingPeriod: string
  trialDays?: number
  nextBillingDate?: string
  invoiceUrl?: string
}

export const PaymentConfirmationEmail = ({
  customerName,
  planName,
  amount,
  currency,
  billingPeriod,
  trialDays,
  nextBillingDate,
  invoiceUrl,
}: PaymentConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirmação do seu pagamento FeatherBiz - {planName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Row>
            <Column>
              <Heading style={h1}>🎉 Pagamento Confirmado!</Heading>
              <Text style={subtitle}>
                Bem-vindo ao FeatherBiz {planName}
              </Text>
            </Column>
          </Row>
        </Section>

        <Hr style={hr} />

        <Section style={contentSection}>
          <Text style={greeting}>Olá {customerName},</Text>
          
          <Text style={text}>
            Seu pagamento foi processado com sucesso! {trialDays ? `Seu teste gratuito de ${trialDays} dias começou agora.` : 'Sua assinatura está ativa.'}
          </Text>

          {trialDays && (
            <Section style={trialSection}>
              <Text style={trialText}>
                ✨ <strong>Teste Gratuito Ativo</strong> ✨
              </Text>
              <Text style={text}>
                Você tem <strong>{trialDays} dias</strong> para explorar todos os recursos premium do FeatherBiz sem nenhum custo.
              </Text>
            </Section>
          )}

          <Section style={detailsSection}>
            <Heading style={h2}>Detalhes da Assinatura</Heading>
            <Row style={detailRow}>
              <Column style={detailLabel}>Plano:</Column>
              <Column style={detailValue}>{planName}</Column>
            </Row>
            <Row style={detailRow}>
              <Column style={detailLabel}>Valor:</Column>
              <Column style={detailValue}>{currency.toUpperCase()} {amount}/{billingPeriod}</Column>
            </Row>
            {nextBillingDate && (
              <Row style={detailRow}>
                <Column style={detailLabel}>Próxima cobrança:</Column>
                <Column style={detailValue}>{nextBillingDate}</Column>
              </Row>
            )}
          </Section>

          <Section style={featuresSection}>
            <Heading style={h2}>O que você ganhou:</Heading>
            <Text style={featureText}>✅ Faturas ilimitadas</Text>
            <Text style={featureText}>✅ Assistente de IA</Text>
            <Text style={featureText}>✅ Dashboard com analytics</Text>
            <Text style={featureText}>✅ Gestão completa de projetos</Text>
            <Text style={featureText}>✅ E-Signatures</Text>
            <Text style={featureText}>✅ Suporte prioritário</Text>
            <Text style={featureText}>✅ Todas as integrações</Text>
          </Section>

          <Section style={ctaSection}>
            <Link
              href="https://featherbiz.io"
              target="_blank"
              style={ctaButton}
            >
              Começar a Usar Agora
            </Link>
          </Section>

          {invoiceUrl && (
            <Section style={invoiceSection}>
              <Text style={text}>
                <Link href={invoiceUrl} style={link}>
                  📄 Baixar Fatura
                </Link>
              </Text>
            </Section>
          )}

          <Hr style={hr} />

          <Section style={supportSection}>
            <Text style={supportText}>
              <strong>Precisa de ajuda?</strong> Nossa equipe está aqui para você!
            </Text>
            <Text style={supportText}>
              📧 Email: <Link href="mailto:support@featherbiz.io" style={link}>support@featherbiz.io</Link>
            </Text>
            <Text style={supportText}>
              📱 WhatsApp: <Link href="https://wa.me/5511999999999" style={link}>+55 11 99999-9999</Link>
            </Text>
          </Section>
        </Section>

        <Hr style={hr} />

        <Section style={footerSection}>
          <Text style={footer}>
            <Link href="https://featherbiz.io" target="_blank" style={footerLink}>
              FeatherBiz
            </Link>
            {" • "}
            <Link href="https://featherbiz.io/help" target="_blank" style={footerLink}>
              Central de Ajuda
            </Link>
            {" • "}
            <Link href="https://featherbiz.io/contact" target="_blank" style={footerLink}>
              Contato
            </Link>
          </Text>
          <Text style={footerText}>
            Este email foi enviado para confirmar seu pagamento. Se você não fez esta compra, entre em contato conosco imediatamente.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default PaymentConfirmationEmail

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const headerSection = {
  backgroundColor: '#667eea',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: '40px 40px',
  textAlign: 'center' as const,
}

const contentSection = {
  padding: '40px 40px 0',
}

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 10px',
  textAlign: 'center' as const,
}

const subtitle = {
  color: '#ffffff',
  fontSize: '18px',
  margin: '0',
  textAlign: 'center' as const,
  opacity: 0.9,
}

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '30px 0 15px',
}

const greeting = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 20px',
  fontWeight: '600',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 20px',
}

const trialSection = {
  backgroundColor: '#f0f9ff',
  border: '2px solid #0ea5e9',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
  textAlign: 'center' as const,
}

const trialText = {
  color: '#0369a1',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 10px',
}

const detailsSection = {
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
}

const detailRow = {
  margin: '8px 0',
}

const detailLabel = {
  color: '#64748b',
  fontSize: '14px',
  fontWeight: '500',
  width: '120px',
}

const detailValue = {
  color: '#1e293b',
  fontSize: '14px',
  fontWeight: '600',
}

const featuresSection = {
  margin: '30px 0',
}

const featureText = {
  color: '#15803d',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
  fontWeight: '500',
}

const ctaSection = {
  textAlign: 'center' as const,
  margin: '40px 0',
}

const ctaButton = {
  backgroundColor: '#667eea',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '16px 32px',
  textDecoration: 'none',
  textAlign: 'center' as const,
}

const invoiceSection = {
  textAlign: 'center' as const,
  margin: '20px 0',
}

const supportSection = {
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  padding: '20px',
  margin: '30px 0',
  textAlign: 'center' as const,
}

const supportText = {
  color: '#92400e',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '5px 0',
}

const footerSection = {
  padding: '0 40px',
  textAlign: 'center' as const,
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '20px 0 10px',
}

const footerLink = {
  color: '#6772e5',
  textDecoration: 'none',
}

const footerText = {
  color: '#8898aa',
  fontSize: '11px',
  lineHeight: '16px',
  margin: '10px 0',
}

const link = {
  color: '#6772e5',
  textDecoration: 'none',
}

const hr = {
  border: 'none',
  borderTop: '1px solid #e6ebf1',
  margin: '20px 0',
}
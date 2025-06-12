
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ReceiptEmailButton } from '@/components/ReceiptEmailButton';
import { useReceiptEmail } from '@/hooks/useReceiptEmail';
import { formatDate } from 'date-fns';

interface Payment {
  id: string;
  amount: number;
  description: string;
  payment_method: string;
  status: string;
  customer_name: string;
  customer_email: string;
  transaction_id: string;
  created_at: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
}

export function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { sendPaymentReceipt } = useReceiptEmail();

  // Form states
  const [selectedClientId, setSelectedClientId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPayments();
    fetchClients();
  }, []);

  const fetchPayments = async () => {
    try {
      // Since we don't have a payments table, we'll simulate with receipts for now
      const { data, error } = await supabase
        .from('receipts')
        .select(`
          *,
          clients:client_id (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform receipts data to payment format
      const transformedPayments = data?.map(receipt => ({
        id: receipt.id,
        amount: receipt.amount,
        description: receipt.notes || 'Payment received',
        payment_method: receipt.payment_method || 'card',
        status: 'completed',
        customer_name: receipt.clients?.name || 'Unknown',
        customer_email: receipt.clients?.email || '',
        transaction_id: receipt.receipt_number,
        created_at: receipt.created_at
      })) || [];

      setPayments(transformedPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name, email')
        .eq('status', 'active')
        .order('name');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClientId || !amount || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const selectedClient = clients.find(c => c.id === selectedClientId);
      if (!selectedClient) throw new Error('Client not found');

      // Generate receipt number
      const { data: receiptNumber, error: receiptError } = await supabase.rpc('generate_receipt_number');
      if (receiptError) throw receiptError;

      // Create receipt record
      const receiptData = {
        receipt_number: receiptNumber,
        client_id: selectedClientId,
        amount: parseFloat(amount),
        payment_method: paymentMethod,
        notes: description,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        invoice_id: null // For standalone payments
      };

      const { data: receipt, error } = await supabase
        .from('receipts')
        .insert(receiptData)
        .select('*')
        .single();

      if (error) throw error;

      // Create payment object for email
      const paymentForEmail = {
        id: receipt.id,
        customerName: selectedClient.name,
        customerEmail: selectedClient.email,
        amount: parseFloat(amount),
        description,
        paymentMethod,
        transactionId: receiptNumber,
        date: new Date(),
        orderNumber: receiptNumber
      };

      // Send receipt email automatically
      try {
        await sendPaymentReceipt(paymentForEmail);
        toast.success('Payment recorded and receipt email sent!');
      } catch (emailError) {
        console.error('Failed to send receipt email:', emailError);
        toast.success('Payment recorded successfully! (Email sending failed)');
      }

      // Reset form
      setSelectedClientId('');
      setAmount('');
      setDescription('');
      setPaymentMethod('card');
      setShowForm(false);
      
      // Refresh payments list
      fetchPayments();

    } catch (error) {
      console.error('Error recording payment:', error);
      toast.error('Failed to record payment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading payments...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Manage your payment records</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Record Payment'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Record New Payment</CardTitle>
            <CardDescription>
              Record a payment received from a client
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="client">Client *</Label>
                <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name} ({client.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Payment description"
                  required
                />
              </div>

              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Recording...' : 'Record Payment'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Payment History</h2>
        
        {payments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No payments recorded yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{payment.customer_name}</h3>
                        <Badge variant="secondary">{payment.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {payment.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {payment.customer_email} • {payment.payment_method} • {formatDate(new Date(payment.created_at), 'MMM dd, yyyy')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Transaction ID: {payment.transaction_id}
                      </p>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <p className="text-2xl font-bold">${payment.amount.toFixed(2)}</p>
                      <ReceiptEmailButton
                        payment={{
                          customerName: payment.customer_name,
                          customerEmail: payment.customer_email,
                          amount: payment.amount,
                          description: payment.description,
                          paymentMethod: payment.payment_method,
                          transactionId: payment.transaction_id,
                          orderNumber: payment.transaction_id,
                          date: payment.created_at
                        }}
                        variant="outline"
                        size="sm"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
